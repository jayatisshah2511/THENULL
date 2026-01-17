import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  GraduationCap, 
  Target, 
  Wrench, 
  Briefcase, 
  Award, 
  Heart,
  ChevronRight,
  ChevronLeft,
  Check,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CAREER_GOALS, SKILLS, SKILL_CATEGORIES, INTERESTS } from '@/data/skills';
import { Education, Experience, Certification, UserSkill, CareerGoal } from '@/types';

const STEPS = [
  { id: 1, name: 'Education', icon: GraduationCap },
  { id: 2, name: 'Career Goal', icon: Target },
  { id: 3, name: 'Skills', icon: Wrench },
  { id: 4, name: 'Experience', icon: Briefcase },
  { id: 5, name: 'Certifications', icon: Award },
  { id: 6, name: 'Interests', icon: Heart },
];

export default function ProfileSetup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [education, setEducation] = useState<Education[]>([]);
  const [careerGoal, setCareerGoal] = useState<CareerGoal | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<UserSkill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  const { updateProfile, completeProfileStep, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = () => {
    // Validate current step
    if (currentStep === 1 && education.length === 0) {
      toast({ title: 'Please add at least one education entry', variant: 'destructive' });
      return;
    }
    if (currentStep === 2 && !careerGoal) {
      toast({ title: 'Please select a career goal', variant: 'destructive' });
      return;
    }
    if (currentStep === 3 && selectedSkills.length < 3) {
      toast({ title: 'Please select at least 3 skills', variant: 'destructive' });
      return;
    }
    if (currentStep === 6 && selectedInterests.length < 2) {
      toast({ title: 'Please select at least 2 interests', variant: 'destructive' });
      return;
    }

    // Save step data
    completeProfileStep(currentStep);
    
    if (currentStep === 6) {
      // Final step - save all and redirect
      updateProfile({
        education,
        careerGoal,
        skills: selectedSkills,
        experiences,
        certifications,
        interests: selectedInterests,
      });
      
      toast({
        title: '🎉 Profile complete!',
        description: 'Your healthcare skill intelligence is now active!',
      });
      
      navigate('/dashboard');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleSkill = (skill: typeof SKILLS[0], proficiency: 'beginner' | 'intermediate' | 'advanced' = 'intermediate') => {
    const existing = selectedSkills.find(s => s.skillId === skill.id);
    if (existing) {
      setSelectedSkills(selectedSkills.filter(s => s.skillId !== skill.id));
    } else {
      setSelectedSkills([...selectedSkills, { skillId: skill.id, skill, proficiency }]);
    }
  };

  const updateSkillProficiency = (skillId: string, proficiency: 'beginner' | 'intermediate' | 'advanced') => {
    setSelectedSkills(selectedSkills.map(s => 
      s.skillId === skillId ? { ...s, proficiency } : s
    ));
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const addEducation = () => {
    setEducation([...education, {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      year: '',
      field: '',
    }]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(e => e.id !== id));
  };

  const addExperience = () => {
    setExperiences([...experiences, {
      id: Date.now().toString(),
      title: '',
      organization: '',
      duration: '',
      description: '',
    }]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(e => e.id !== id));
  };

  const addCertification = () => {
    setCertifications([...certifications, {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      year: '',
    }]);
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setCertifications(certifications.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeCertification = (id: string) => {
    setCertifications(certifications.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Progress */}
      <div className="hidden lg:flex w-80 gradient-sidebar p-6 flex-col">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Health Skill</span>
        </div>

        <div className="flex-1">
          <h2 className="text-white/80 text-sm font-medium mb-6 uppercase tracking-wider">
            Profile Setup
          </h2>
          
          <div className="space-y-4">
            {STEPS.map((step, index) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              const isLocked = currentStep < step.id;
              
              return (
                <motion.div
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isCurrent 
                      ? 'bg-white/20' 
                      : isCompleted 
                        ? 'bg-white/10' 
                        : 'opacity-50'
                  }`}
                  whileHover={!isLocked ? { x: 5 } : {}}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-white text-primary' 
                      : isCurrent 
                        ? 'bg-white/30 text-white' 
                        : 'bg-white/10 text-white/50'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : isLocked ? (
                      <Lock className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                  <span className={`text-sm font-medium ${isCurrent ? 'text-white' : 'text-white/70'}`}>
                    {step.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-auto p-4 rounded-lg bg-white/10 backdrop-blur">
          <p className="text-sm text-white/80">
            Complete your profile to unlock personalized healthcare insights 🏥
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-12 overflow-auto">
        <div className="max-w-3xl mx-auto">
          {/* Mobile Progress */}
          <div className="lg:hidden mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Step {currentStep} of 6</span>
              <span className="text-sm font-medium text-foreground">{STEPS[currentStep - 1].name}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-primary"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Education */}
              {currentStep === 1 && (
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-foreground">Education Background</h1>
                  <p className="text-muted-foreground mb-8">Add your educational qualifications</p>

                  <div className="space-y-6">
                    {education.map((edu) => (
                      <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-xl border bg-card"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Degree</Label>
                            <Input
                              placeholder="Bachelor of Science"
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Field of Study</Label>
                            <Input
                              placeholder="Health Informatics"
                              value={edu.field}
                              onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Institution</Label>
                            <Input
                              placeholder="Stanford University"
                              value={edu.institution}
                              onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Year</Label>
                            <Input
                              placeholder="2023"
                              value={edu.year}
                              onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-4 text-destructive"
                          onClick={() => removeEducation(edu.id)}
                        >
                          Remove
                        </Button>
                      </motion.div>
                    ))}

                    <Button
                      variant="outline"
                      className="w-full h-14 border-dashed"
                      onClick={addEducation}
                    >
                      + Add Education
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Career Goal */}
              {currentStep === 2 && (
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-foreground">Choose Your Career Goal</h1>
                  <p className="text-muted-foreground mb-8">Select the healthcare role you're working towards</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CAREER_GOALS.map((goal) => (
                      <motion.div
                        key={goal.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCareerGoal(goal)}
                        className={`p-6 rounded-xl border cursor-pointer transition-all ${
                          careerGoal?.id === goal.id
                            ? 'border-primary bg-primary/5 shadow-glow'
                            : 'bg-card hover:border-primary/50'
                        }`}
                      >
                        <div className="text-4xl mb-3">{goal.icon}</div>
                        <h3 className="text-lg font-semibold mb-2 text-card-foreground">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                        {careerGoal?.id === goal.id && (
                          <div className="mt-3 flex items-center gap-2 text-primary">
                            <Check className="w-4 h-4" />
                            <span className="text-sm font-medium">Selected</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Skills */}
              {currentStep === 3 && (
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-foreground">Select Your Skills</h1>
                  <p className="text-muted-foreground mb-2">Choose at least 3 skills and set your proficiency level</p>
                  <p className="text-sm text-primary mb-8">{selectedSkills.length} skills selected</p>

                  <div className="space-y-8">
                    {Object.entries(SKILL_CATEGORIES).map(([categoryId, category]) => {
                      const categorySkills = SKILLS.filter(s => s.category === categoryId);
                      
                      return (
                        <div key={categoryId}>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">{category.icon}</span>
                            <h2 className="text-xl font-semibold text-foreground">{category.name}</h2>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {categorySkills.map((skill) => {
                              const selected = selectedSkills.find(s => s.skillId === skill.id);
                              
                              return (
                                <motion.div
                                  key={skill.id}
                                  whileHover={{ scale: 1.01 }}
                                  className={`p-4 rounded-xl border transition-all ${
                                    selected
                                      ? 'border-primary bg-primary/5'
                                      : 'bg-card hover:border-primary/50'
                                  }`}
                                >
                                  <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => toggleSkill(skill)}
                                  >
                                    <div>
                                      <h3 className="font-medium text-card-foreground">{skill.name}</h3>
                                      <p className="text-xs text-muted-foreground">{skill.description}</p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                      selected ? 'border-primary bg-primary' : 'border-muted'
                                    }`}>
                                      {selected && <Check className="w-4 h-4 text-primary-foreground" />}
                                    </div>
                                  </div>
                                  
                                  {selected && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      className="mt-3 pt-3 border-t"
                                    >
                                      <Label className="text-xs">Proficiency Level</Label>
                                      <div className="flex gap-2 mt-2">
                                        {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                                          <button
                                            key={level}
                                            onClick={() => updateSkillProficiency(skill.id, level)}
                                            className={`px-3 py-1 text-xs rounded-full capitalize transition-all ${
                                              selected.proficiency === level
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                            }`}
                                          >
                                            {level}
                                          </button>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Experience */}
              {currentStep === 4 && (
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-foreground">Work Experience</h1>
                  <p className="text-muted-foreground mb-8">Add your relevant work experience (optional)</p>

                  <div className="space-y-6">
                    {experiences.map((exp) => (
                      <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-xl border bg-card"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Job Title</Label>
                            <Input
                              placeholder="Data Analyst"
                              value={exp.title}
                              onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Organization</Label>
                            <Input
                              placeholder="Mayo Clinic"
                              value={exp.organization}
                              onChange={(e) => updateExperience(exp.id, 'organization', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Duration</Label>
                            <Input
                              placeholder="2021 - Present"
                              value={exp.duration}
                              onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Description</Label>
                            <Input
                              placeholder="Key responsibilities and achievements"
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-4 text-destructive"
                          onClick={() => removeExperience(exp.id)}
                        >
                          Remove
                        </Button>
                      </motion.div>
                    ))}

                    <Button
                      variant="outline"
                      className="w-full h-14 border-dashed"
                      onClick={addExperience}
                    >
                      + Add Experience
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 5: Certifications */}
              {currentStep === 5 && (
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-foreground">Certifications</h1>
                  <p className="text-muted-foreground mb-8">Add your professional certifications (optional)</p>

                  <div className="space-y-6">
                    {certifications.map((cert) => (
                      <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-xl border bg-card"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Certification Name</Label>
                            <Input
                              placeholder="HIPAA Compliance"
                              value={cert.name}
                              onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Issuing Organization</Label>
                            <Input
                              placeholder="AHLA"
                              value={cert.issuer}
                              onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Year</Label>
                            <Input
                              placeholder="2023"
                              value={cert.year}
                              onChange={(e) => updateCertification(cert.id, 'year', e.target.value)}
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-4 text-destructive"
                          onClick={() => removeCertification(cert.id)}
                        >
                          Remove
                        </Button>
                      </motion.div>
                    ))}

                    <Button
                      variant="outline"
                      className="w-full h-14 border-dashed"
                      onClick={addCertification}
                    >
                      + Add Certification
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 6: Interests */}
              {currentStep === 6 && (
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-foreground">Your Interests</h1>
                  <p className="text-muted-foreground mb-2">Select at least 2 areas you're passionate about</p>
                  <p className="text-sm text-primary mb-8">{selectedInterests.length} selected</p>

                  <div className="flex flex-wrap gap-3">
                    {INTERESTS.map((interest) => {
                      const isSelected = selectedInterests.includes(interest);
                      
                      return (
                        <motion.button
                          key={interest}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleInterest(interest)}
                          className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                            isSelected
                              ? 'gradient-primary text-primary-foreground shadow-glow'
                              : 'neu-flat bg-card text-card-foreground hover:shadow-lg'
                          }`}
                        >
                          {interest}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              className="gap-2 gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
            >
              {currentStep === 6 ? 'Complete Profile' : 'Continue'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
