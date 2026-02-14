<div align="center">

# ✨ SmartJourney ✨

### *Your AI-Powered Personal Trip Planner* 🌸

<img src="public/logo.svg" alt="SmartJourney Logo" width="120" height="120" />

[![Next.js](https://img.shields.io/badge/Next.js-15.1.3-blueviolet?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-mediumpurple?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-ff69b4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Convex](https://img.shields.io/badge/Convex-Database-lavender?style=for-the-badge)](https://www.convex.dev/)

*Where dreams meet destinations* 💫

[✨ Live Demo](#) • [📖 Documentation](#features) • [🎀 Features](#features) • [🌟 Get Started](#getting-started)

---

</div>

## 🌙 About SmartJourney

**SmartJourney** is a premium AI-powered trip planning application that transforms your travel dreams into perfectly curated itineraries. With a stunning cosmic-inspired interface and intelligent AI assistance, planning your next adventure has never been more magical! ✨

### 💖 Why SmartJourney?

- 🤖 **AI-Powered Planning** - Let our smart AI create personalized itineraries just for you
- 🎨 **Beautiful Cosmic UI** - Immerse yourself in a gorgeous purple-cyan gradient interface
- 🗺️ **Interactive Maps** - Visualize your journey with integrated Google Maps
- 🏨 **Smart Recommendations** - Get curated hotel and activity suggestions
- 💾 **Save & Share** - Keep all your trips organized and share with friends
- 📱 **Mobile Friendly** - Plan on-the-go with our responsive design
- 🌈 **Customizable** - Choose your travel pace, style, and interests

---

## ✨ Features

### 🎯 Core Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Chat Interface** | Conversational trip planning with natural language |
| 🗺️ **Interactive Globe** | Beautiful 3D globe visualization of your destinations |
| 📅 **Day-by-Day Itineraries** | Detailed plans with activities, timings, and locations |
| 🏨 **Hotel Recommendations** | AI-curated accommodation options with pricing |
| 🎭 **Activity Suggestions** | Personalized activities based on your interests |
| 🌤️ **Weather Integration** | Real-time weather forecasts for your destination |
| 💳 **Budget Planning** | Flexible budget options from cheap to luxury |
| 👥 **Group Travel** | Plan for solo, couples, family, or group trips |
| 📄 **PDF Export** | Download beautiful PDF itineraries |
| 🔗 **Share Trips** | Share your plans with travel companions |

### 🎨 Design Highlights

- **Cosmic Theme** - Purple, indigo, and cyan gradients throughout
- **Glassmorphism** - Modern frosted glass effects
- **Smooth Animations** - Delightful micro-interactions
- **Dark Mode** - Easy on the eyes, perfect for late-night planning
- **Premium Typography** - Beautiful font combinations
- **Responsive Design** - Looks stunning on all devices

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- 💻 **Node.js** (v18 or higher)
- 📦 **npm** or **yarn**
- 🔑 **API Keys** (see [Environment Setup](#environment-setup))

### 📥 Installation

```bash
# Clone this magical repository ✨
git clone https://github.com/yourusername/ai-trip-planner-21.git

# Navigate to the project
cd ai-trip-planner-21

# Install dependencies 📦
npm install

# Set up your environment variables 🔐
cp .env.example .env

# Run the development server 🚀
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start planning! 🎉

---

## 🔐 Environment Setup

Create a `.env` file in the root directory with the following keys:

```env
# 🤖 AI Provider (Google Gemini)
GEMINI_API_KEY=your_gemini_api_key_here

# 🗺️ Google Maps & Places
NEXT_PUBLIC_GOOGLE_MAP_API_KEY=your_google_maps_key_here

# 🔒 Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# 💾 Database (Convex)
CONVEX_DEPLOYMENT=your_convex_deployment_url
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# 🛡️ Security (Arcjet)
ARCJET_KEY=your_arcjet_key
```

### 🔑 Getting API Keys

1. **Gemini API** - [Get your key](https://ai.google.dev/)
2. **Google Maps** - [Google Cloud Console](https://console.cloud.google.com/)
3. **Clerk Auth** - [Clerk Dashboard](https://clerk.com/)
4. **Convex** - [Convex Dashboard](https://www.convex.dev/)
5. **Arcjet** - [Arcjet Dashboard](https://arcjet.com/)

---

## 🛠️ Tech Stack

### Frontend Magic ✨

- **⚛️ Next.js 15** - React framework with App Router
- **💎 TypeScript** - Type-safe development
- **🎨 Tailwind CSS v4** - Utility-first styling
- **🌈 Framer Motion** - Smooth animations
- **🗺️ Leaflet** - Interactive maps
- **📊 Recharts** - Beautiful charts

### Backend Power 💪

- **🤖 Google Gemini** - AI trip generation
- **💾 Convex** - Real-time database
- **🔒 Clerk** - Authentication
- **🛡️ Arcjet** - Security & rate limiting
- **🗺️ Google Places API** - Location data

### UI Components 🎀

- **shadcn/ui** - Beautiful component library
- **Lucide Icons** - Gorgeous icon set
- **React Hook Form** - Form management
- **Sonner** - Toast notifications

---

## 📁 Project Structure

```
ai-trip-planner-21/
├── 📱 app/
│   ├── (auth)/              # Authentication pages
│   ├── _components/         # Shared components
│   ├── api/                 # API routes
│   ├── create-new-trip/     # Trip creation flow
│   ├── view-trip/           # Trip viewing
│   ├── my-trips/            # User's saved trips
│   └── pricing/             # Pricing page
├── 🎨 components/
│   └── ui/                  # Reusable UI components
├── 🗄️ convex/              # Database schema & functions
├── 🔧 lib/                  # Utility functions
├── 🌍 public/               # Static assets
└── 📝 README.md             # You are here! 💖
```

---

## 🎯 Usage Guide

### Creating Your First Trip 🗺️

1. **Sign In** - Create an account or log in
2. **Start Planning** - Click "Create New Trip" ✨
3. **Chat with AI** - Tell the AI about your dream destination
4. **Customize** - Choose budget, duration, travel style
5. **Review** - Check your personalized itinerary
6. **Save & Share** - Keep it for later or share with friends!

### Features Walkthrough 🌟

#### 💬 AI Chat Interface
- Natural conversation with the AI
- Answer questions about your preferences
- Get instant itinerary suggestions

#### 🗺️ Interactive Map
- See all your destinations on a beautiful globe
- Click locations for more details
- Toggle between map and itinerary views

#### 📅 Itinerary Timeline
- Day-by-day breakdown of activities
- Time estimates for each activity
- Pricing information included

#### 🏨 Hotel Recommendations
- Curated hotel options
- Ratings and reviews
- Direct booking links

---

## 🎨 Customization

### Changing the Theme

The cosmic theme can be customized in `app/globals.css`:

```css
:root {
  --background: #0b061f;
  --primary: #7c3aed;      /* Violet */
  --secondary: #8b5cf6;    /* Purple */
  --accent: #22d3ee;       /* Cyan */
}
```

### Adding New Features

1. Create components in `app/_components/`
2. Add database schema in `convex/`
3. Create API routes in `app/api/`
4. Style with Tailwind classes

---

## 🤝 Contributing

We'd love your help making SmartJourney even more magical! ✨

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💖 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 🚀 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🎉 Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💝 Acknowledgments

- 🎨 Design inspiration from cosmic and glassmorphism trends
- 🤖 Powered by Google Gemini AI
- 🗺️ Maps by Google Maps Platform
- 💜 Built with love and lots of coffee ☕

---

## 📞 Support

Need help? We're here for you! 💖

- 📧 Email: support@smartjourney.app
- 💬 Discord: [Join our community](#)
- 🐦 Twitter: [@SmartJourney](#)
- 📖 Docs: [Read the docs](#)

---

<div align="center">

### 🌟 Made with 💜 by the SmartJourney Team

*Happy travels! May your journeys be as magical as your dreams* ✨🌸

[![Star this repo](https://img.shields.io/github/stars/yourusername/ai-trip-planner-21?style=social)](https://github.com/yourusername/ai-trip-planner-21)

</div>
