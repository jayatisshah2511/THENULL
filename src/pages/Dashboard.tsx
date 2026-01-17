import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  Award,
  Target,
  Wrench,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { SKILL_CATEGORIES, SKILLS } from '@/data/skills';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

const CHART_COLORS = ['#0D9488', '#10B981', '#0EA5E9', '#06B6D4', '#14B8A6'];

export default function Dashboard() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  // Calculate stats
  const totalSkills = profile?.skills?.length || 0;
  const advancedSkills = profile?.skills?.filter(s => s.proficiency === 'advanced')?.length || 0;
  const projectCount = profile?.experiences?.length || 0;
  const certCount = profile?.certifications?.length || 0;

  // Prepare radar chart data
  const radarData = Object.entries(SKILL_CATEGORIES).map(([key, category]) => {
    const categorySkills = profile?.skills?.filter(s => s.skill.category === key) || [];
    const maxSkills = SKILLS.filter(s => s.category === key).length;
    const score = maxSkills > 0 ? (categorySkills.length / maxSkills) * 100 : 0;
    
    return {
      category: category.name.split(' ')[0],
      value: Math.round(score),
      fullMark: 100,
    };
  });

  // Prepare bar chart data
  const proficiencyData = [
    { name: 'Beginner', count: profile?.skills?.filter(s => s.proficiency === 'beginner')?.length || 0 },
    { name: 'Intermediate', count: profile?.skills?.filter(s => s.proficiency === 'intermediate')?.length || 0 },
    { name: 'Advanced', count: profile?.skills?.filter(s => s.proficiency === 'advanced')?.length || 0 },
  ];

  // Career readiness calculation
  const careerReadiness = totalSkills > 0 ? Math.min(Math.round((totalSkills / 10) * 100), 100) : 0;

  // Identify strengths and improvement areas
  const strengths = profile?.skills
    ?.filter(s => s.proficiency === 'advanced')
    ?.slice(0, 3)
    ?.map(s => s.skill.name) || [];
    
  const improvements = profile?.skills
    ?.filter(s => s.proficiency === 'beginner')
    ?.slice(0, 3)
    ?.map(s => s.skill.name) || [];

  const stats = [
    { label: 'Total Skills', value: totalSkills, icon: Wrench, color: 'healthcare-teal' },
    { label: 'Advanced Skills', value: advancedSkills, icon: TrendingUp, color: 'healthcare-green' },
    { label: 'Projects', value: projectCount, icon: BarChart3, color: 'healthcare-blue' },
    { label: 'Certifications', value: certCount, icon: Award, color: 'healthcare-cyan' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's your healthcare skill intelligence overview
          </p>
        </div>
        <Button
          onClick={() => navigate('/quiz')}
          className="gradient-primary text-primary-foreground shadow-glow hover:opacity-90 gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Take Skill Test
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border shadow-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skill Distribution Radar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border shadow-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-primary-foreground" />
                </div>
                Skill Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="category" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <Radar
                      name="Skills"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Career Readiness */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border shadow-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Target className="w-4 h-4 text-primary-foreground" />
                </div>
                Career Readiness
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pt-4">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="12"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: '0 553' }}
                    animate={{ strokeDasharray: `${(careerReadiness / 100) * 553} 553` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-foreground">{careerReadiness}%</span>
                  <span className="text-sm text-muted-foreground">Ready</span>
                </div>
              </div>

              {profile?.careerGoal && (
                <div className="mt-6 p-4 rounded-xl bg-secondary/50 w-full">
                  <p className="text-sm text-muted-foreground text-center">Career Goal</p>
                  <p className="text-lg font-semibold text-center text-foreground">
                    {profile.careerGoal.icon} {profile.careerGoal.title}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Proficiency Levels & Insights */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Proficiency Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-1"
        >
          <Card className="border shadow-card h-full">
            <CardHeader>
              <CardTitle>Proficiency Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={proficiencyData} layout="vertical">
                    <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis dataKey="name" type="category" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} width={80} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                      {proficiencyData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border shadow-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-healthcare-green">
                <TrendingUp className="w-5 h-5" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              {strengths.length > 0 ? (
                <ul className="space-y-3">
                  {strengths.map((skill, index) => (
                    <li key={index} className="flex items-center gap-3 p-3 rounded-lg bg-healthcare-green/10">
                      <div className="w-2 h-2 rounded-full bg-healthcare-green" />
                      <span className="text-foreground">{skill}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Add advanced skills to see your strengths
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Areas to Improve */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="border shadow-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-healthcare-blue">
                <BookOpen className="w-5 h-5" />
                Areas to Improve
              </CardTitle>
            </CardHeader>
            <CardContent>
              {improvements.length > 0 ? (
                <ul className="space-y-3">
                  {improvements.map((skill, index) => (
                    <li key={index} className="flex items-center gap-3 p-3 rounded-lg bg-healthcare-blue/10">
                      <div className="w-2 h-2 rounded-full bg-healthcare-blue" />
                      <span className="text-foreground">{skill}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Great job! No beginner-level skills
                </p>
              )}
              <Link to="/recommendations">
                <Button variant="ghost" className="w-full mt-4 gap-2">
                  View Recommendations
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
