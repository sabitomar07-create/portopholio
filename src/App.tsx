import React, { useState, useEffect } from 'react';
import { BackgroundEffect } from './components/BackgroundEffect';
import { WelcomePopup } from './components/WelcomePopup';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Showreel } from './components/Showreel';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  // Check sessionStorage for welcome popup (show once per browsing session)
  useEffect(() => {
    const hasBeenWelcomed = sessionStorage.getItem('omar_portfolio_welcomed');
    if (!hasBeenWelcomed) {
      // Small graceful entrance delay so visitor first sees the page background
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    sessionStorage.setItem('omar_portfolio_welcomed', 'true');
  };

  const handleOpenWelcome = () => {
    setShowWelcome(true);
  };

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'showreel', 'about', 'projects', 'contact'];
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-neutral-100 selection:bg-blue-600 selection:text-white">
      {/* Subtle Ambient Background Animation */}
      <BackgroundEffect />

      {/* Animation 2: Welcome Popup for First-Time Visitor */}
      <WelcomePopup isOpen={showWelcome} onClose={handleCloseWelcome} />

      {/* Navigation Bar with Staggered Links and Logo Entrance */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenWelcome={handleOpenWelcome}
      />

      {/* Main Content Sections with All 4 Animation Systems */}
      <main id="main-content">
        <Hero onNavigate={scrollToSection} />
        {/* Dedicated 15-Second Cinematic Motion Graphics Showreel */}
        <Showreel onNavigate={scrollToSection} />
        <About />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenWelcome={handleOpenWelcome}
      />
    </div>
  );
}
