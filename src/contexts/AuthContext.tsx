import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserProfile } from '@/types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isProfileComplete: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeProfileStep: (step: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'demo@healthskill.com',
    name: 'Demo User',
    role: 'user',
    profileCompleted: false,
    createdAt: new Date(),
    lastLogin: new Date(),
  },
  {
    id: 'admin',
    email: 'admin@healthskill.com',
    name: 'Admin User',
    role: 'admin',
    profileCompleted: true,
    createdAt: new Date(),
    lastLogin: new Date(),
  },
];

const INITIAL_PROFILE: UserProfile = {
  userId: '',
  education: [],
  careerGoal: null,
  skills: [],
  experiences: [],
  certifications: [],
  interests: [],
  completedSteps: [],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('healthskill_user');
    const storedProfile = localStorage.getItem('healthskill_profile');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = DEMO_USERS.find(u => u.email === email);
    
    if (foundUser && password.length >= 6) {
      const updatedUser = { ...foundUser, lastLogin: new Date() };
      setUser(updatedUser);
      
      const storedProfile = localStorage.getItem(`healthskill_profile_${foundUser.id}`);
      const userProfile = storedProfile 
        ? JSON.parse(storedProfile) 
        : { ...INITIAL_PROFILE, userId: foundUser.id };
      
      setProfile(userProfile);
      localStorage.setItem('healthskill_user', JSON.stringify(updatedUser));
      localStorage.setItem('healthskill_profile', JSON.stringify(userProfile));
      
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (DEMO_USERS.find(u => u.email === email)) {
      setIsLoading(false);
      return { success: false, error: 'User already exists with this email' };
    }
    
    if (password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Password must be at least 6 characters' };
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user',
      profileCompleted: false,
      createdAt: new Date(),
      lastLogin: new Date(),
    };
    
    const newProfile: UserProfile = { ...INITIAL_PROFILE, userId: newUser.id };
    
    DEMO_USERS.push(newUser);
    setUser(newUser);
    setProfile(newProfile);
    
    localStorage.setItem('healthskill_user', JSON.stringify(newUser));
    localStorage.setItem('healthskill_profile', JSON.stringify(newProfile));
    localStorage.setItem(`healthskill_profile_${newUser.id}`, JSON.stringify(newProfile));
    
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('healthskill_user');
    localStorage.removeItem('healthskill_profile');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!profile) return;
    
    const updatedProfile = { ...profile, ...updates };
    setProfile(updatedProfile);
    localStorage.setItem('healthskill_profile', JSON.stringify(updatedProfile));
    localStorage.setItem(`healthskill_profile_${profile.userId}`, JSON.stringify(updatedProfile));
  };

  const completeProfileStep = (step: number) => {
    if (!profile) return;
    
    const completedSteps = [...new Set([...profile.completedSteps, step])];
    const isComplete = completedSteps.length >= 6;
    
    const updatedProfile = { ...profile, completedSteps };
    setProfile(updatedProfile);
    
    if (user && isComplete) {
      const updatedUser = { ...user, profileCompleted: true };
      setUser(updatedUser);
      localStorage.setItem('healthskill_user', JSON.stringify(updatedUser));
    }
    
    localStorage.setItem('healthskill_profile', JSON.stringify(updatedProfile));
    localStorage.setItem(`healthskill_profile_${profile.userId}`, JSON.stringify(updatedProfile));
  };

  const isProfileComplete = user?.profileCompleted === true || profile?.completedSteps?.length === 6;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isAuthenticated: !!user,
        isProfileComplete,
        login,
        signup,
        logout,
        updateProfile,
        completeProfileStep,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
