# KeyNest React

A modern React application for vacation rental listings, built with Vite and React. View the live application at [https://kodev-keynest-react.netlify.app/](https://kodev-keynest-react.netlify.app/)

## Overview

KeyNest is a multilingual (EN/FR/ES) vacation rental platform that showcases properties with detailed information, image galleries, and interactive features. The application demonstrates modern React practices including hooks, context, and responsive design.

## Features

- 🌐 Multilingual support (English, French, Spanish)
- 🖼️ Interactive image carousel with modal view
- 🏠 Detailed property listings
- 📱 Fully responsive design
- 🎨 Clean, modern UI
- ⚡ Fast performance with Vite
- 🧪 Comprehensive test coverage

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AccordionItem/  # Expandable content sections
│   ├── Footer/         # Site footer with language selection
│   ├── Header/         # Navigation header
│   ├── LanguageSelect/ # Language switcher
│   └── RelatedApts/    # Related properties component
├── context/            # React context providers
│   └── LanguageContext # Multilingual support context
├── data/              # Static data and translations
│   ├── baseData.json  # Common translations
│   └── data.json      # Property listings data
├── hooks/             # Custom React hooks
│   └── useLanguage    # Language management hook
├── pages/             # Page components
│   ├── About/         # About page
│   ├── Apartment/     # Property details page
│   ├── Home/          # Landing page
│   └── NotFound/      # 404 error page
├── services/          # API and service functions
├── styles/            # CSS styles
└── tests/            # Test files
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/keynest-react.git
cd keynest-react
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`


## Testing

The project uses Vitest for testing. Key testing features include:

- Component testing with React Testing Library
- Mock service workers for API testing
- Snapshot testing
- Coverage reporting

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

View test UI (you should run npm test first as a running vitest server is required):
```bash
npm run test:ui
```


