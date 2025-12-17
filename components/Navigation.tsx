import React, { useState, useEffect } from 'react';
import { Menu, X, Stethoscope, ChevronRight } from 'lucide-react';
import { SectionId } from '../types';

interface NavigationProps {
  activeSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: SectionId.HOME, label: 'Home' },
    { id: SectionId.SERVICES, label: 'Services' },
    { id: SectionId.ABOUT, label: 'About' },
    { id: SectionId.CONTACT, label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 md:h-14">
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group" 
            onClick={() => scrollToSection(SectionId.HOME)}
          >
            <div className="bg-teal-600 p-1.5 rounded-lg mr-2 group-hover:bg-teal-500 transition-colors">
              <Stethoscope className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <span className="font-bold text-lg md:text-xl text-slate-900 tracking-tight">Shrilata Dental</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-1 py-2 text-sm font-bold tracking-wide transition-colors ${
                  activeSection === link.id ? 'text-teal-600' : 'text-slate-600 hover:text-teal-500'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-full" />
                )}
              </button>
            ))}
            <button 
                onClick={() => scrollToSection(SectionId.CONTACT)}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-xl bg-slate-50 text-slate-700 hover:text-teal-600 focus:outline-none border border-slate-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 top-[64px] z-40 bg-white md:hidden transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="px-4 py-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`flex items-center justify-between w-full px-5 py-4 rounded-2xl text-lg font-bold transition-all ${
                activeSection === link.id 
                ? 'bg-teal-50 text-teal-600' 
                : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
              <ChevronRight className={`h-5 w-5 ${activeSection === link.id ? 'opacity-100' : 'opacity-20'}`} />
            </button>
          ))}
          <div className="pt-8 px-4">
               <button 
                  onClick={() => scrollToSection(SectionId.CONTACT)}
                  className="w-full bg-teal-600 text-white px-5 py-4 rounded-2xl text-lg font-bold hover:bg-teal-700 shadow-xl active:scale-95 transition-transform"
              >
                Schedule Appointment
              </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
