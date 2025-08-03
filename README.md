# 🧾 Bill Split App

A modern, AI-powered bill splitting application that automatically parses restaurant receipts and fairly splits bills among friends. Built with Next.js, TypeScript, and Together AI.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css)
![Together AI](https://img.shields.io/badge/Together_AI-FF6B35?style=flat-square)

## ✨ Features

- **📸 Smart Receipt Scanning** - Camera integration with AI-powered OCR
- **🤖 Intelligent Parsing** - Automatic item, tax, and tip detection
- **💰 Fair Bill Splitting** - Per-item assignment with proportional charges
- **📱 Mobile-First Design** - Optimized for restaurant use
- **📊 Bill History** - Save and review past splits

## 📱 Screenshots

<div align="center">

<table>
  <tr>
    <td align="center">
      <img src="screenshots/home.png" width="200" alt="Home Page"><br>
      <strong>🏠 Home Page</strong>
    </td>
    <td align="center">
      <img src="screenshots/scanusingoCR.png" width="200" alt="Receipt Scan"><br>
      <strong>📸 AI OCR Scan</strong>
    </td>
    <td align="center">
      <img src="screenshots/items.png" width="200" alt="Items Review"><br>
      <strong>🍽️ Smart Parsing</strong>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="screenshots/people.png" width="200" alt="People Assignment"><br>
      <strong>👥 Fair Assignment</strong>
    </td>
    <td align="center">
      <img src="screenshots/split.png" width="200" alt="Split Summary"><br>
      <strong>💰 Final Split</strong>
    </td>
    <td align="center">
      <img src="screenshots/history.png" width="200" alt="Bill History"><br>
      <strong>📊 History</strong>
    </td>
  </tr>
</table>

</div>

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Zustand** - State management
- **Together AI** - Receipt parsing API

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/bill-split-app.git
cd bill-split-app

# Install dependencies
npm install

# Set up environment variables (see .env.local.example)
# Add your Together AI API key for development

# Run development server
npm run dev
```

## 📁 Project Structure

```
bill-split-app/
├── src/app/
│   ├── api/parse-receipt/    # Together AI integration
│   ├── scan/                 # Receipt scanning
│   ├── items/                # Item review
│   ├── people/               # People & assignment
│   ├── summary/              # Split calculations
│   └── history/              # Bill history
├── src/store/                # Zustand state management
└── screenshots/              # App screenshots
```

## 🔄 How It Works

1. **📸 Scan** - Take photo or upload receipt
2. **🤖 AI Parse** - Together AI extracts items and prices
3. **👥 Add People** - Manage who's splitting the bill
4. **🎯 Assign Items** - Select who ate what
5. **💰 Calculate** - Get fair split with tax/tip
6. **📤 Share** - Export results

## 🌟 Why This App?

### ✅ AI-Powered
- **Advanced OCR** - Together AI for accurate text recognition
- **Smart parsing** - Handles various receipt formats
- **High accuracy** - Better than traditional OCR

### ✅ Developer Friendly
- **Modern stack** - Next.js 14 + TypeScript
- **Clean code** - Well-organized architecture
- **API integration** - Real-world AI implementation

### ✅ User Focused
- **Intuitive design** - Easy for anyone to use
- **Mobile optimized** - Perfect for restaurants
- **Fast performance** - Smooth and responsive

## 🛡️ Development

This project uses Together AI for receipt processing. For local development:
1. Get Together AI API key
2. Add to `.env.local` (never commit this file)
3. Run locally for development/learning

---

<div align="center">

**Made with ❤️ and AI for fair bill splitting**

⭐ **Star this repo if it helped you learn!** ⭐

</div>