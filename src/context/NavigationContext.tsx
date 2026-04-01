import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Section = 'loading' | 'entry' | 'hero' | 'about' | 'skills' | 'work' | 'work-detail' | 'certifications' | 'journey' | 'interests' | 'contact';

interface NavigationContextType {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  selectedProject: any;
  setSelectedProject: (project: any) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const pathToSection = (path: string): Section => {
  const cleanPath = path.replace('/', '');
  if (!cleanPath) return 'loading';
  const validSections: Section[] = ['loading', 'entry', 'hero', 'about', 'skills', 'work', 'work-detail', 'certifications', 'journey', 'interests', 'contact'];
  if (validSections.includes(cleanPath as Section)) {
    return cleanPath as Section;
  }
  return 'loading';
};

const sectionToPath = (section: Section): string => {
  if (section === 'loading') return '/';
  return `/${section}`;
};

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSectionState] = useState<Section>(pathToSection(location.pathname));
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    const section = pathToSection(location.pathname);
    setActiveSectionState(section);
  }, [location.pathname]);

  const setActiveSection = (section: Section) => {
    navigate(sectionToPath(section));
  };

  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection, selectedProject, setSelectedProject }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within a NavigationProvider');
  return context;
};
