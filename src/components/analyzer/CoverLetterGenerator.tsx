import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateCoverLetter } from '@/utils/resumeAnalyzer';
import { FileEdit, Loader2, Copy, Check } from 'lucide-react';

interface CoverLetterGeneratorProps {
  resumeText: string;
}

const CoverLetterGenerator: React.FC<CoverLetterGeneratorProps> = ({ resumeText }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Job Description Missing",
        description: "Please paste a job description to generate a tailored cover letter.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateCoverLetter(resumeText, jobDescription);
      setCoverLetter(result);
      toast({
        title: "Success!",
        description: "Your personalized cover letter has been generated."
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate cover letter. Please check your API key.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Cover letter copied to clipboard."
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <FileEdit className="h-6 w-6 text-indigo-500" />
            AI Cover Letter Generator
          </CardTitle>
          <CardDescription>
            Paste the job description below. The AI will analyze your resume and instantly draft a tailored cover letter specifically for this role.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Textarea 
              placeholder="Paste the target job description here..." 
              className="min-h-[150px] resize-y"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !resumeText}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Drafting your Cover Letter...
              </>
            ) : (
              <>
                <FileEdit className="mr-2 h-4 w-4" />
                Generate Cover Letter
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {coverLetter && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Your Tailored Cover Letter</CardTitle>
            <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8">
              {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-gray-50 rounded-md border border-gray-100 whitespace-pre-wrap text-gray-800 font-serif leading-relaxed">
              {coverLetter}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CoverLetterGenerator;
