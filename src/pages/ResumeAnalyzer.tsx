
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText, User, Briefcase, IndianRupee, TrendingUp, Lightbulb, Target, CheckCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PersonalInfoAnalysis from '@/components/analyzer/PersonalInfoAnalysis';
import JobRoleAnalysis from '@/components/analyzer/JobRoleAnalysis';
import SalaryEstimation from '@/components/analyzer/SalaryEstimation';
import PreferredRoleAnalysis from '@/components/analyzer/PreferredRoleAnalysis';
import ImprovementSuggestions from '@/components/analyzer/ImprovementSuggestions';
import SkillsAnalysis from '@/components/analyzer/SkillsAnalysis';
import { analyzeResumeText } from '@/utils/resumeAnalyzer';

const ResumeAnalyzer = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    if (file.type === 'application/pdf' || file.type === 'text/plain' || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
      setResumeFile(file);
      setResumeText(`Resume content from ${file.name}`);
      setShowSuccess(true);
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} is ready for analysis`,
      });

      // Auto-redirect after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
        analyzeResume();
      }, 2000);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, DOCX, or TXT file",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleTextInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(event.target.value);
  };

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      toast({
        title: "No resume content",
        description: "Please upload a file or paste resume text",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysisResult = await analyzeResumeText(resumeText);
      setAnalysis(analysisResult);
      toast({
        title: "Analysis completed",
        description: "Your resume has been analyzed successfully",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your resume",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearFile = () => {
    setResumeFile(null);
    setResumeText('');
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Resume Analyzer</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get comprehensive insights about your resume with AI-powered analysis. 
            Discover your ideal role, salary expectations, and improvement suggestions.
          </p>
        </div>

        {!analysis && (
          <Card className="mb-8 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Your Resume
              </CardTitle>
              <CardDescription className="text-blue-100">
                Upload your resume file or paste the text content for analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {/* Drag and Drop Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  isDragOver 
                    ? 'border-blue-500 bg-blue-50 scale-105' 
                    : resumeFile 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {showSuccess ? (
                  <div className="animate-fade-in">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4 animate-scale-in" />
                    <h3 className="text-xl font-semibold text-green-700 mb-2">Upload Successful!</h3>
                    <p className="text-green-600">Redirecting to analysis...</p>
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
                        onClick={clearFile}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-green-600 font-medium">File ready for analysis</p>
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <Upload className={`h-16 w-16 mx-auto mb-4 transition-colors ${
                      isDragOver ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      {isDragOver ? 'Drop your file here' : 'Drag & drop your resume'}
                    </h3>
                    <p className="text-gray-500 mb-4">or click to browse files</p>
                    <Label htmlFor="resume-file" className="cursor-pointer">
                      <Button variant="outline" className="hover-scale">
                        Choose File
                      </Button>
                    </Label>
                    <Input
                      id="resume-file"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-400 mt-4">
                      Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
                    </p>
                  </div>
                )}
              </div>

              {/* Text Input Alternative */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-gray-500 font-medium">OR</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="resume-text" className="text-lg font-semibold">Paste Resume Text</Label>
                  <textarea
                    id="resume-text"
                    value={resumeText}
                    onChange={handleTextInput}
                    placeholder="Paste your complete resume content here for analysis..."
                    className="w-full h-48 p-4 border-2 border-gray-300 rounded-xl resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Analyze Button */}
              {resumeText.trim() && !showSuccess && (
                <Button 
                  onClick={analyzeResume} 
                  disabled={isAnalyzing}
                  className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 animate-fade-in hover-scale"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <Target className="h-5 w-5 mr-3" />
                      Analyze Resume
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {analysis && (
          <div className="animate-fade-in">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-8">
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
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
