export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  profileCompleted: boolean;
  createdAt: Date;
  lastLogin: Date;
}

export interface UserProfile {
  userId: string;
  education: Education[];
  careerGoal: CareerGoal | null;
  skills: UserSkill[];
  experiences: Experience[];
  certifications: Certification[];
  interests: string[];
  completedSteps: number[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  field: string;
}

export interface CareerGoal {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
}

export interface UserSkill {
  skillId: string;
  skill: Skill;
  proficiency: 'beginner' | 'intermediate' | 'advanced';
}

export type SkillCategory = 
  | 'health-data-analytics'
  | 'health-informatics'
  | 'data-standards'
  | 'privacy-security'
  | 'ai-digital-health';

export interface Experience {
  id: string;
  title: string;
  organization: string;
  duration: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
}

export interface SkillGap {
  skillId: string;
  skill: Skill;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface Recommendation {
  id: string;
  type: 'course' | 'project';
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  duration: string;
  provider?: string;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  skillCategory: SkillCategory;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizResult {
  userId: string;
  score: number;
  totalQuestions: number;
  strengths: string[];
  weaknesses: string[];
  skillsDetected: UserSkill[];
  completedAt: Date;
}
