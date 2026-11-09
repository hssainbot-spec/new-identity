const tasks=[
"Wake up on time and make your bed",
"Protect recovery: avoid explicit content and triggers",
"Complete today's planned workout or recovery session",
"Take 3 meaningful career actions (apply or follow up)",
"Learn or read for at least 30 minutes",
"Limit aimless phone use",
"Prepare for sleep on time"
];
const todayKey=()=>new Date().toISOString().slice(0,10);
let data=JSON.parse(localStorage.getItem("ni-data")||"{}");
function save(){localStorage.setItem("ni-data",JSON.stringify(data))}
function today(){if(!data[todayKey()])data[todayKey()]={checks:[],jobs:0,run:0};return data[todayKey()]}
function render(){
 const d=today(),list=document.getElementById("taskList");list.innerHTML="";
 tasks.forEach((t,i)=>{const label=document.createElement("label");label.className="task"+(d.checks.includes(i)?" done":"");const cb=document.createElement("input");cb.type="checkbox";cb.checked=d.checks.includes(i);cb.addEventListener("change",()=>{const x=today();x.checks=cb.checked?[...x.checks,i]:x.checks.filter(n=>n!==i);save();render()});const span=document.createElement("span");span.textContent=t;label.append(cb,span);list.append(label)});
 const pct=Math.round(d.checks.length/tasks.length*100);document.getElementById("progressBar").style.width=pct+"%";document.getElementById("progressText").textContent=pct+"% completed today";document.getElementById("todayDate").textContent=new Date().toLocaleDateString("en",{month:"short",day:"numeric"});
 const start=data.startDate||todayKey();if(!data.startDate){data.startDate=start;save()}const day=Math.max(1,Math.min(30,Math.floor((new Date(todayKey())-new Date(start))/86400000)+1));document.getElementById("dayLabel").textContent=`DAY ${String(day).padStart(2,"0")} / 30`;
 const days=Object.values(data).filter(v=>v&&Array.isArray(v.checks));document.getElementById("jobCount").textContent=days.reduce((s,v)=>s+(v.jobs||0),0);document.getElementById("runCount").textContent=days.reduce((s,v)=>s+(v.run||0),0);document.getElementById("streakCount").textContent=days.filter(v=>v.checks.length>=5).length;
}
document.getElementById("todayDate").textContent=new Date().toLocaleDateString();
document.getElementById("resetBtn").onclick=()=>{if(confirm("Clear today's checklist?")){data[todayKey()].checks=[];save();render()}};
document.getElementById("notifyBtn").onclick=async()=>{if(!("Notification"in window)){alert("Notifications are not supported by this browser.");return}const p=await Notification.requestPermission();alert(p==="granted"?"Notifications enabled. Keep the app open for scheduled reminders in this starter.":"Notification permission was not granted.")};
const times=["morningTime","workTime","runTime","nightTime"];const saved=JSON.parse(localStorage.getItem("ni-times")||"{}");times.forEach(id=>{if(saved[id])document.getElementById(id).value=saved[id]});
document.getElementById("saveTimes").onclick=()=>{const t={};times.forEach(id=>t[id]=document.getElementById(id).value);localStorage.setItem("ni-times",JSON.stringify(t));alert("Reminder times saved. Enable notifications and keep the app open for reminders.")};
let fired=new Set();const messages={morningTime:["Morning focus","Start your day with discipline."],workTime:["Career action","Take one concrete step toward employment and income."],runTime:["Training time","Move your body. Consistency beats intensity."],nightTime:["Daily review","Review today and prepare for tomorrow."]};
function checkReminders(){if(!("Notification"in window)||Notification.permission!=="granted")return;const now=new Date(),hh=String(now.getHours()).padStart(2,"0"),mm=String(now.getMinutes()).padStart(2,"0"),stamp=todayKey()+hh+mm;times.forEach(id=>{const val=document.getElementById(id).value;if(val===hh+":"+mm&&!fired.has(stamp+id)){new Notification(messages[id][0],{body:messages[id][1]});fired.add(stamp+id)}})}
setInterval(checkReminders,20000);if("serviceWorker"in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(()=>{});render();