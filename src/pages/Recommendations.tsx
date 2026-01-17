import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Briefcase, Filter, Lightbulb, X, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { RECOMMENDATIONS, SKILLS } from '@/data/skills';

interface Filters {
  type: 'all' | 'course' | 'project';
  difficulty: 'all' | 'beginner' | 'intermediate' | 'advanced';
  skill: string;
  searchQuery: string;
}

export default function Recommendations() {
  const { profile } = useAuth();
  const [filters, setFilters] = useState<Filters>({
    type: 'all',
    difficulty: 'all',
    skill: 'all',
    searchQuery: '',
  });

  const allSkills = Array.from(new Set(RECOMMENDATIONS.flatMap(r => r.skills)));
  
  const filtered = RECOMMENDATIONS.filter(r => {
    const typeMatch = filters.type === 'all' || r.type === filters.type;
    const difficultyMatch = filters.difficulty === 'all' || r.difficulty === filters.difficulty;
    const skillMatch = filters.skill === 'all' || r.skills.includes(filters.skill);
    const searchMatch = 
      filters.searchQuery === '' ||
      r.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      r.explanation.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    return typeMatch && difficultyMatch && skillMatch && searchMatch;
  });

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      type: 'all',
      difficulty: 'all',
      skill: 'all',
      searchQuery: '',
    });
  };

  const hasActiveFilters = filters.type !== 'all' || filters.difficulty !== 'all' || filters.skill !== 'all' || filters.searchQuery !== '';

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Recommendations</h1>
            <p className="text-muted-foreground mt-1">
              Personalized courses and projects for your career
              {filtered.length > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
                </span>
              )}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search recommendations..."
          value={filters.searchQuery}
          onChange={e => updateFilter('searchQuery', e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 p-4 rounded-xl border bg-card"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Filters</h3>
          </div>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Clear all
            </Button>
          )}
        </div>

        {/* Type Filter */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Type</label>
          <div className="flex flex-wrap gap-2">
            {(['all', 'course', 'project'] as const).map(type => (
              <Button 
                key={type} 
                variant={filters.type === type ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => updateFilter('type', type)} 
                className="capitalize"
              >
                {type === 'all' ? 'All' : type === 'course' ? '📚 Courses' : '🛠️ Projects'}
              </Button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Difficulty</label>
          <div className="flex flex-wrap gap-2">
            {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(difficulty => (
              <Button 
                key={difficulty} 
                variant={filters.difficulty === difficulty ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => updateFilter('difficulty', difficulty)} 
                className="capitalize"
              >
                {difficulty === 'all' ? 'All Levels' : difficulty}
              </Button>
            ))}
          </div>
        </div>

        {/* Skill Filter */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Skill</label>
          <select
            value={filters.skill}
            onChange={e => updateFilter('skill', e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Skills</option>
            {allSkills.map(skillId => {
              const skill = SKILLS.find(s => s.id === skillId);
              return (
                <option key={skillId} value={skillId}>
                  {skill ? skill.name : skillId}
                </option>
              );
            })}
          </select>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((rec, i) => (
          <motion.div key={rec.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="border shadow-card hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {rec.type === 'course' ? <BookOpen className="w-5 h-5 text-primary" /> : <Briefcase className="w-5 h-5 text-accent" />}
                  <span className="text-xs uppercase font-semibold text-muted-foreground">{rec.type}</span>
                  <span className={`ml-auto text-xs px-2 py-1 rounded-full capitalize ${rec.difficulty === 'beginner' ? 'bg-healthcare-green/20 text-healthcare-green' : rec.difficulty === 'intermediate' ? 'bg-healthcare-blue/20 text-healthcare-blue' : 'bg-primary/20 text-primary'}`}>
                    {rec.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">{rec.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                <div className="p-3 rounded-lg bg-secondary/50 mb-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-primary mt-0.5" />
                    <p className="text-sm text-secondary-foreground">{rec.explanation}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>⏱️ {rec.duration}</span>
                  {rec.provider && <span>{rec.provider}</span>}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
