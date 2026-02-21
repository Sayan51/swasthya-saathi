<<<<<<< HEAD
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Z9sy1sHtRetLYD11lmrKVTeqrZsWIBe3

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
=======
# Swasthya Saathi - AI-Powered Rural Health Navigator

A comprehensive AI-driven healthcare platform designed for India's rural population. Built with Next.js, featuring voice-first interfaces, local language support, and government integrations.

## 🌟 Features

1. **AI Health Assistant** - Conversational AI with voice input/output in Hindi & English
2. **Symptom Checker** - Intelligent 3-step assessment with care recommendations
3. **Facility Finder** - Locate nearby PHCs, CHCs, hospitals, and Jan Aushadhi centers
4. **Medicine Information** - Search medicines, find generic alternatives, save money
5. **Government Schemes** - Check eligibility for Ayushman Bharat and other schemes
6. **Emergency Response** - One-tap access to 108 ambulance with first-aid tips

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A Gemini API key (get from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. Clone or navigate to the project:
```bash
cd swasthya-saathi
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your Gemini API key
# GEMINI_API_KEY=your_actual_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 PWA Installation

The app works as a Progressive Web App (PWA):
- On mobile: Tap "Add to Home Screen" in your browser menu
- On desktop: Look for the install icon in the address bar

## 🎨 Technologies Used

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **AI**: Google Gemini API
- **Voice**: Web Speech API (browser-based)
- **Icons**: Lucide React
- **PWA**: Next-PWA compatible

## 🌐 Language Support

- English (en)
- Hindi (hi)
- Easily expandable to 22 Indian languages

## 🏗️ Project Structure

```
swasthya-saathi/
├── app/
│   ├── chat/          # AI Health Assistant
│   ├── symptoms/      # Symptom Checker
│   ├── facilities/    # Facility Finder
│   ├── medicines/     # Medicine Information
│   ├── schemes/       # Government Schemes
│   ├── emergency/     # Emergency Response
│   └── api/          # API routes
├── lib/
│   ├── data/         # Mock data (facilities, medicines, etc.)
│   └── i18n/         # Language translations
├── components/       # Reusable components
└── public/          # Static assets
```

## 🔐 API Keys Required

### Gemini AI (Required)
- **Purpose**: Powers the AI Health Assistant
- **Get it**: https://makersuite.google.com/app/apikey
- **Free tier**: 60 requests per minute

### Google Maps (Optional)
- **Purpose**: Map view in Facility Finder
- **Note**: List view works without this

## 📊 Mock Data

The app uses realistic mock data for:
- Healthcare facilities (PHCs, CHCs, hospitals)
- Medicines and generic alternatives
- Symptom database
- Government schemes (Ayushman Bharat, JSSK)

For production, integrate with:
- ABDM API for real facility data
- Bhashini for advanced voice support
- NDHM for scheme enrollments

## 🎯 Target Audience

- Rural Indians (900M+ population)
- ASHA workers
- Small clinic operators
- Government health officials

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🌍 Browser Support

- Chrome/Edge (recommended - full voice support)
- Firefox (limited voice features)
- Safari (partial voice support on iOS)

## 📝 License

This project is created for AI for Bharat initiative.

## 🤝 Contributing

This is a demo application showcasing AI-powered healthcare for rural India. For production deployment, consider:

1. Obtaining government API access (ABDM, NDHM, Bhashini)
2. Adding user authentication
3. Implementing telemedicine features
4. Setting up analytics for ASHA workers
5. Adding offline-first data sync

## 🆘 Troubleshooting

**Voice input not working?**
- Use Chrome or Edge browser
- Grant microphone permissions
- Check if your language is set correctly

**AI Chat errors?**
- Verify your GEMINI_API_KEY in .env.local
- Check if you've exceeded the free tier limit
- Ensure API key is active

**Build errors?**
- Delete node_modules and package-lock.json
- Run `npm install` again
- Clear Next.js cache: `rm -rf .next`

## 📞 Emergency Numbers

- Ambulance: **108**
- Police: **100**
- Fire: **101**
- Women Helpline: **1091**
- Child Helpline: **1098**

---

Built with ❤️ for rural India's healthcare needs
>>>>>>> 437a83265ffc5cda887d01568a131542f879559e
