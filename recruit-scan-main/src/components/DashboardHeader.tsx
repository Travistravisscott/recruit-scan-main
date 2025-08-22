import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Target, TrendingUp } from "lucide-react";

interface DashboardStats {
  totalResumes: number;
  analyzedResumes: number;
  strongCandidates: number;
  averageScore: number;
}

interface DashboardHeaderProps {
  stats: DashboardStats;
  jobTitle?: string;
}

export const DashboardHeader = ({ stats, jobTitle }: DashboardHeaderProps) => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-primary p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            AI Resume Screening System
          </h1>
          <p className="text-lg opacity-90 mb-4">
            Intelligent candidate matching powered by advanced NLP
          </p>
          {jobTitle && (
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Current Position: {jobTitle}
            </Badge>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/5" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Resumes</p>
                <p className="text-2xl font-bold">{stats.totalResumes}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Analyzed</p>
                <p className="text-2xl font-bold">{stats.analyzedResumes}</p>
              </div>
              <Target className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Strong Matches</p>
                <p className="text-2xl font-bold">{stats.strongCandidates}</p>
              </div>
              <Users className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Score</p>
                <p className="text-2xl font-bold">{stats.averageScore}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};