import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Plus, X } from "lucide-react";

export interface JobDescription {
  title: string;
  description: string;
  keywords: string[];
  requirements: string[];
}

interface JobDescriptionInputProps {
  onJobDescriptionSubmit: (jobDesc: JobDescription) => void;
  currentJob?: JobDescription;
}

export const JobDescriptionInput = ({ 
  onJobDescriptionSubmit, 
  currentJob 
}: JobDescriptionInputProps) => {
  const [title, setTitle] = useState(currentJob?.title || "");
  const [description, setDescription] = useState(currentJob?.description || "");
  const [keywords, setKeywords] = useState<string[]>(currentJob?.keywords || []);
  const [requirements, setRequirements] = useState<string[]>(currentJob?.requirements || []);
  const [newKeyword, setNewKeyword] = useState("");
  const [newRequirement, setNewRequirement] = useState("");

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const addRequirement = () => {
    if (newRequirement.trim() && !requirements.includes(newRequirement.trim())) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const removeRequirement = (requirement: string) => {
    setRequirements(requirements.filter(r => r !== requirement));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const jobDesc: JobDescription = {
      title: title.trim(),
      description: description.trim(),
      keywords,
      requirements,
    };

    onJobDescriptionSubmit(jobDesc);
  };

  const extractKeywordsFromText = () => {
    // Simple keyword extraction from job description
    const text = description.toLowerCase();
    const commonSkills = [
      'javascript', 'typescript', 'react', 'node.js', 'python', 'java', 'aws', 
      'docker', 'kubernetes', 'git', 'sql', 'nosql', 'mongodb', 'postgresql',
      'api', 'rest', 'graphql', 'microservices', 'agile', 'scrum', 'devops'
    ];

    const foundKeywords = commonSkills.filter(skill => 
      text.includes(skill) && !keywords.includes(skill)
    );

    if (foundKeywords.length > 0) {
      setKeywords([...keywords, ...foundKeywords]);
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Job Description
        </CardTitle>
        <CardDescription>
          Define the position requirements to match against resumes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="job-title">Position Title</Label>
            <Input
              id="job-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Senior Software Engineer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea
              id="job-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              className="min-h-32"
              required
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={extractKeywordsFromText}
              className="w-fit"
            >
              Auto-extract keywords
            </Button>
          </div>

          <div className="space-y-3">
            <Label>Key Skills & Technologies</Label>
            <div className="flex gap-2">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Add keyword (e.g., React, Python)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
              />
              <Button type="button" variant="outline" size="icon" onClick={addKeyword}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="gap-2">
                  {keyword}
                  <button
                    type="button"
                    onClick={() => removeKeyword(keyword)}
                    className="hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Requirements</Label>
            <div className="flex gap-2">
              <Input
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                placeholder="Add requirement (e.g., 5+ years experience)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
              />
              <Button type="button" variant="outline" size="icon" onClick={addRequirement}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {requirements.map((requirement) => (
                <div key={requirement} className="flex items-center justify-between p-2 border border-border rounded bg-muted/30">
                  <span className="text-sm">{requirement}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRequirement(requirement)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" variant="hero" className="w-full">
            Save Job Description
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};