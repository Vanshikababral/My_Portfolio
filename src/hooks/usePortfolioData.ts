import skillsData from '../data/skills.json';
import projectsData from '../data/projects.json';
import aboutData from '../data/about.json';
import certificationsData from '../data/certifications.json';
import journeyData from '../data/journey.json';
import interestsData from '../data/interests.json';
import { useNavigation } from '../context/NavigationContext';

export const usePortfolioData = (key: string) => {
  const dataMap: Record<string, any> = {
    skills: skillsData,
    projects: projectsData,
    about: aboutData,
    certifications: certificationsData,
    journey: journeyData,
    interests: interestsData,
  };

  return dataMap[key] ?? [];
};

export const useSelectedProject = () => {
  const { selectedProject } = useNavigation();
  return selectedProject;
};
