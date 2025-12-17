import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Chatbot from './components/Chatbot';
import { SectionId } from './types';
import { Calendar, MapPin, Phone, Star, CheckCircle2, ShieldCheck, Clock, ArrowRight, Stethoscope } from 'lucide-react';

// Images
const HERO_IMG = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"; 
const DENTAL_IMG_1 = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600";
const DENTAL_IMG_2 = "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=601";

function App() {
  const [activeSection, setActiveSection] = useState<string>(SectionId.HOME);

  // Scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.values(SectionId);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjusted threshold for better mobile detection
          if (rect.top >= -100 && rect.top <= 400) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-600 overflow-x-hidden">
      <Navigation activeSection={activeSection} />
      
      {/* Hero Section */}
      <section id={SectionId.HOME} className="pt-20 pb-12 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6 text-center md:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs md:text-sm font-medium mx-auto md:mx-0">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Trusted Dental Care in Thane
            </div>
            <h1 className="text-3xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              A Better Life Starts with a <span className="text-teal-600 block sm:inline">Beautiful Smile</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-lg mx-auto md:mx-0">
              Shrilata Dental Clinic provides world-class dental treatments with a gentle touch. 
              Advanced technology and experienced specialists in a comfortable environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2 md:pt-4">
              <button 
                onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3.5 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Book Appointment
                <Calendar className="ml-2 w-5 h-5" />
              </button>
              <button 
                onClick={() => document.getElementById(SectionId.SERVICES)?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3.5 bg-white text-teal-700 border border-teal-200 rounded-xl font-semibold hover:bg-teal-50 transition-colors active:scale-95"
              >
                View Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="relative mt-8 md:mt-0 px-2 sm:px-0">
            <div className="absolute -inset-2 md:-inset-4 bg-teal-100/50 rounded-2xl transform md:rotate-3 -z-10"></div>
            <img 
              src={HERO_IMG} 
              alt="Modern Dental Clinic" 
              className="rounded-2xl shadow-xl w-full object-cover h-[300px] sm:h-[400px] md:h-[500px]"
            />
            <div className="absolute -bottom-4 -left-2 md:bottom-6 md:left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-[200px] md:max-w-xs border-l-4 border-teal-500 scale-90 md:scale-100">
                <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-xs md:text-sm font-medium text-slate-800 italic">"The best dental experience in Thane. Highly recommended!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id={SectionId.SERVICES} className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">Our Specialities</h2>
            <p className="text-base md:text-lg text-slate-600">
              Comprehensive care for all your dental needs under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              { title: 'General Dentistry', desc: 'Routine checkups, cleanings, and fillings for optimal oral health.', icon: '🦷' },
              { title: 'Cosmetic Dentistry', desc: 'Teeth whitening and smile makeovers for a confident look.', icon: '✨' },
              { title: 'Root Canal', desc: 'Advanced procedures to save your natural teeth painlessly.', icon: '🔧' },
              { title: 'Orthodontics', desc: 'Modern braces and clear aligners to straighten your smile.', icon: '📏' },
              { title: 'Dental Implants', desc: 'Permanent, natural-looking solutions for missing teeth.', icon: '🔩' },
              { title: 'Pediatric Care', desc: 'Specialized gentle care tailored for our younger patients.', icon: '🧸' },
            ].map((service, index) => (
              <div key={index} className="group p-6 md:p-8 bg-slate-50 rounded-2xl hover:bg-teal-50 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-teal-100 flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id={SectionId.ABOUT} className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
             <div className="order-2 md:order-1 relative">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <img src={DENTAL_IMG_1} className="rounded-2xl shadow-lg mt-4 md:mt-8" alt="Clinic Equipment" />
                    <img src={DENTAL_IMG_2} className="rounded-2xl shadow-lg mb-4 md:mb-8" alt="Doctor treating patient" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-600 text-white p-4 rounded-2xl shadow-xl hidden sm:block">
                  <p className="text-2xl font-bold text-center">15+</p>
                  <p className="text-xs uppercase font-semibold">Years Exp.</p>
                </div>
             </div>
             <div className="order-1 md:order-2 space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-4xl font-bold text-slate-900 text-center md:text-left">Dedicated to Your Health</h2>
                <p className="text-base md:text-lg text-slate-600 text-center md:text-left">
                    Shrilata Dental Clinic is led by experienced professionals passionate about personalized care.
                </p>
                <div className="space-y-4 pt-4">
                    {[
                      { title: 'Expert Doctors', text: 'Highly qualified specialists for every treatment.' },
                      { title: 'Modern Tech', text: 'Cutting-edge diagnostic and imaging systems.' },
                      { title: 'Safety First', text: 'Strict international sterilization protocols.' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                          <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                              <h4 className="font-bold text-slate-900 text-sm md:text-base">{item.title}</h4>
                              <p className="text-xs md:text-sm text-slate-600">{item.text}</p>
                          </div>
                      </div>
                    ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id={SectionId.CONTACT} className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-6 md:space-y-8">
                <div className="text-center lg:text-left">
                    <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3">Visit Us Today</h2>
                    <p className="text-base md:text-lg text-slate-600">Walk in or schedule your time for a dental consultation.</p>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-start p-4 md:p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <MapPin className="w-6 h-6 text-teal-600 mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-slate-900 text-base mb-1">Clinic Address</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Shrilata Dental Clinic, Thane (West), Maharashtra.<br/>
                                <span className="text-xs text-slate-400 block mt-1">Coordinates: 19.2057, 73.0002</span>
                            </p>
                            <a 
                                href="https://www.google.com/maps/place/Shrilata+Dental+Clinic/@19.2057166,72.9976856,17z" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block mt-3 text-teal-600 hover:text-teal-700 font-bold text-sm hover:underline"
                            >
                                Get Directions →
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <Clock className="w-5 h-5 text-teal-600 mr-3 mt-1 flex-shrink-0" />
                          <div>
                              <h3 className="font-bold text-slate-900 text-sm mb-1">Hours</h3>
                              <p className="text-xs text-slate-600">Mon - Sat: 10AM - 9PM</p>
                              <p className="text-xs text-slate-400 italic">Sunday: Reserved</p>
                          </div>
                      </div>
                      <div className="flex items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <Phone className="w-5 h-5 text-teal-600 mr-3 mt-1 flex-shrink-0" />
                          <div>
                              <h3 className="font-bold text-slate-900 text-sm mb-1">Phone</h3>
                              <a href="tel:+919876543210" className="text-sm font-bold text-teal-700 hover:underline">+91 98765 43210</a>
                          </div>
                      </div>
                    </div>
                </div>
            </div>

            {/* Appointment Form */}
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 text-center lg:text-left">Request a Call</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Name</label>
                            <input type="text" className="w-full p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all bg-slate-50" placeholder="Your Name" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone</label>
                            <input type="tel" className="w-full p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all bg-slate-50" placeholder="+91 ..." />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Interest</label>
                        <select className="w-full p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50 appearance-none">
                            <option>Initial Consultation</option>
                            <option>Regular Checkup</option>
                            <option>Urgent Pain</option>
                            <option>Orthodontic Inquiry</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Details</label>
                        <textarea className="w-full p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none h-24 bg-slate-50 resize-none" placeholder="How can we help?"></textarea>
                    </div>
                    <button type="submit" className="w-full py-4 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all shadow-lg active:scale-95 text-lg">
                        Submit Request
                    </button>
                    <p className="text-[10px] text-slate-400 text-center mt-4">
                        By submitting, you agree to our privacy policy. We will contact you soon.
                    </p>
                </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10 text-center sm:text-left">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center justify-center sm:justify-start">
                         <Stethoscope className="w-6 h-6 mr-2 text-teal-400" />
                         Shrilata Dental
                    </h3>
                    <p className="text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
                        Excellence in oral healthcare since 2008. Your comfort and health are our primary focus.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Navigation</h4>
                    <ul className="space-y-3 text-sm">
                        <li><button onClick={() => document.getElementById(SectionId.HOME)?.scrollIntoView()} className="hover:text-teal-400 transition-colors">Home</button></li>
                        <li><button onClick={() => document.getElementById(SectionId.SERVICES)?.scrollIntoView()} className="hover:text-teal-400 transition-colors">Services</button></li>
                        <li><button onClick={() => document.getElementById(SectionId.ABOUT)?.scrollIntoView()} className="hover:text-teal-400 transition-colors">About Clinic</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Find Us</h4>
                    <p className="text-sm mb-4">Located in the heart of Thane. Accessible from Mumbai/Navi Mumbai.</p>
                    <div className="flex justify-center sm:justify-start space-x-4">
                      {/* Social place holders */}
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer">f</div>
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer">ig</div>
                    </div>
                </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center text-[10px] md:text-xs text-slate-500 uppercase tracking-widest">
                &copy; {new Date().getFullYear()} Shrilata Dental Clinic &bull; Made with Care
            </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}

export default App;
