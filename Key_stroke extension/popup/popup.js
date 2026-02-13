// popup.js - The Bridge between Sensor and UI

function updateDashboard() {
    // 1. Ask Chrome for the data saved by content.js
    chrome.storage.local.get(['stress', 'sluggishness', 'status'], (data) => {
        
        // 2. Formatting Data
        // Default to 0 if undefined (e.g., first run)
        const stressLevel = data.stress || 0;
        const slugLevel = data.sluggishness || 0;
        const statusText = data.status || "WAITING FOR INPUT...";

        // 3. Update DOM Elements
        const stressEl = document.getElementById('stress-val');
        const slugEl = document.getElementById('slug-val');
        const statusEl = document.getElementById('status-val');

        // Set Text
        stressEl.innerText = stressLevel.toFixed(0) + "%";
        slugEl.innerText = slugLevel.toFixed(1) + "/10";
        statusEl.innerText = statusText.toUpperCase();

        // 4. Dynamic Styling (Visual Feedback)
        // If stress > 50, make it red and shake
        if (stressLevel > 50) {
            stressEl.classList.add('high');
        } else {
            stressEl.classList.remove('high');
        }

        // If status is "Need a Break", change status color
        if (statusText.includes("Break")) {
            statusEl.style.color = "#ff5555"; // Red alert
        } else {
            statusEl.style.color = "#E1C16E"; // Gold normal
        }
    });
}

// Update the UI every 500ms so it feels responsive
setInterval(updateDashboard, 500);

// Run once immediately on load
document.addEventListener('DOMContentLoaded', updateDashboard);