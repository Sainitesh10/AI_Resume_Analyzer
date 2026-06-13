
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText, User, Briefcase, IndianRupee, TrendingUp, Lightbulb, Target, CheckCircle, X, FileEdit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PersonalInfoAnalysis from '@/components/analyzer/PersonalInfoAnalysis';
import JobRoleAnalysis from '@/components/analyzer/JobRoleAnalysis';
import SalaryEstimation from '@/components/analyzer/SalaryEstimation';
import PreferredRoleAnalysis from '@/components/analyzer/PreferredRoleAnalysis';
import ImprovementSuggestions from '@/components/analyzer/ImprovementSuggestions';
import SkillsAnalysis from '@/components/analyzer/SkillsAnalysis';
import CoverLetterGenerator from '@/components/analyzer/CoverLetterGenerator';
import { analyzeResumeText } from '@/utils/resumeAnalyzer';
import { extractTextFromFile } from '@/utils/fileParser';

const ResumeAnalyzer = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [rawText, setRawText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    console.log('File upload attempted:', file.name, file.type);
    
    if (file.type === 'application/pdf' || 
        file.type === 'text/plain' || 
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.name.toLowerCase().endsWith('.pdf') ||
        file.name.toLowerCase().endsWith('.doc') ||
        file.name.toLowerCase().endsWith('.docx') ||
        file.name.toLowerCase().endsWith('.txt')) {
      
      setResumeFile(file);
      setShowSuccess(true);
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} is ready for analysis`,
      });

      // Auto-redirect to analysis after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
        analyzeResume(file);
      }, 2000);
    } else {
      console.log('Invalid file type:', file.type);
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, DOCX, or TXT file",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input change event triggered');
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file);
      handleFileUpload(file);
    } else {
      console.log('No file selected');
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      console.log('File dropped:', file);
      handleFileUpload(file);
    }
  };

  const analyzeResume = async (file?: File) => {
    const fileToAnalyze = file || resumeFile;
    if (!fileToAnalyze) {
      toast({
        title: "No resume file",
        description: "Please upload a resume file",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      toast({
        title: "Extracting Text",
        description: "Reading document contents securely in your browser...",
      });
      
      const extractedText = await extractTextFromFile(fileToAnalyze);
      setRawText(extractedText);
      
      toast({
        title: "Analyzing Resume",
        description: "Gemini AI is processing your resume data...",
      });
      
      const analysisResult = await analyzeResumeText(extractedText);
      setAnalysis(analysisResult);
      toast({
        title: "Analysis completed",
        description: "Your resume has been analyzed successfully",
      });
    } catch (error: any) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: error.message || "There was an error analyzing your resume",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearFile = () => {
    setResumeFile(null);
    setShowSuccess(false);
    setAnalysis(null);
  };

  const handleChooseFileClick = () => {
    const fileInput = document.getElementById('resume-file') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="min-h-screen relative p-4 text-white">
      <div className="aurora-bg">
        <div className="aurora-orb aurora-orb-1"></div>
        <div className="aurora-orb aurora-orb-2"></div>
        <div className="aurora-orb aurora-orb-3"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-400">AI Resume Analyzer</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get comprehensive insights about your resume with AI-powered analysis. 
            Discover your ideal role, salary expectations, and improvement suggestions.
          </p>
        </div>

        {!analysis && (
          <Card className="mb-8 overflow-hidden glass-panel border-0">
            <CardHeader className="bg-white/5 border-b border-white/10 text-white">
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Your Resume
              </CardTitle>
              <CardDescription className="text-blue-100">
                Upload your resume file for comprehensive AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              {/* Drag and Drop Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                  isDragOver 
                    ? 'border-teal-400 bg-teal-400/10 scale-105' 
                    : resumeFile 
                    ? 'border-green-400 bg-green-400/10' 
                    : 'border-white/20 hover:border-teal-400 hover:bg-teal-400/5'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleChooseFileClick}
              >
                {showSuccess ? (
                  <div className="animate-fade-in">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-xl font-semibold text-green-700 mb-2">Upload Successful!</h3>
                    <p className="text-green-600">Analyzing your resume...</p>
                    <div className="mt-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                    </div>
                  </div>
                ) : resumeFile ? (
                  <div className="animate-fade-in">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <FileText className="h-12 w-12 text-green-500" />
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{resumeFile.name}</p>
                        <p className="text-sm text-gray-600">{(resumeFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearFile();
                        }}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-green-600 font-medium mb-4">File ready for analysis</p>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        analyzeResume();
                      }}
                      disabled={isAnalyzing}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Target className="h-4 w-4 mr-2" />
                          Analyze Resume
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <Upload className={`h-16 w-16 mx-auto mb-4 transition-colors ${
                      isDragOver ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <h3 className="text-xl font-semibold text-gray-200 mb-2">
                      {isDragOver ? 'Drop your file here' : 'Drag & drop your resume'}
                    </h3>
                    <p className="text-gray-400 mb-4">or click to browse files</p>
                    <Button 
                      variant="outline" 
                      className="hover:scale-105 transition-transform bg-transparent border-white/20 hover:bg-white/10 text-gray-900 dark:text-white"
                      onClick={handleChooseFileClick}
                    >
                      Choose File
                    </Button>
                    <p className="text-xs text-gray-400 mt-4">
                      Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
                    </p>
                  </div>
                )}
              </div>

              {/* Hidden File Input */}
              <Input
                id="resume-file"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleInputChange}
                className="hidden"
              />
            </CardContent>
          </Card>
        )}

        {analysis && (
          <div className="animate-fade-in">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Resume Analysis Results</h2>
              <Button 
                onClick={clearFile}
                variant="outline"
                className="bg-transparent border-white/20 hover:bg-white/10 text-gray-900 dark:text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload New Resume
              </Button>
            </div>

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-7 mb-8">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Personal Info
                </TabsTrigger>
                <TabsTrigger value="role" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Current Role
                </TabsTrigger>
                <TabsTrigger value="salary" className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" />
                  Salary
                </TabsTrigger>
                <TabsTrigger value="preferred" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Preferred Role
                </TabsTrigger>
                <TabsTrigger value="improvements" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Improvements
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Skills
                </TabsTrigger>
                <TabsTrigger value="coverLetter" className="flex items-center gap-2 text-indigo-600 font-semibold">
                  <FileEdit className="h-4 w-4" />
                  Cover Letter
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <PersonalInfoAnalysis data={analysis.personalInfo} />
              </TabsContent>

              <TabsContent value="role">
                <JobRoleAnalysis data={analysis.currentRole} />
              </TabsContent>

              <TabsContent value="salary">
                <SalaryEstimation data={analysis.salaryEstimation} />
              </TabsContent>

              <TabsContent value="preferred">
                <PreferredRoleAnalysis data={analysis.preferredRole} />
              </TabsContent>

              <TabsContent value="improvements">
                <ImprovementSuggestions data={analysis.improvements} />
              </TabsContent>

              <TabsContent value="skills">
                <SkillsAnalysis data={analysis.skills} />
              </TabsContent>

              <TabsContent value="coverLetter">
                <CoverLetterGenerator resumeText={rawText} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
