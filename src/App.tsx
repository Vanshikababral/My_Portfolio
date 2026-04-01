/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { ThemeProvider } from './context/ThemeContext';
import { MenuProvider } from './context/MenuContext';
import CustomCursor from './components/global/CustomCursor';
import Header from './components/global/Header';
import MenuOverlay from './components/global/MenuOverlay';

// Sections
import LoadingScreen from './components/sections/LoadingScreen';
import EntryScreen from './components/sections/EntryScreen';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Work from './components/sections/Work';
import WorkDetail from './components/sections/WorkDetail';
import Certifications from './components/sections/Certifications';
import Journey from './components/sections/Journey';
import Interests from './components/sections/Interests';
import Contact from './components/sections/Contact';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

const sectionMap: Record<string, React.ReactNode> = {
  loading: <LoadingScreen />,
  entry: <EntryScreen />,
  hero: <Hero />,
  about: <About />,
  skills: <Skills />,
  work: <Work />,
  'work-detail': <WorkDetail />,
  certifications: <Certifications />,
  journey: <Journey />,
  interests: <Interests />,
  contact: <Contact />,
};

function AppContent() {
  const location = useLocation();
  const { activeSection } = useNavigation();

  return (
    <>
      <CustomCursor />
      {!['loading', 'entry'].includes(activeSection) && <Header />}
      <MenuOverlay />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ position: 'fixed', inset: 0, zIndex: 1, overflow: 'hidden' }}
        >
          <Routes location={location}>
            <Route path="/" element={<LoadingScreen />} />
            <Route path="/entry" element={<EntryScreen />} />
            <Route path="/hero" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work-detail" element={<WorkDetail />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/interests" element={<Interests />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <NavigationProvider>
          <MenuProvider>
            <AppContent />
          </MenuProvider>
        </NavigationProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

