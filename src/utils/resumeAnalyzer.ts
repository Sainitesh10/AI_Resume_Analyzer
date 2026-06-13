import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ResumeAnalysis {
  personalInfo: PersonalInfo;
  currentRole: CurrentRole;
  salaryEstimation: SalaryEstimation;
  preferredRole: PreferredRole;
  improvements: Improvements;
  skills: SkillsAnalysis;
}

export interface PersonalInfo {
  name: string;
  contact: string;
  location: string;
  experience: string;
  education: string;
  summary: string;
}

export interface CurrentRole {
  title: string;
  level: string;
  industry: string;
  responsibilities: string[];
  achievements: string[];
  matchScore: number;
}

export interface SalaryEstimation {
  currentRange: { min: number; max: number };
  potentialRange: { min: number; max: number };
  factors: string[];
  marketAnalysis: string;
}

export interface PreferredRole {
  suggestedRoles: string[];
  reasonsForFit: string[];
  growthPath: string[];
  marketDemand: string;
}

export interface Improvements {
  technical: string[];
  soft: string[];
  certifications: string[];
  experience: string[];
  resume: string[];
}

export interface SkillsAnalysis {
  technical: { skill: string; level: string; demand: string }[];
  soft: { skill: string; level: string; importance: string }[];
  trending: string[];
  gaps: string[];
}

export const analyzeResumeText = async (resumeText: string): Promise<ResumeAnalysis> => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing VITE_GOOGLE_API_KEY environment variable. Please add it to .env");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // Using gemini-2.5-flash for incredibly fast and accurate extraction
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are an expert HR recruiter and career counselor.
    Analyze the following resume text and extract the information in JSON format EXACTLY matching this schema. Do NOT include markdown backticks or any other text outside the JSON object.
    
    {
      "personalInfo": {
        "name": "string",
        "contact": "string",
        "location": "string",
        "experience": "string",
        "education": "string",
        "summary": "string"
      },
      "currentRole": {
        "title": "string",
        "level": "string",
        "industry": "string",
        "responsibilities": ["string", "string"],
        "achievements": ["string", "string"],
        "matchScore": number (0-100)
      },
      "salaryEstimation": {
        "currentRange": { "min": number, "max": number },
        "potentialRange": { "min": number, "max": number },
        "factors": ["string"],
        "marketAnalysis": "string"
      },
      "preferredRole": {
        "suggestedRoles": ["string"],
        "reasonsForFit": ["string"],
        "growthPath": ["string"],
        "marketDemand": "string"
      },
      "improvements": {
        "technical": ["string"],
        "soft": ["string"],
        "certifications": ["string"],
        "experience": ["string"],
        "resume": ["string"]
      },
      "skills": {
        "technical": [{ "skill": "string", "level": "Beginner|Intermediate|Advanced", "demand": "Low|Medium|High" }],
        "soft": [{ "skill": "string", "level": "Beginner|Intermediate|Advanced", "importance": "Low|Medium|High|Critical" }],
        "trending": ["string"],
        "gaps": ["string"]
      }
    }

    Resume Text:
    ${resumeText}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up potential markdown formatting from Gemini
    text = text.replace(/\`\`\`json/g, "").replace(/\`\`\`/g, "").trim();
    
    const analysis: ResumeAnalysis = JSON.parse(text);
    return analysis;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze resume with AI.");
  }
};

export const generateCoverLetter = async (resumeText: string, jobDescription: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing VITE_GOOGLE_API_KEY environment variable. Please add it to .env");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are an expert career counselor. Write a highly tailored, professional cover letter based on the following Resume and Job Description.
    Make it concise, compelling, and uniquely matched to the job description. Do NOT use placeholder brackets for things that are in the resume; use the actual data. If something is missing from the resume (like company name or hiring manager), it is okay to use standard [Hiring Manager Name] placeholders.
    
    Resume:
    ${resumeText}
    
    Job Description:
    ${jobDescription}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate cover letter with AI.");
  }
};
