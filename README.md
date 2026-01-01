# 10th Grade Career Compass

This is a Next.js application built in Firebase Studio to help 10th-grade students explore potential career paths. It uses AI to provide personalized recommendations and simulations.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (version 18 or higher is recommended)
- [npm](https://www.npmjs.com/) (which comes with Node.js)

## Running the Project Locally

Follow these steps to get the application running on your device:

### 1. Copy Project Files

Create a new folder on your computer for this project. Then, copy all the project files and their contents from the development environment into your new folder. Make sure to replicate the folder structure exactly (e.g., `src/app/page.tsx`, `package.json`, etc.).

### 2. Set Up Environment Variables

Create a new file named `.env` in the root directory of your project. This file will store your secret API keys. Add the following lines to it, replacing the placeholder text with your actual keys:

```
GEMINI_API_KEY="YOUR_GOOGLE_AI_STUDIO_API_KEY"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_GOOGLE_MAPS_API_KEY"
```

- You can get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey).
- You can get a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/overview). Make sure to enable the "Maps JavaScript API".

### 3. Install Dependencies

Open a terminal or command prompt in your project's root folder and run the following command to install all the necessary packages:

```bash
npm install
```

### 4. Run the Development Server

Once the installation is complete, start the local development server with this command:

```bash
npm run dev
```

This will start the application, typically on `http://localhost:9002`. You can open this URL in your web browser to see the app in action!