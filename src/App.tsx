import React from 'react';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { HeroSection } from '@/components/sections/HeroSection/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection/AboutSection';
import { WorkflowSection } from '@/components/sections/WorkflowSection/WorkflowSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection/ContactSection';

const App: React.FC = () => {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Перейти к основному содержимому
      </a>
      <Header />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <WorkflowSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default App;
