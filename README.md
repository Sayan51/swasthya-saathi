# 🌿 Swasthya Saathi – AI-Powered Rural Health Navigator

Swasthya Saathi is an AI-driven healthcare platform designed to assist India's rural population with accessible, voice-enabled medical guidance, facility discovery, and government health scheme awareness.

🔗 **Live App:** https://swasthya-saathi-xi.vercel.app

> ⚠️ This application provides informational assistance only and does not replace professional medical consultation.

---

## 🌟 Key Features

### 🤖 AI Health Assistant
- Conversational AI powered by Gemini API
- Voice input/output support
- Hindi & English language support

### 🩺 Symptom Checker
- Intelligent 3-step health assessment
- Care recommendations based on responses

### 🏥 Facility Finder
- Locate nearby PHCs, CHCs, hospitals
- Find Jan Aushadhi medicine centers

### 💊 Medicine Information
- Search medicines
- Discover generic alternatives
- Cost-saving insights

### 🏛 Government Schemes
- Ayushman Bharat eligibility check
- Rural healthcare scheme information

### 🚨 Emergency Support
- One-tap access to 108 ambulance
- Quick first-aid guidance
- Important emergency contacts

---

## 🚀 Tech Stack

| Layer        | Technology |
|-------------|------------|
| Framework   | Next.js 14 |
| Frontend    | React + TypeScript |
| Styling     | Tailwind CSS |
| AI Engine   | Google Gemini API |
| Voice       | Web Speech API |
| Icons       | Lucide React |
| Deployment  | Vercel |

---

## 📁 Project Structure
swasthya-saathi/
├── app/
│ ├── chat/ # AI Health Assistant
│ ├── symptoms/ # Symptom Checker
│ ├── facilities/ # Facility Finder
│ ├── medicines/ # Medicine Information
│ ├── schemes/ # Government Schemes
│ ├── emergency/ # Emergency Response
│ └── api/ # API routes
│
├── lib/
│ ├── data/ # Mock healthcare data
│ └── i18n/ # Language translations
│
├── components/ # Reusable UI components
├── public/ # Static assets
├── package.json
└── README.md

---

## 🚀 Getting Started

### 📌 Prerequisites
- Node.js 18+
- npm
- Gemini API Key

---

### 📥 Installation

Clone the repository:

```bash
git clone https://github.com/Sayan51/swasthya-saathi.git
cd swasthya-saathi

Install dependencies:
npm install
```
🔐 Environment Setup

Create a .env.local file in the root directory:
GEMINI_API_KEY=your_actual_api_key_here
Replace with your actual Gemini API key.

Get your API key from:
https://makersuite.google.com/app/apikey

▶ Run Development Server
npm run dev
Open:
http://localhost:3000

🏗 Production Build
npm run build
npm start

📱 Progressive Web App (PWA)
Swasthya Saathi can be installed as a PWA:
Mobile: Tap "Add to Home Screen"
Desktop: Use browser install option

🌐 Language Support
English
Hindi
Expandable to all 22 Indian languages

🎯 Target Users
Rural citizens
ASHA workers
Small clinics
Government health programs

🔐 Required API Keys
Gemini AI (Required)
Powers AI health assistant
Free tier available
Google Maps (Optional)
Enables map visualization in facility finder
List mode works without it

🆘 Emergency Contacts (India)
🚑 Ambulance: 108
👮 Police: 100
🔥 Fire: 101
👩 Women Helpline: 1091
👶 Child Helpline: 1098

⚠️ Disclaimer

This project is built for demonstration and innovation purposes.
For real-world deployment, integration with official government APIs (ABDM, NDHM, Bhashini) is recommended.

🤝 Contributing
Fork the repository
Create a feature branch
Commit changes
Submit a pull request

❤️ Built For
Rural India's healthcare accessibility and digital inclusion.
