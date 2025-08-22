import { useState, useMemo } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ResumeUpload } from "@/components/ResumeUpload";
import { JobDescriptionInput, JobDescription } from "@/components/JobDescriptionInput";
import { ResumeAnalysis } from "@/components/ResumeAnalysis";
import heroImage from "@/assets/hero-image.jpg";

interface ResumeFile {
  id: string;
  file: File;
  name: string;
  size: number;
  uploadDate: Date;
}

interface AnalysisResult {
  resumeId: string;
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  weaknesses: string[];
  experience: string;
  skills: string[];
  recommendation: 'strong' | 'moderate' | 'weak';
}

const Index = () => {
  const [resumes, setResumes] = useState<ResumeFile[]>([]);
  const [jobDescription, setJobDescription] = useState<JobDescription>({
    title: "",
    description: "",
    keywords: [],
    requirements: []
  });
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);

  // Calculate dashboard statistics
  const dashboardStats = useMemo(() => {
    const strongCandidates = analysisResults.filter(r => r.recommendation === 'strong').length;
    const averageScore = analysisResults.length > 0 
      ? Math.round(analysisResults.reduce((sum, r) => sum + r.score, 0) / analysisResults.length)
      : 0;

    return {
      totalResumes: resumes.length,
      analyzedResumes: analysisResults.length,
      strongCandidates,
      averageScore
    };
  }, [resumes, analysisResults]);

  const handleJobDescriptionSubmit = (jobDesc: JobDescription) => {
    setJobDescription(jobDesc);
  };

  const handleFilesUploaded = (files: ResumeFile[]) => {
    setResumes(files);
  };

  const handleAnalysisComplete = (results: AnalysisResult[]) => {
    setAnalysisResults(results);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Background Image */}
      <div 
        className="fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Dashboard Header */}
          <div className="animate-fade-in">
            <DashboardHeader 
              stats={dashboardStats}
              jobTitle={jobDescription.title || undefined}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6 animate-slide-up">
              <JobDescriptionInput 
                onJobDescriptionSubmit={handleJobDescriptionSubmit}
                currentJob={jobDescription.title ? jobDescription : undefined}
              />
              
              <ResumeUpload onFilesUploaded={handleFilesUploaded} />
            </div>

            {/* Right Column */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <ResumeAnalysis 
                resumes={resumes}
                jobDescription={jobDescription}
                onAnalysisComplete={handleAnalysisComplete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
