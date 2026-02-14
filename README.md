# 🌿 VoiceDiary & Biometric Stress Sensor
### A Multimodal AI Journaling Ecosystem

**VoiceDiary** is a comprehensive emotional tracking platform designed for students and professionals. It combines a sophisticated **Web Application** for deep reflection using AI and Computer Vision, with a gamified **Chrome Extension** that monitors real-time stress levels during work or study sessions.

---

## 🏗️ System Architecture

This project consists of two distinct components:

1.  **🎙️ VoiceDiary Web App:** A journaling interface that uses Generative AI (Gemini) and Face Detection to analyze your daily mood via text, voice, and video.
2.  **☕️ Biometric Stress Sensor (Extension):** A background "Minecraft-styled" companion that analyzes typing patterns to detect burnout, rage, and fatigue in real-time.

---

## 🚀 Component 1: The Web Application

The core journaling platform where users record their day and receive empathy-driven AI feedback.

### Key Features
* **📝 Text Diary:** Traditional writing interface with secure cloud synchronization.
* **🗣️ Voice Analysis:** Records audio and uses **Google Gemini 2.5 Flash** to analyze vocal tone, pitch, and sentiment.
* **📹 Multimodal Video Analysis:**
    * **Computer Vision:** Uses `face-api.js` to track 7 distinct emotions (Happy, Sad, Angry, etc.) in real-time.
    * **Holistic AI Summary:** Combines visual emotion data with audio analysis to generate a "You seem..." summary of the user's mood.
* **☁️ Cloud Sync:** Integrated with **Firebase Firestore** and **Authentication** to save data securely.
* **💾 Local Backup:** Uses **IndexedDB** to store heavy media files locally for instant playback.

---

## 🎮 Component 2: Biometric Stress Sensor (Minecraft Edition)

A gamified Chrome Extension that acts as a "Health Bar" for your productivity. It uses algorithmic analysis of your peripherals to detect when you need a break.

### Key Features
1.  **😡 Rage Detector:**
    * Detects aggressive usage of the `Backspace` key (e.g., deleting a mistake 4+ times rapidly).
    * Instantly spikes the internal stress meter.
2.  **😴 Brain Fog (Fatigue) Sensor:**
    * Analyzes the "flight time" (latency) between keystrokes.
    * If you hesitate frequently (pausing 0.5s - 2.0s between keys), it detects mental fatigue.
    * Triggers a "Brain Fog Detected" alert.
3.  **🖱️ Jitter Sensor:**
    * Tracks erratic mouse movements. Shaking the mouse wildly increases the stress score.
4.  **⚖️ Rubber Band Balancing:**
    * Uses game design math to make stress harder to accumulate as you approach 100%, creating a fair "game feel."
5.  **☕️ Cozy Interventions:**
    * If stress hits critical levels, a pixel-art popup appears suggesting a break.

---

## 🛠️ Tech Stack

### Web Application
* **Frontend:** HTML5, CSS (W3.CSS), Vanilla JavaScript.
* **AI Models:** Google Gemini 2.5 Flash (via `esm.run`), face-api.js (TensorFlow.js).
* **Backend:** Google Firebase (Auth, Firestore).
* **Storage:** Browser IndexedDB.

### Chrome Extension
* **Core:** Manifest V3, Chrome Extensions API.
* **Styling:** "Press Start 2P" Font, Pixel Art Assets.
* **Algorithms:** Heuristic analysis for keystroke dynamics.

---

## 📥 Installation Guide

### Part A: Setting up the Web App
1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/Kiddiewinkie/build4students.git]
    ```
2.  **Run Locally:**
    * Because the app requires Camera/Mic permissions and ES Modules, you must enable it before use.
    * **VS Code:** Run index.html.

### Part B: Installing the Chrome Extension
1.  **Download the Extension Folder:** Ensure you have the `extension` folder from this repo.
2.  **Open Chrome Extensions:** Type `chrome://extensions` in your URL bar.
3.  **Enable Developer Mode:** Toggle the switch in the top right corner.
4.  **Load the Extension:**
    * Click **Load unpacked**.
    * Select the extension folder.
5.  **Pin It:** Pin the extension 📌 to your browser toolbar to see your stats.

---

## 🧪 How to Test

### Testing the Web App (Multimodal AI)
1.  Log in using the popup modal.
2.  Go to the **Record** tab.
3.  Click **Start**. Allow camera permissions.
4.  Make facial expressions (smile, frown) while speaking.
5.  Click **Stop**, then **Submit**.
6.  *Result:* The AI will generate a summary like *"You seem happy based on your smile, but your voice sounds slightly tired."*

### Testing the Extension (Stress Sensors)
1.  **Trigger "Stress Critical" 😰:**
    * Open a Google Doc.
    * Spam the `Backspace` key 4-5 times as fast as you can.
    * *Result:* The stress meter will spike.
2.  **Trigger "Brain Fog" 😴:**
    * Type a letter -> Wait 1 second -> Type a letter -> Wait 1 second -> Type a letter.
    * *Result:* The sensor detects the hesitation rhythm and flags fatigue.

---

## 🎨 Credits & Assets

* **Font:** "Press Start 2P" (Google Fonts)
* **Theme:** Coffee & Cream Pixel Art
* **AI Logic:** Powered by Google Gemini
