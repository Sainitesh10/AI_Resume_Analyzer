import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url';
import mammoth from 'mammoth';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  } catch (error) {
    console.error("PDF Parsing Error:", error);
    throw new Error("Failed to extract text from PDF. Ensure the file is not corrupted or password protected.");
  }
};

export const extractTextFromDOCX = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error("DOCX Parsing Error:", error);
    throw new Error("Failed to extract text from DOCX document.");
  }
};

export const extractTextFromTXT = async (file: File): Promise<string> => {
  try {
    return await file.text();
  } catch (error) {
    console.error("TXT Parsing Error:", error);
    throw new Error("Failed to read text file.");
  }
};

export const extractTextFromFile = async (file: File): Promise<string> => {
  const fileName = file.name.toLowerCase();
  
  if (fileName.endsWith('.pdf') || file.type === 'application/pdf') {
    return await extractTextFromPDF(file);
  } else if (
    fileName.endsWith('.docx') || 
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return await extractTextFromDOCX(file);
  } else if (fileName.endsWith('.txt') || file.type === 'text/plain') {
    return await extractTextFromTXT(file);
  } else {
    throw new Error("Unsupported file format. Please upload a PDF, DOCX, or TXT file.");
  }
};
