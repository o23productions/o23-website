import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { Footer } from './components/Footer';
import { Architecture } from './components/Architecture';
import { ContactPage } from './components/ContactPage';

function App() {
  const [route, setRoute] = useState(window.location.hash || '#home');

  useEffect(() => {
    const handleHashChange = () => {
      // Normalize empty hash to #home
      const hash = window.location.hash || '#home';
      setRoute(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Scroll handling logic
    const handleScroll = () => {
      // 1. Separate Page Views
      if (route === '#contact' || route === '#campaign') {
        window.scrollTo(0, 0);
        return;
      }

      // 2. Home / Top
      if (route === '#home' || route === '') {
         window.scrollTo({ top: 0, behavior: 'smooth' });
         return;
      }

      // 3. Anchor Navigation (e.g. #services)
      const id = route.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        // Calculate offset to account for sticky navbar (h-20 = 80px) + breathing room
        const navbarHeight = 90; 
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // Retry logic for dynamic rendering
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            const navbarHeight = 90;
            const elementPosition = el.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - navbarHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };

    handleScroll();
  }, [route]);

  if (route === '#contact') {
    return <ContactPage />;
  }
  
  if (route === '#campaign') {
    return <ContactPage isCampaignMode={true} />;
  }

  return (
    <div className="min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Architecture />
        {/* IdeaGenerator removed as requested */}
      </main>
      <Footer />
    </div>
  );
}

export default App;