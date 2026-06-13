<div align="center">
  <h1>📄 AI Resume Analyzer (Vite + React Edition)</h1>
  <p>An intelligent tool to analyze resumes, provide ATS scoring, extract skills, and generate tailored Cover Letters using Gemini 2.5 Flash AI.</p>
</div>

<br/>

## 🚀 Project Overview

**AI Resume Analyzer** is a next-generation web application designed to help job applicants optimize their resumes. By uploading a resume (PDF/DOCX/TXT), the system securely extracts the raw text directly in your browser and leverages the **Google Gemini 2.5 Flash** model to provide personalized improvement suggestions, salary estimates, and even draft a highly tailored Cover Letter based on a target Job Description.

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + Glassmorphism UI
- **UI Components:** Shadcn UI + Lucide React Icons
- **AI Integration:** `@google/generative-ai` (Gemini 2.5 Flash)
- **Document Parsing:** `pdfjs-dist` (PDFs) and `mammoth` (DOCX)

## ✨ Features

- 📤 **Secure Resume Parsing:** Extracts text from PDFs and DOCX files entirely within the browser. Your file is never sent to a server.
- 🎯 **AI Resume Analysis:** Extracts Personal Info, Current Role, Skills, and suggested Improvement Areas.
- 💵 **Salary Estimation:** Predicts market salary ranges based on extracted skills and experience.
- 📝 **Cover Letter Generator:** Paste a Job Description to instantly generate a professional, highly-tailored Cover Letter.
- 🌌 **Premium Aesthetics:** Stunning Glassmorphism UI with subtle micro-animations and an Aurora background.

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- A Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sainitesh10/AI_Resume_Analyzer.git
   cd AI_Resume_Analyzer
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   VITE_GOOGLE_API_KEY=your_gemini_api_key_here
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.
