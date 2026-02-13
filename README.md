# ☕️ Biometric Stress Sensor (Minecraft Edition)

A gamified Chrome Extension that monitors your stress and fatigue levels in real-time. It uses your typing patterns and mouse movements to detect when you are "rage typing" or experiencing "brain fog."

If you hit critical levels, it pauses you with a cozy, Minecraft-styled popup suggesting a break.

## 🎮 Features

### 1. 😡 Rage Detector
- Detects aggressive usage of the `Backspace` key (e.g., deleting a mistake 4 times quickly).
- Instantly spikes your stress level.

### 2. 😴 Brain Fog (Fatigue) Sensor
- Analyzes the "flight time" between your keystrokes.
- If you start hesitating (pausing for 0.5s - 2.0s between keys), it detects mental fatigue.
- Triggers a "Brain Fog Detected" alert if you hesitate too often.

### 3. 🖱️ Jitter Sensor
- Tracks erratic mouse movements.
- If you shake your mouse wildly (stress behavior), it increases your stress score.

### 4. ⚖️ Rubber Band Balancing
- Uses game design math to make stress harder to accumulate as you get closer to 100%.
- Prevents the meter from maxing out instantly, making it feel like a health bar.

---

## 🛠 How to Install (Developer Mode)

Since this is a custom project, you need to load it manually into Chrome:

1. **Download this Repository:**
   - Click the green **Code** button above -> **Download ZIP**.
   - Unzip the folder to somewhere safe.

2. **Open Chrome Extensions:**
   - Type `chrome://extensions` in your URL bar and hit Enter.

3. **Enable Developer Mode:**
   - Look at the **top right** corner of the page.
   - Toggle **Developer mode** to **ON** (Blue switch).

4. **Load the Extension:**
   - Click the **Load unpacked** button in the top left.
   - Select the **entire folder** you just unzipped.

5. **Done!**
   - The extension is now active.
   - Pin it 📌 to your toolbar to see your stats!

---

## 🧪 How to Test It

Want to see the popups work immediately? Follow these steps:

### To Trigger "Stress Critical" 😰
1. Open a Google Doc or any text field.
2. Spam the **Backspace** key 4-5 times as fast as you can.
3. You will see the **Stress** meter spike. Repeat until it hits 85%+.

### To Trigger "Brain Fog" 😴
The sensor looks for a specific "hesitation" rhythm. Do this **3 times in a row**:
1. Type a letter.
2. **Wait 1 second.**
3. Type a letter.
4. **Wait 1 second.**
5. Type a letter.

*This simulates a tired user who is struggling to think of what to write.*

---

## 🎨 Credits
- **Font:** "Press Start 2P" (Google Fonts)
- **Theme:** Coffee & Cream Pixel Art
