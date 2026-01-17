import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Plus, Edit2, Trash2, Check, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { SKILLS, SKILL_CATEGORIES } from '@/data/skills';
import { UserSkill, Skill } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Skills() {
  const { profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<UserSkill | null>(null);

  const userSkills = profile?.skills || [];

  const filteredSkills = userSkills.filter(s =>
    s.skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    SKILL_CATEGORIES[s.skill.category].name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableSkills = SKILLS.filter(
    skill => !userSkills.find(us => us.skillId === skill.id)
  );

  const addSkill = (skill: Skill, proficiency: 'beginner' | 'intermediate' | 'advanced') => {
    const newSkill: UserSkill = { skillId: skill.id, skill, proficiency };
    updateProfile({ skills: [...userSkills, newSkill] });
    setIsAddDialogOpen(false);
    toast({ title: 'Skill added!', description: `${skill.name} has been added to your profile.` });
  };

  const updateSkillProficiency = (skillId: string, proficiency: 'beginner' | 'intermediate' | 'advanced') => {
    const updated = userSkills.map(s =>
      s.skillId === skillId ? { ...s, proficiency } : s
    );
    updateProfile({ skills: updated });
    setEditingSkill(null);
    toast({ title: 'Skill updated!' });
  };

  const deleteSkill = (skillId: string) => {
    const updated = userSkills.filter(s => s.skillId !== skillId);
    updateProfile({ skills: updated });
    toast({ title: 'Skill removed', variant: 'destructive' });
  };

  const groupedSkills = Object.entries(SKILL_CATEGORIES).map(([key, category]) => ({
    category: key,
    ...category,
    skills: filteredSkills.filter(s => s.skill.category === key),
  })).filter(g => g.skills.length > 0);

  const proficiencyColors = {
    beginner: 'bg-healthcare-blue/20 text-healthcare-blue border-healthcare-blue/30',
    intermediate: 'bg-healthcare-teal/20 text-healthcare-teal border-healthcare-teal/30',
    advanced: 'bg-healthcare-green/20 text-healthcare-green border-healthcare-green/30',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Skills</h1>
          <p className="text-muted-foreground mt-1">
            Manage your healthcare skills and proficiency levels
            {userSkills.length > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {userSkills.length} {userSkills.length === 1 ? 'skill' : 'skills'}
              </span>
            )}
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground shadow-glow hover:opacity-90 gap-2">
              <Plus className="w-4 h-4" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              {Object.entries(SKILL_CATEGORIES).map(([key, category]) => {
                const skills = availableSkills.filter(s => s.category === key);
                if (skills.length === 0) return null;

                return (
                  <div key={key}>
                    <h3 className="flex items-center gap-2 font-semibold mb-3">
                      <span>{category.icon}</span>
                      {category.name}
                    </h3>
                    <div className="grid gap-2">
                      {skills.map(skill => (
                        <div
                          key={skill.id}
                          className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-card-foreground">{skill.name}</p>
                            <p className="text-sm text-muted-foreground">{skill.description}</p>
                          </div>
                          <div className="flex gap-1">
                            {(['beginner', 'intermediate', 'advanced'] as const).map(level => (
                              <Button
                                key={level}
                                size="sm"
                                variant="outline"
                                className="capitalize text-xs"
                                onClick={() => addSkill(skill, level)}
                              >
                                {level[0].toUpperCase()}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {availableSkills.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  You've added all available skills!
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search skills..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Skills Grid */}
      {userSkills.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <Wrench className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No skills added yet</h3>
          <p className="text-muted-foreground mb-6">Start building your skill profile</p>
          <Button onClick={() => setIsAddDialogOpen(true)} className="gradient-primary text-primary-foreground">
            Add Your First Skill
          </Button>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {groupedSkills.map(group => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{group.icon}</span>
                <h2 className="text-xl font-semibold text-foreground">{group.name}</h2>
                <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-sm">
                  {group.skills.length}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {group.skills.map(userSkill => (
                    <motion.div
                      key={userSkill.skillId}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <Card className="border shadow-card hover:shadow-lg transition-shadow">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-semibold text-card-foreground">{userSkill.skill.name}</h3>
                            <div className="flex gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="w-8 h-8"
                                onClick={() => setEditingSkill(userSkill)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="w-8 h-8 text-destructive hover:text-destructive"
                                onClick={() => deleteSkill(userSkill.skillId)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4">
                            {userSkill.skill.description}
                          </p>

                          {editingSkill?.skillId === userSkill.skillId ? (
                            <div className="space-y-2">
                              <p className="text-xs text-muted-foreground font-medium">Update proficiency level:</p>
                              <div className="flex items-center gap-2 flex-wrap">
                                {(['beginner', 'intermediate', 'advanced'] as const).map(level => (
                                  <button
                                    key={level}
                                    onClick={() => updateSkillProficiency(userSkill.skillId, level)}
                                    className={`px-3 py-1.5 text-xs rounded-full capitalize border transition-all font-medium ${
                                      level === userSkill.proficiency
                                        ? proficiencyColors[level] + ' ring-2 ring-primary'
                                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:border-primary/50'
                                    }`}
                                  >
                                    {level}
                                  </button>
                                ))}
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="w-full mt-2"
                                onClick={() => setEditingSkill(null)}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground font-medium">Proficiency:</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 text-xs"
                                  onClick={() => setEditingSkill(userSkill)}
                                >
                                  <Edit2 className="w-3 h-3 mr-1" />
                                  Edit
                                </Button>
                              </div>
                              <button
                                onClick={() => setEditingSkill(userSkill)}
                                className={`w-full text-left inline-block px-3 py-1.5 text-xs rounded-full capitalize border transition-all hover:opacity-80 ${proficiencyColors[userSkill.proficiency]}`}
                              >
                                {userSkill.proficiency}
                              </button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
