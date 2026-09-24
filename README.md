# iKwath — Smart Ayurvedic Kadha Dashboard 🍵

> A real-time patient dashboard for the **iKwath Smart Kadha Brewing Machine** — an IoT-enabled, Ayurvedic-compliant decoction maker that uses **Ultrasound-Assisted Extraction (UAE)** and **Vacuum Evaporation** to brew standardized Kadha at home.

**Smart India Hackathon 2026 | Problem Statement: SIH26048 | Team: OHM's LAWMEN**

## 🌿 Features

| Feature | Description |
|:---|:---|
| **Live Brew Status** | Real-time animated temperature gauge, progress bar, and 5-step brew phase tracking |
| **Kadha Streak Calendar** | GitHub-style contribution grid showing daily Kadha compliance |
| **Pod Inventory** | Visual cards with low-stock warnings and restock alerts |
| **Recipe Library** | All 33 official AFI Kvatha Curna formulations with search, filter, and detailed modals |
| **Brew History** | Sortable log of all past brews with temperature, duration, and status |
| **Health Profile** | Prakriti type, prescribed Kadhas, and doctor's notes |
| **Auto-Order** | Simulated shopping cart with checkout for pod refill subscriptions |

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Fonts:** Google Fonts (Poppins)
- **Icons:** Font Awesome 6
- **Data:** localStorage (Firebase-ready architecture)
- **Hosting:** GitHub Pages

## 🚀 Live Demo

**[View Dashboard →](https://YOUR_USERNAME.github.io/ikwath-dashboard/)**

## 📁 Project Structure

```
ikwath-dashboard/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Complete stylesheet (earthy Ayurvedic theme)
├── js/
│   ├── data.js         # Data layer (33 AFI recipes, defaults, localStorage)
│   └── app.js          # Application logic (all 7 tiles)
└── README.md           # This file
```

## 📦 How to Deploy on GitHub Pages

1. Create a new GitHub repository named `ikwath-dashboard`
2. Upload all files from this folder
3. Go to **Settings → Pages → Source → Deploy from a branch → main → / (root)**
4. Your dashboard will be live at: `https://YOUR_USERNAME.github.io/ikwath-dashboard/`

## 🔗 Related

- **Hardware:** ESP32 + PT100 RTD + HX711 Load Cell + 40kHz Ultrasonic Transducer
- **Firmware:** C++ / FreeRTOS / PID Control
- **Reference:** Ayurvedic Formulary of India (AFI), Part I, Section 4 (Kvatha Curna)

---

*Built with ❤️ for Smart India Hackathon 2026*
