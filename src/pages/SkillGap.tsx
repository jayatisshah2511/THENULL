import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, AlertTriangle, CheckCircle, Target, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { SKILLS, SKILL_CATEGORIES, CAREER_GOALS } from '@/data/skills';
import { Link } from 'react-router-dom';

// Define required skills for each career goal
const CAREER_REQUIREMENTS: Record<string, string[]> = {
  'health-data-analyst': ['sql', 'python', 'tableau', 'biostatistics', 'hipaa'],
  'clinical-informatics': ['ehr', 'clinical-workflows', 'hl7-fhir', 'hipaa', 'cdss'],
  'medical-data-scientist': ['python', 'ml-healthcare', 'biostatistics', 'predictive-analytics', 'sql'],
  'health-ai-engineer': ['ml-healthcare', 'nlp-clinical', 'computer-vision', 'python', 'ethics'],
  'health-it-consultant': ['ehr', 'health-it', 'hipaa', 'data-governance', 'clinical-workflows'],
  'bioinformatics-specialist': ['python', 'r-stats', 'biostatistics', 'ml-healthcare', 'data-governance'],
};

export default function SkillGap() {
  const { profile } = useAuth();
  const userSkillIds = profile?.skills?.map(s => s.skillId) || [];
  const careerGoalId = profile?.careerGoal?.id || 'health-data-analyst';
  const requiredSkills = CAREER_REQUIREMENTS[careerGoalId] || [];

  // Calculate gap analysis
  const gapAnalysis = requiredSkills.map(skillId => {
    const skill = SKILLS.find(s => s.id === skillId);
    const userSkill = profile?.skills?.find(s => s.skillId === skillId);
    
    const proficiencyLevels = { beginner: 1, intermediate: 2, advanced: 3 };
    const currentLevel = userSkill ? proficiencyLevels[userSkill.proficiency] : 0;
    const requiredLevel = 2; // Intermediate is minimum required
    
    return {
      skill,
      hasSkill: !!userSkill,
      currentLevel,
      requiredLevel,
      gap: Math.max(0, requiredLevel - currentLevel),
      priority: currentLevel === 0 ? 'critical' : currentLevel < requiredLevel ? 'high' : 'low',
      userProficiency: userSkill?.proficiency,
    };
  });

  const criticalGaps = gapAnalysis.filter(g => g.priority === 'critical');
  const highGaps = gapAnalysis.filter(g => g.priority === 'high');
  const metRequirements = gapAnalysis.filter(g => g.priority === 'low');

  const coveragePercent = Math.round((metRequirements.length / requiredSkills.length) * 100);

  // Category-wise progress
  const categoryProgress = Object.entries(SKILL_CATEGORIES).map(([key, category]) => {
    const categorySkills = SKILLS.filter(s => s.category === key);
    const userCategorySkills = profile?.skills?.filter(s => s.skill.category === key) || [];
    const progress = categorySkills.length > 0 
      ? Math.round((userCategorySkills.length / categorySkills.length) * 100)
      : 0;
    
    return {
      id: key,
      ...category,
      total: categorySkills.length,
      acquired: userCategorySkills.length,
      progress,
    };
  });

  const priorityColors = {
    critical: 'border-destructive bg-destructive/10 text-destructive',
    high: 'border-yellow-500 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    low: 'border-healthcare-green bg-healthcare-green/10 text-healthcare-green',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Skill Gap Analysis</h1>
        <p className="text-muted-foreground mt-1">
          Identify gaps between your skills and career requirements
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-primary" />
                <span className="text-3xl font-bold text-foreground">{coveragePercent}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Skill Coverage</p>
              <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full gradient-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${coveragePercent}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border shadow-card border-destructive/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <AlertTriangle className="w-8 h-8 text-destructive" />
                <span className="text-3xl font-bold text-destructive">{criticalGaps.length}</span>
              </div>
              <p className="text-sm text-muted-foreground">Critical Gaps</p>
              <p className="text-xs text-muted-foreground mt-1">Missing required skills</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border shadow-card border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingDown className="w-8 h-8 text-yellow-500" />
                <span className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{highGaps.length}</span>
              </div>
              <p className="text-sm text-muted-foreground">Underdeveloped</p>
              <p className="text-xs text-muted-foreground mt-1">Need improvement</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border shadow-card border-healthcare-green/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-8 h-8 text-healthcare-green" />
                <span className="text-3xl font-bold text-healthcare-green">{metRequirements.length}</span>
              </div>
              <p className="text-sm text-muted-foreground">Job Ready</p>
              <p className="text-xs text-muted-foreground mt-1">Meeting requirements</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Career Goal Context */}
      {profile?.careerGoal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border shadow-card gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{profile.careerGoal.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">
                    Analyzing for: {profile.careerGoal.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {requiredSkills.length} core skills required for this role
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Gap Details */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skills Gap List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border shadow-card h-full">
            <CardHeader>
              <CardTitle>Required Skills Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {gapAnalysis.map((item, index) => (
                <motion.div
                  key={item.skill?.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className={`p-4 rounded-xl border ${priorityColors[item.priority as keyof typeof priorityColors]}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{item.skill?.name}</h4>
                      <p className="text-sm opacity-80">
                        {item.hasSkill
                          ? `Current: ${item.userProficiency}`
                          : 'Not acquired yet'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs uppercase font-semibold">
                        {item.priority === 'critical' ? '⚠️ Critical' : 
                         item.priority === 'high' ? '📈 Improve' : '✅ Ready'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border shadow-card h-full">
            <CardHeader>
              <CardTitle>Category-wise Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {categoryProgress.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span className="font-medium text-foreground">{category.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {category.acquired}/{category.total}
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full gradient-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${category.progress}%` }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {category.progress}% complete
                  </p>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex justify-center"
      >
        <Link to="/recommendations">
          <Button className="gradient-primary text-primary-foreground shadow-glow hover:opacity-90 gap-2 px-8">
            Get Personalized Recommendations
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
