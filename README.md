# NEW IDENTITY — PWA starter

## Run locally
A PWA service worker requires HTTPS or localhost. On a computer with Python installed:
1. Extract this ZIP.
2. Open a terminal in this folder.
3. Run `python -m http.server 8000`
4. Open `http://localhost:8000` in your browser.

## Publish free with GitHub Pages
1. Create/sign in to GitHub.
2. Create a new public repository named `new-identity`.
3. Upload all files and folders from this project (keep the folder structure).
4. Open repository Settings → Pages.
5. Under Build and deployment, choose Deploy from a branch, select `main` and `/ (root)`, then Save.
6. Wait for the published HTTPS URL. Open it in Chrome on Android.
7. Chrome menu ⋮ → Install app (or Add to Home screen).

## Notifications limitation
This starter saves reminder times and can show browser notifications while the app is open and permitted. It does NOT guarantee scheduled notifications when the app is closed or the phone is asleep. Reliable closed-app notifications need a push service/backend (or native Android app with scheduled notifications).

## Data
Daily checklist and reminder times are stored locally in this browser on this device. Clearing browser/site data may erase them. This starter does not sync between devices.
