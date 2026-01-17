import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  LayoutDashboard,
  Wrench,
  TrendingDown,
  BookOpen,
  ClipboardCheck,
  LogOut,
  Menu,
  X,
  Lock,
  ChevronLeft,
  Sun,
  Moon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/skills', label: 'My Skills', icon: Wrench },
  { path: '/skill-gap', label: 'Skill Gap', icon: TrendingDown },
  { path: '/recommendations', label: 'Recommendations', icon: BookOpen },
  { path: '/quiz', label: 'Take Quiz', icon: ClipboardCheck },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isProfileComplete } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    if (!isProfileComplete && path !== '/profile-setup') {
      e.preventDefault();
      // Trigger buzz animation
      const element = e.currentTarget;
      element.classList.add('animate-buzz');
      setTimeout(() => element.classList.remove('animate-buzz'), 500);
    }
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 glass border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Activity className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">Health Skill</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <>
            {/* Mobile overlay */}
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed lg:sticky top-0 left-0 z-50 lg:z-0 h-screen w-64 gradient-sidebar flex flex-col ${
                sidebarOpen ? 'block' : 'hidden lg:flex'
              }`}
            >
              {/* Logo */}
              <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Health Skill</span>
              </div>

              {/* User Info */}
              <div className="px-6 pb-6">
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur">
                  <p className="text-white font-medium truncate">{user?.name}</p>
                  <p className="text-white/70 text-sm truncate">{user?.email}</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-3 overflow-y-auto">
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const isLocked = !isProfileComplete;

                    return (
                      <NavLink
                        key={item.path}
                        to={isLocked ? '#' : item.path}
                        onClick={(e) => {
                          handleNavClick(item.path, e);
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : isLocked
                            ? 'text-white/40 cursor-not-allowed'
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        {isLocked && (
                          <Lock className="w-4 h-4 ml-auto" />
                        )}
                      </NavLink>
                    );
                  })}
                </div>

                {!isProfileComplete && (
                  <div className="mt-6 mx-3 p-4 rounded-xl bg-white/10 border border-white/20">
                    <p className="text-sm text-white/90 mb-3">
                      Complete your profile to unlock all features 🏥
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-white text-primary hover:bg-white/90"
                      onClick={() => {
                        navigate('/profile-setup');
                        setSidebarOpen(false);
                      }}
                    >
                      Complete Profile
                    </Button>
                  </div>
                )}
              </nav>

              {/* Bottom Actions */}
              <div className="p-3 space-y-1">
                <button
                  onClick={toggleTheme}
                  className="hidden lg:flex w-full items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 min-h-screen pt-16 lg:pt-0 overflow-x-hidden">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
