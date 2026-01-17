import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  BarChart3, 
  Brain, 
  ChevronRight, 
  GraduationCap, 
  Shield, 
  Target, 
  TrendingUp,
  Sparkles,
  Users,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const features = [
  {
    icon: BarChart3,
    title: 'Skills Tracking',
    description: 'Track your healthcare skills across 5 key categories with proficiency levels',
    color: 'healthcare-teal',
  },
  {
    icon: TrendingUp,
    title: 'Dashboard Analytics',
    description: 'Visualize your career readiness with interactive charts and insights',
    color: 'healthcare-green',
  },
  {
    icon: Target,
    title: 'Skill Gap Analysis',
    description: 'Identify critical gaps between your current skills and career requirements',
    color: 'healthcare-blue',
  },
  {
    icon: Brain,
    title: 'AI Recommendations',
    description: 'Get personalized course and project recommendations with explanations',
    color: 'healthcare-cyan',
  },
  {
    icon: GraduationCap,
    title: 'Skill Assessment',
    description: 'Take quizzes to validate your knowledge and discover hidden strengths',
    color: 'healthcare-teal',
  },
];

const stats = [
  { value: '500+', label: 'Healthcare Professionals' },
  { value: '22', label: 'Skills Tracked' },
  { value: '95%', label: 'Career Match Rate' },
  { value: '6', label: 'Career Paths' },
];

export default function Landing() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Health Skill</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </Button>
            <Link to="/auth">
              <Button variant="outline" className="hidden sm:flex">
                Login
              </Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button className="gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
                Sign Up
                <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-healthcare-teal/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-healthcare-green/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-healthcare-blue/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Healthcare Career Intelligence Platform
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Master Your</span>
              <br />
              <span className="text-gradient">Healthcare Skills</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Track your skills, analyze gaps, and get personalized recommendations 
              to accelerate your healthcare technology career.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth?mode=signup">
                <Button size="lg" className="gradient-primary text-primary-foreground shadow-glow hover:opacity-90 text-lg px-8 py-6">
                  Get Started Free
                  <Zap className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  View Demo
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card shadow-card border"
              >
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              Everything You Need to
              <span className="text-gradient"> Excel</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed specifically for healthcare professionals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group p-6 rounded-2xl bg-card border shadow-card hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow`}>
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl gradient-hero p-10 sm:p-16 text-center"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0zMCAyNGgydi00aC0ydjR6bTAgNmgydi00aC0ydjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Career?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Join healthcare professionals who are leveraging skill intelligence 
                to advance their careers.
              </p>
              <Link to="/auth?mode=signup">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
                >
                  Start Your Journey
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Health Skill</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Health Skill. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
