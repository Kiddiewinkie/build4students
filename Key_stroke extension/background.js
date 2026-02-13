// background.js - Just keeps the service worker ready
chrome.runtime.onInstalled.addListener(() => {
    console.log("Biometric Sensor Installed");
});