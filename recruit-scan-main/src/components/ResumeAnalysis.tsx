import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  FileText, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Award,
  Eye,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

interface ResumeFile {
  id: string;
  file: File;
  name: string;
  size: number;
  uploadDate: Date;
}

interface JobDescription {
  title: string;
  description: string;
  keywords: string[];
  requirements: string[];
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

interface ResumeAnalysisProps {
  resumes: ResumeFile[];
  jobDescription: JobDescription;
  onAnalysisComplete: (results: AnalysisResult[]) => void;
}

export const ResumeAnalysis = ({ 
  resumes, 
  jobDescription, 
  onAnalysisComplete 
}: ResumeAnalysisProps) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [currentAnalyzing, setCurrentAnalyzing] = useState<string>("");

  // Simulate AI analysis with realistic processing
  const analyzeResume = async (resume: ResumeFile): Promise<AnalysisResult> => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

    // Mock analysis results based on filename and job requirements
    const fileName = resume.name.toLowerCase();
    const mockSkills = [
      'javascript', 'typescript', 'react', 'node.js', 'python', 
      'aws', 'docker', 'sql', 'git', 'agile'
    ];

    const matchedKeywords = jobDescription.keywords.filter(keyword => {
      // Simple mock logic - some keywords will "match"
      const keywordLower = keyword.toLowerCase();
      return fileName.includes(keywordLower) || Math.random() > 0.4;
    });

    const missingKeywords = jobDescription.keywords.filter(
      keyword => !matchedKeywords.includes(keyword)
    );

    const score = Math.min(95, Math.max(25, 
      (matchedKeywords.length / jobDescription.keywords.length) * 100 + 
      Math.random() * 20 - 10
    ));

    const recommendation: 'strong' | 'moderate' | 'weak' = 
      score >= 75 ? 'strong' : score >= 50 ? 'moderate' : 'weak';

    const strengths = [
      "Strong technical background",
      "Relevant industry experience", 
      "Good communication skills",
      "Team leadership experience"
    ].slice(0, Math.floor(Math.random() * 3) + 1);

    const weaknesses = [
      "Limited experience with some required technologies",
      "Could benefit from more cloud experience",
      "Needs stronger project management background"
    ].slice(0, Math.floor(Math.random() * 2) + 1);

    return {
      resumeId: resume.id,
      score: Math.round(score),
      matchedKeywords,
      missingKeywords,
      strengths,
      weaknesses,
      experience: `${Math.floor(Math.random() * 8) + 2} years`,
      skills: mockSkills.slice(0, Math.floor(Math.random() * 6) + 3),
      recommendation
    };
  };

  const startAnalysis = async () => {
    if (resumes.length === 0 || !jobDescription.title) return;

    setAnalyzing(true);
    setProgress(0);
    setResults([]);

    const analysisResults: AnalysisResult[] = [];
    
    for (let i = 0; i < resumes.length; i++) {
      const resume = resumes[i];
      setCurrentAnalyzing(resume.name);
      
      const result = await analyzeResume(resume);
      analysisResults.push(result);
      
      setProgress(((i + 1) / resumes.length) * 100);
    }

    // Sort by score descending
    analysisResults.sort((a, b) => b.score - a.score);
    
    setResults(analysisResults);
    setAnalyzing(false);
    setCurrentAnalyzing("");
    onAnalysisComplete(analysisResults);
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'strong': return 'text-success';
      case 'moderate': return 'text-warning';
      case 'weak': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'strong': return <ThumbsUp className="h-4 w-4" />;
      case 'moderate': return <Eye className="h-4 w-4" />;
      case 'weak': return <ThumbsDown className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Resume Analysis
          </CardTitle>
          <CardDescription>
            Analyzing {resumes.length} resume(s) against "{jobDescription.title}"
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!analyzing && results.length === 0 ? (
            <Button 
              onClick={startAnalysis} 
              variant="hero" 
              className="w-full"
              disabled={resumes.length === 0 || !jobDescription.title}
            >
              <Brain className="h-4 w-4 mr-2" />
              Start Analysis
            </Button>
          ) : analyzing ? (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Analyzing: {currentAnalyzing}
                </p>
                <Progress value={progress} className="w-full" />
                <p className="text-xs text-muted-foreground mt-2">
                  {Math.round(progress)}% Complete
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Analysis Complete</h3>
                <Button onClick={startAnalysis} variant="outline" size="sm">
                  Re-analyze
                </Button>
              </div>
              <div className="grid gap-4">
                {results.map((result, index) => {
                  const resume = resumes.find(r => r.id === result.resumeId);
                  return (
                    <Card key={result.resumeId} className="card-hover">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Award className={`h-5 w-5 ${index < 3 ? 'text-primary' : 'text-muted-foreground'}`} />
                              <span className="text-sm font-medium">#{index + 1}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold">{resume?.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Experience: {result.experience}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-2xl font-bold">{result.score}%</span>
                              <div className={getRecommendationColor(result.recommendation)}>
                                {getRecommendationIcon(result.recommendation)}
                              </div>
                            </div>
                            <Badge 
                              variant={result.recommendation === 'strong' ? 'default' : 'secondary'}
                              className={result.recommendation === 'strong' ? 'bg-success' : ''}
                            >
                              {result.recommendation.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={result.score} className="w-full" />
                      </CardHeader>
                      <CardContent className="pt-0 space-y-4">
                        <div>
                          <h5 className="font-medium mb-2 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Matched Keywords ({result.matchedKeywords.length})
                          </h5>
                          <div className="flex flex-wrap gap-1">
                            {result.matchedKeywords.map((keyword) => (
                              <Badge key={keyword} variant="default" className="bg-success/10 text-success border-success/20">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {result.missingKeywords.length > 0 && (
                          <div>
                            <h5 className="font-medium mb-2 flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-warning" />
                              Missing Keywords ({result.missingKeywords.length})
                            </h5>
                            <div className="flex flex-wrap gap-1">
                              {result.missingKeywords.map((keyword) => (
                                <Badge key={keyword} variant="outline" className="text-warning border-warning/50">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium mb-2 flex items-center gap-2 text-success">
                              <TrendingUp className="h-4 w-4" />
                              Strengths
                            </h5>
                            <ul className="text-sm space-y-1">
                              {result.strengths.map((strength, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2 flex items-center gap-2 text-warning">
                              <AlertCircle className="h-4 w-4" />
                              Areas for Growth
                            </h5>
                            <ul className="text-sm space-y-1">
                              {result.weaknesses.map((weakness, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <AlertCircle className="h-3 w-3 text-warning mt-0.5 flex-shrink-0" />
                                  {weakness}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};