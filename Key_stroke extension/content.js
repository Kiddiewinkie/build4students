// =========================================================
//  BIOMETRIC STATE (The Brain)
// =========================================================
const State = {
    currentStress: 0.0,
    sluggishness: 0.0,
    lastAlertTime: 0, 
    DECAY_FACTOR: 0.99, 
    
    spikeStress: function(amount) {
        if (amount > 0) {
            // STAGGERED RESISTANCE SYSTEM
            let multiplier = 1.0;
            if (this.currentStress >= 90) multiplier = 0.05; 
            else if (this.currentStress >= 75) multiplier = 0.20; 
            else if (this.currentStress >= 50) multiplier = 0.40; 
            else if (this.currentStress >= 25) multiplier = 0.75; 
            
            this.currentStress += (amount * multiplier);
        } else {
            this.currentStress += amount;
        }
        this.currentStress = Math.max(0.0, Math.min(100.0, this.currentStress));
        this.saveState();
    },

    updateSluggishness: function(amount) {
        this.sluggishness = Math.max(0.0, Math.min(10.0, this.sluggishness + amount));
        this.saveState();
    },

    saveState: function() {
        chrome.storage.local.set({
            stress: this.currentStress,
            sluggishness: this.sluggishness,
            status: this.getCognitiveStatus()
        });
        
        const now = Date.now();
        
        // --- CHANGED HERE: 5000 -> 30000 (30 Seconds) ---
        if (now - this.lastAlertTime > 30000) {
            if (this.currentStress > 85.0) { 
                showAlert(`STRESS CRITICAL: ${this.currentStress.toFixed(0)}%`, "Take a break?");
                this.lastAlertTime = now;
            } else if (this.sluggishness > 7.0) {
                showAlert("BRAIN FOG DETECTED", "Drink some water.");
                this.lastAlertTime = now;
            }
        }
    },

    getCognitiveStatus: function() {
        if (this.sluggishness > 7.0) return "Need a Break";
        if (this.sluggishness > 4.0) return "Tiring Out";
        if (this.currentStress > 70.0) return "Overheated";
        return "In the Zone";
    }
};

setInterval(() => {
    State.currentStress = Math.max(0.0, State.currentStress * State.DECAY_FACTOR);
    State.sluggishness = Math.max(0.0, State.sluggishness * 0.995);
    State.saveState();
}, 1000);


// =========================================================
//  SENSORS (The Inputs)
// =========================================================
let lastReleaseTime = 0;
let currentPressTime = 0;
let rhythmHistory = [];    
let backspaceHistory = []; 

document.addEventListener('keydown', (e) => {
    currentPressTime = Date.now();

    if (e.key === 'Backspace') {
        const now = Date.now();
        backspaceHistory.push(now);
        backspaceHistory = backspaceHistory.filter(t => now - t < 3000);
        
        if (backspaceHistory.length >= 4) { 
            State.spikeStress(15.0); 
            backspaceHistory = []; 
            console.log("Rage detected!");
        }
    }

    if (lastReleaseTime > 0) {
        const flightTime = currentPressTime - lastReleaseTime;
        if (flightTime < 2000) {
            analyzeRhythmStress(flightTime);
            if (flightTime > 400 && flightTime < 1500) State.updateSluggishness(0.5);
            else if (flightTime < 150) State.updateSluggishness(-0.2);
        }
    }
});

document.addEventListener('keyup', (e) => {
    const releaseTime = Date.now();
    lastReleaseTime = releaseTime;
    const dwellTime = releaseTime - currentPressTime;
    if (dwellTime > 120) State.updateSluggishness(0.2);
    else State.updateSluggishness(-0.05);
});

function analyzeRhythmStress(flightTime) {
    rhythmHistory.push(flightTime);
    if (rhythmHistory.length > 20) rhythmHistory.shift();

    if (rhythmHistory.length >= 10) {
        const mean = rhythmHistory.reduce((a, b) => a + b, 0) / rhythmHistory.length;
        const variance = rhythmHistory.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / rhythmHistory.length;
        const stdDev = Math.sqrt(variance);

        if (mean > 0) {
            const cv = stdDev / mean;
            if (cv > 0.6) State.spikeStress(1.0);
            else if (cv < 0.2) State.spikeStress(-0.5);
        }
    }
}

// =========================================================
//  MOUSE SENSOR
// =========================================================
let mousePath = []; 
let lastMoveTime = 0;

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (lastMoveTime > 0) {
        const pause = now - lastMoveTime;
        if (pause > 2000 && pause < 5000) State.spikeStress(5.0);
    }
    lastMoveTime = now;

    mousePath.push({ x: e.clientX, y: e.clientY });
    if (mousePath.length > 20) {
        mousePath.shift();
        calculateJitter();
    }
});

function calculateJitter() {
    let actualDist = 0;
    for (let i = 0; i < mousePath.length - 1; i++) {
        const dx = mousePath[i].x - mousePath[i+1].x;
        const dy = mousePath[i].y - mousePath[i+1].y;
        actualDist += Math.sqrt(dx*dx + dy*dy);
    }
    
    const start = mousePath[0];
    const end = mousePath[mousePath.length - 1];
    const idealDist = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));

    if (actualDist > 0) {
        const efficiency = idealDist / actualDist;
        if (efficiency < 0.2) State.spikeStress(2.0);
    }
}


// =========================================================
//  MINECRAFT / COFFEE ALERT SYSTEM
// =========================================================
function showAlert(title, subtitle) {
    if (!document.getElementById('pixel-font-link')) {
        const link = document.createElement('link');
        link.id = 'pixel-font-link';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
        document.head.appendChild(link);
    }

    const existing = document.getElementById('bio-alert');
    if (existing) existing.remove();

    const alertBox = document.createElement('div');
    alertBox.id = 'bio-alert';
    
    const COFFEE_DARK = '#6F4E37';
    const CREAM = '#f6f4ef';
    
    alertBox.style.cssText = `
        position: fixed; 
        top: 20px; 
        right: 20px;
        background-color: ${CREAM};
        color: ${COFFEE_DARK};
        border: 4px solid ${COFFEE_DARK};
        padding: 16px 20px; 
        font-family: "Press Start 2P", monospace; 
        box-shadow: 6px 6px 0px rgba(0,0,0,0.2);
        z-index: 2147483647;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s steps(5); 
        image-rendering: pixelated;
        text-align: center;
    `;
    
    alertBox.innerHTML = `
        <div style="font-size: 12px; margin-bottom: 8px; font-weight: bold;">${title}</div>
        <div style="font-size: 10px; opacity: 0.8;">${subtitle}</div>
    `;
    
    document.body.appendChild(alertBox);

    requestAnimationFrame(() => {
        alertBox.style.opacity = '1';
        alertBox.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
        alertBox.style.opacity = '0';
        alertBox.style.transform = 'translateY(-20px)';
        setTimeout(() => alertBox.remove(), 500);
    }, 5000);
}