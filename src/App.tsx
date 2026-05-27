/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cog, Shield, Zap, Users, Wrench, Car, Gauge, ExternalLink,
  Phone, Mail, Clock, MapPin, Facebook, ChevronRight, Menu, X, Star,
  CheckCircle2, ArrowRight, ChevronDown
} from 'lucide-react';
import { BUSINESS_INFO, IMAGES, SERVICES, ALL_SUBPAGES, SUSPENSION_SUBPAGES, GENERAL_REPAIR_SUBPAGES, CATALYTIC_SUBPAGES, PageId, Service, SubService } from './constants';

// --- Navbar ---

const Navbar = ({ onNavigate, currentPage }: { onNavigate: (id: PageId) => void, currentPage: PageId }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const go = (id: PageId) => {
    onNavigate(id);
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const suspensionSubs = SUSPENSION_SUBPAGES.slice(0, 5);
  const generalSubs = GENERAL_REPAIR_SUBPAGES.slice(0, 5);
  const catalyticSubs = CATALYTIC_SUBPAGES;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-dark/95 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => go('home')} className="flex items-center gap-3 group">
          <img src={IMAGES.logo} alt="National Transmission" className="h-10 md:h-12" referrerPolicy="no-referrer" />
          <div className="text-left">
            <span className="block text-white font-black text-base sm:text-lg leading-none group-hover:text-blue-primary transition-colors">NATIONAL</span>
            <span className="block text-blue-primary font-bold text-[10px] sm:text-xs tracking-widest uppercase">Transmission</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6" ref={dropdownRef}>
          <button onClick={() => go('home')} className={`text-sm font-semibold transition-colors hover:text-blue-primary ${currentPage === 'home' ? 'text-blue-primary' : 'text-text-white'}`}>Home</button>

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsServicesOpen(v => !v)}
              className={`text-sm font-semibold transition-colors hover:text-blue-primary flex items-center gap-1 ${['transmission','exhaust','suspension','brakes','general-repair'].includes(currentPage) ? 'text-blue-primary' : 'text-text-white'}`}
            >
              Our Services <ChevronDown size={14} className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[760px] bg-bg-card border border-border-subtle rounded-card shadow-2xl p-6 grid grid-cols-3 gap-6"
                >
                  {/* Col 1: Transmission + Catalytic + Brakes */}
                  <div className="space-y-4">
                    <p className="text-[10px] text-text-label uppercase tracking-widest font-bold mb-3">Main Services</p>
                    {[
                      { id: 'transmission' as PageId, label: 'Remanufactured Transmissions', desc: '1–3 day turnaround. Built beyond factory spec.' },
                      { id: 'brakes' as PageId, label: 'Brake Inspection & Repair', desc: 'Pads, rotors, fluid — all makes and models.' },
                    ].map(item => (
                      <button key={item.id} onClick={() => go(item.id)} className="block text-left w-full group">
                        <span className="block text-white font-semibold text-sm group-hover:text-blue-primary transition-colors">{item.label}</span>
                        <span className="block text-text-label text-xs mt-0.5">{item.desc}</span>
                      </button>
                    ))}
                    <div className="pt-2 border-t border-border-subtle">
                      <p className="text-[10px] text-text-label uppercase tracking-widest font-bold mb-3">Catalytic Converters</p>
                      {catalyticSubs.slice(0,3).map(s => (
                        <button key={s.id} onClick={() => go(s.id)} className="block text-left w-full text-text-muted hover:text-blue-primary text-xs py-1 transition-colors">{s.title}</button>
                      ))}
                      <button onClick={() => go('exhaust')} className="block text-blue-primary text-xs font-bold mt-1 hover:underline">View All Catalytic Services →</button>
                    </div>
                  </div>

                  {/* Col 2: Suspension sub-pages */}
                  <div>
                    <button onClick={() => go('suspension')} className="block text-white font-semibold text-sm hover:text-blue-primary transition-colors mb-3">Front End & Suspension</button>
                    <div className="space-y-1">
                      {suspensionSubs.map(s => (
                        <button key={s.id} onClick={() => go(s.id)} className="block text-left w-full text-text-muted hover:text-blue-primary text-xs py-1 transition-colors">{s.title}</button>
                      ))}
                      <button onClick={() => go('suspension')} className="block text-blue-primary text-xs font-bold mt-2 hover:underline">View All Suspension →</button>
                    </div>
                  </div>

                  {/* Col 3: General Repair sub-pages */}
                  <div>
                    <button onClick={() => go('general-repair')} className="block text-white font-semibold text-sm hover:text-blue-primary transition-colors mb-3">General Auto Repair</button>
                    <div className="space-y-1">
                      {generalSubs.map(s => (
                        <button key={s.id} onClick={() => go(s.id)} className="block text-left w-full text-text-muted hover:text-blue-primary text-xs py-1 transition-colors">{s.title}</button>
                      ))}
                      <button onClick={() => go('general-repair')} className="block text-blue-primary text-xs font-bold mt-2 hover:underline">View All General Repair →</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => go('remanned')} className={`text-sm font-semibold transition-colors hover:text-blue-primary ${currentPage === 'remanned' ? 'text-blue-primary' : 'text-text-white'}`}>Remanned vs Rebuild</button>
          <button onClick={() => go('warranty')} className={`text-sm font-semibold transition-colors hover:text-blue-primary ${currentPage === 'warranty' ? 'text-blue-primary' : 'text-text-white'}`}>Warranty</button>
          <button onClick={() => go('contact')} className="btn-primary py-2.5 px-5 text-sm">
            Free Estimate <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-bg-deepest z-[60] flex flex-col p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10 shrink-0">
              <img src={IMAGES.logo} alt="Logo" className="h-10" referrerPolicy="no-referrer" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2 hover:bg-bg-icon rounded-full transition-colors">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <button onClick={() => go('home')} className="text-2xl font-bold text-left text-white hover:text-blue-primary transition-colors">Home</button>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(v => !v)}
                  className="text-2xl font-bold text-left text-white hover:text-blue-primary transition-colors w-full flex items-center justify-between"
                >
                  Our Services
                  <ChevronDown size={20} className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="mt-3 pl-4 border-l border-border-blue space-y-4">
                    {[
                      { id: 'transmission' as PageId, label: 'Transmissions' },
                      { id: 'exhaust' as PageId, label: 'Catalytic Converters' },
                      { id: 'suspension' as PageId, label: 'Suspension' },
                      { id: 'brakes' as PageId, label: 'Brakes' },
                      { id: 'general-repair' as PageId, label: 'General Repair' },
                    ].map(item => (
                      <button key={item.id} onClick={() => go(item.id)} className="block text-lg font-semibold text-text-muted hover:text-blue-primary transition-colors">{item.label}</button>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={() => go('remanned')} className="text-2xl font-bold text-left text-white hover:text-blue-primary transition-colors">Remanned vs Rebuild</button>
              <button onClick={() => go('warranty')} className="text-2xl font-bold text-left text-white hover:text-blue-primary transition-colors">Warranty</button>
              <div className="pt-6 border-t border-border-subtle mt-2">
                <button onClick={() => go('contact')} className="btn-primary w-full justify-center py-4 text-lg">
                  Free Estimate <ArrowRight size={24} />
                </button>
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="btn-outline w-full justify-center py-4 text-lg mt-4">
                  <Phone size={20} /> {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Footer ---

const Footer = ({ onNavigate }: { onNavigate: (id: PageId) => void }) => {
  return (
    <footer className="bg-bg-deepest border-t border-border-subtle pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img src={IMAGES.logo} alt="Logo" className="h-10" referrerPolicy="no-referrer" />
            <div className="text-left">
              <span className="block text-white font-black text-lg leading-none">NATIONAL</span>
              <span className="block text-blue-primary font-bold text-xs tracking-widest uppercase">Transmission</span>
            </div>
          </div>
          <p className="mb-6">Serving Central Louisiana for over 20 years with premium remanufactured automotive solutions.</p>
          <a href={BUSINESS_INFO.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-primary font-semibold hover:underline">
            <Facebook size={20} /> Follow us on Facebook
          </a>
        </div>

        <div>
          <span className="eyebrow">Navigation</span>
          <ul className="space-y-3">
            {[
              { id: 'home' as PageId, label: 'Home' },
              { id: 'remanned' as PageId, label: 'Remanned vs Rebuild' },
              { id: 'warranty' as PageId, label: 'Our Warranty' },
              { id: 'contact' as PageId, label: 'Contact Us' },
            ].map(item => (
              <li key={item.id}><button onClick={() => onNavigate(item.id)} className="text-text-muted hover:text-blue-primary transition-colors">{item.label}</button></li>
            ))}
          </ul>
        </div>

        <div>
          <span className="eyebrow">Services</span>
          <ul className="space-y-3">
            {[
              { id: 'transmission' as PageId, label: 'Transmissions' },
              { id: 'exhaust' as PageId, label: 'Catalytic Converters' },
              { id: 'suspension' as PageId, label: 'Suspension' },
              { id: 'brakes' as PageId, label: 'Brakes' },
              { id: 'general-repair' as PageId, label: 'General Repair' },
            ].map(item => (
              <li key={item.id}><button onClick={() => onNavigate(item.id)} className="text-text-muted hover:text-blue-primary transition-colors">{item.label}</button></li>
            ))}
          </ul>
        </div>

        <div>
          <span className="eyebrow">Contact</span>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <Phone size={18} className="text-blue-primary shrink-0" />
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-text-white font-semibold hover:text-blue-primary transition-colors">{BUSINESS_INFO.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="text-blue-primary shrink-0" />
              <span className="text-text-muted text-sm break-all">{BUSINESS_INFO.email}</span>
            </li>
            <li className="flex gap-3">
              <MapPin size={18} className="text-blue-primary shrink-0" />
              <span className="text-text-muted">{BUSINESS_INFO.address}</span>
            </li>
            <li className="flex gap-3">
              <Clock size={18} className="text-blue-primary shrink-0" />
              <span className="text-text-muted">{BUSINESS_INFO.hours}</span>
            </li>
            <li>
              <a href={BUSINESS_INFO.sisterSite} target="_blank" rel="noopener noreferrer" className="btn-outline py-2 px-4 text-xs w-full justify-center">
                Visit National Tire & Auto <ExternalLink size={14} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-border-subtle text-center">
        <p className="text-xs text-text-label">
          © {new Date().getFullYear()} National Transmission · All Rights Reserved · Alexandria, Louisiana
        </p>
      </div>
    </footer>
  );
};

// --- Contact Form ---

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitStatus === 'success' && (
        <div className="bg-green-500/20 text-green-400 p-4 rounded-card border border-green-500/30 text-center font-bold">
          Message sent successfully! We'll be in touch soon.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="bg-red-500/20 text-red-400 p-4 rounded-card border border-red-500/30 text-center font-bold">
          There was an error sending your message. Please try again or call us.
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" name="Name" placeholder="Your Name" required className="input-field" disabled={isSubmitting} />
        <input type="tel" name="Phone" placeholder="Phone Number" required className="input-field" disabled={isSubmitting} />
      </div>
      <input type="email" name="Email" placeholder="Email Address" required className="input-field" disabled={isSubmitting} />
      <select name="Service" required className="input-field" disabled={isSubmitting}>
        <option value="">Select Service</option>
        <option value="transmission">Transmission</option>
        <option value="catalytic-converter-repair">Catalytic Converter Repair</option>
        <option value="exhaust-leak-repair">Exhaust Leak Repair</option>
        <option value="suspension">Front End & Suspension</option>
        <option value="brakes">Brakes</option>
        <option value="diagnostics">Vehicle Diagnostics</option>
        <option value="ac-repair">AC Repair</option>
        <option value="general-repair">General Repair</option>
        <option value="other">Other</option>
      </select>
      <textarea name="Message" placeholder="How can we help?" rows={4} className="input-field" disabled={isSubmitting}></textarea>
      <button type="submit" className="btn-primary w-full justify-center" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : (
          <>Send Estimate Request <ArrowRight size={20} /></>
        )}
      </button>
    </form>
  );
};

// --- Hero Sparks ---

const HeroSparks = () => {
  const sparks = Array.from({ length: 18 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 5,
    duration: 2.5 + Math.random() * 3, size: 1 + Math.random() * 2.5, opacity: 0.3 + Math.random() * 0.5,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {sparks.map(s => (
        <motion.div key={s.id} className="absolute rounded-full"
          style={{ left: `${s.left}%`, bottom: '-5%', width: s.size, height: s.size,
            background: `radial-gradient(circle, rgba(245,158,11,${s.opacity}) 0%, rgba(37,99,235,${s.opacity * 0.5}) 100%)`,
            boxShadow: `0 0 ${s.size * 3}px rgba(245,158,11,${s.opacity * 0.6})` }}
          animate={{ y: [0, -window.innerHeight * 1.2], x: [0, (Math.random() - 0.5) * 80], opacity: [0, s.opacity, s.opacity, 0], scale: [0.5, 1, 1, 0.3] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

// --- Meshed Gears ---

const generateSoftGearPath = (cx: number, cy: number, teeth: number, outerR: number, rootR: number): string => {
  const step = (Math.PI * 2) / teeth;
  const tipFrac = 0.30; const gapFrac = 0.30; const riseFrac = (1 - tipFrac - gapFrac) / 2;
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const base = i * step; const gapEnd = base + gapFrac * step;
    const tipStart = gapEnd + riseFrac * step; const tipEnd = tipStart + tipFrac * step;
    const nextGap = base + step;
    if (i === 0) d += `M ${cx + rootR * Math.cos(base)} ${cy + rootR * Math.sin(base)} `;
    d += `A ${rootR} ${rootR} 0 0 1 ${cx + rootR * Math.cos(gapEnd)} ${cy + rootR * Math.sin(gapEnd)} `;
    const cp1x = cx + (rootR + (outerR - rootR) * 0.15) * Math.cos(gapEnd + riseFrac * step * 0.35);
    const cp1y = cy + (rootR + (outerR - rootR) * 0.15) * Math.sin(gapEnd + riseFrac * step * 0.35);
    const cp2x = cx + (outerR - (outerR - rootR) * 0.1) * Math.cos(tipStart - riseFrac * step * 0.3);
    const cp2y = cy + (outerR - (outerR - rootR) * 0.1) * Math.sin(tipStart - riseFrac * step * 0.3);
    d += `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${cx + outerR * Math.cos(tipStart)} ${cy + outerR * Math.sin(tipStart)} `;
    d += `A ${outerR} ${outerR} 0 0 1 ${cx + outerR * Math.cos(tipEnd)} ${cy + outerR * Math.sin(tipEnd)} `;
    const cp3x = cx + (outerR - (outerR - rootR) * 0.1) * Math.cos(tipEnd + riseFrac * step * 0.3);
    const cp3y = cy + (outerR - (outerR - rootR) * 0.1) * Math.sin(tipEnd + riseFrac * step * 0.3);
    const cp4x = cx + (rootR + (outerR - rootR) * 0.15) * Math.cos(nextGap - riseFrac * step * 0.35);
    const cp4y = cy + (rootR + (outerR - rootR) * 0.15) * Math.sin(nextGap - riseFrac * step * 0.35);
    d += `C ${cp3x} ${cp3y} ${cp4x} ${cp4y} ${cx + rootR * Math.cos(nextGap)} ${cy + rootR * Math.sin(nextGap)} `;
  }
  return d + 'Z';
};

const MeshedGears = () => {
  const largeTeeth = 8; const smallTeeth = 6;
  const largeOuterR = 320; const largeRootR = 250; const largeHubR = 160;
  const smallOuterR = 200; const smallRootR = 155; const smallHubR = 100;
  const centerDist = 480; const largePeriod = 6;
  const smallPeriod = largePeriod * (smallTeeth / largeTeeth);
  const smallPhaseOffset = 180 / smallTeeth;
  const meshDelay = largePeriod / (largeTeeth * 2);
  const svgW = 1000; const svgH = 1050;
  const largeCx = 740; const largeCy = 680;
  const meshAngle = -108 * (Math.PI / 180);
  const smallCx = largeCx + centerDist * Math.cos(meshAngle);
  const smallCy = largeCy + centerDist * Math.sin(meshAngle);
  return (
    <div className="absolute bottom-[-200px] right-[-400px] z-[4] pointer-events-none hidden md:block" style={{ width: svgW, height: svgH }}>
      <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="opacity-[0.15]">
        <defs><filter id="gear-glow-soft"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
        <g filter="url(#gear-glow-soft)">
          <g className="gear-large-v2" style={{ transformOrigin: `${largeCx}px ${largeCy}px` }}>
            <path d={generateSoftGearPath(largeCx, largeCy, largeTeeth, largeOuterR, largeRootR)} fill="#2563EB" stroke="#93C5FD" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx={largeCx} cy={largeCy} r={largeRootR - 8} fill="#1E40AF" stroke="#93C5FD" strokeWidth="0.5" />
            <circle cx={largeCx} cy={largeCy} r={largeHubR} fill="#080E1A" stroke="#60A5FA" strokeWidth="2" />
            {Array.from({ length: 5 }, (_, i) => { const rad = (i * 72) * Math.PI / 180; return (<line key={i} x1={largeCx + 168 * Math.cos(rad)} y1={largeCy + 168 * Math.sin(rad)} x2={largeCx + 230 * Math.cos(rad)} y2={largeCy + 230 * Math.sin(rad)} stroke="#60A5FA" strokeWidth="6" strokeLinecap="round" opacity="0.4" />); })}
            <circle cx={largeCx} cy={largeCy} r={20} fill="#1E40AF" stroke="#60A5FA" strokeWidth="2" />
            <circle cx={largeCx} cy={largeCy} r={8} fill="#2563EB" />
          </g>
        </g>
        <g filter="url(#gear-glow-soft)">
          <g className="gear-small-v2" style={{ transformOrigin: `${smallCx}px ${smallCy}px` }}>
            <path d={generateSoftGearPath(smallCx, smallCy, smallTeeth, smallOuterR, smallRootR)} fill="#2563EB" stroke="#93C5FD" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx={smallCx} cy={smallCy} r={smallRootR - 6} fill="#1E40AF" stroke="#93C5FD" strokeWidth="0.5" />
            <circle cx={smallCx} cy={smallCy} r={smallHubR} fill="#080E1A" stroke="#60A5FA" strokeWidth="2" />
            {Array.from({ length: 3 }, (_, i) => { const rad = (i * 120) * Math.PI / 180; return (<line key={i} x1={smallCx + 106 * Math.cos(rad)} y1={smallCy + 106 * Math.sin(rad)} x2={smallCx + 141 * Math.cos(rad)} y2={smallCy + 141 * Math.sin(rad)} stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" opacity="0.4" />); })}
            <circle cx={smallCx} cy={smallCy} r={14} fill="#1E40AF" stroke="#60A5FA" strokeWidth="2" />
            <circle cx={smallCx} cy={smallCy} r={5} fill="#2563EB" />
          </g>
        </g>
      </svg>
      <style>{`
        .gear-large-v2 { animation: gear-cw-v2 ${largePeriod}s linear infinite; animation-delay: ${meshDelay}s; }
        .gear-small-v2 { animation: gear-ccw-v2 ${smallPeriod}s linear infinite; }
        @keyframes gear-cw-v2  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes gear-ccw-v2 { from { transform: rotate(${smallPhaseOffset}deg); } to { transform: rotate(${smallPhaseOffset - 360}deg); } }
      `}</style>
    </div>
  );
};

// --- Home Page ---

const HomePage = ({ onNavigate }: { onNavigate: (id: PageId) => void }) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
      }
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const mainServices = SERVICES.filter(s => s.id !== 'general-repair');
  const allDisplayServices = SERVICES;

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section ref={heroRef} className="hero-section relative min-h-screen flex items-end overflow-hidden">
        <motion.div className="absolute inset-0 z-0"
          animate={{ x: (mousePos.x - 0.5) * -20, y: (mousePos.y - 0.5) * -10 }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.8 }}>
          <div className="absolute inset-[-40px] bg-cover bg-center" style={{ backgroundImage: `url('/Car images/Open hood car.png')` }} />
        </motion.div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#080E1A] via-[#080E1A]/80 to-transparent" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#080E1A]/90 via-[#080E1A]/40 to-transparent" />
        <div className="absolute inset-0 z-[2] opacity-30 transition-opacity duration-700"
          style={{ background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(37,99,235,0.15), transparent)` }} />
        <HeroSparks />
        <div className="absolute inset-0 z-[3] pointer-events-none hero-scanlines opacity-[0.03]" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 pb-24 pt-40 w-full">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[2px] bg-blue-primary" />
              <span className="text-blue-primary font-bold uppercase tracking-[0.2em] text-xs">Alexandria, Louisiana · Est. 20+ Years</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
              className="text-[2.25rem] sm:text-5xl md:text-7xl lg:text-8xl mb-2 leading-[0.95] tracking-tight">
              We Don't Just<br />Rebuild.
            </motion.h1>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
              className="text-[2.25rem] sm:text-5xl md:text-7xl lg:text-8xl mb-8 leading-[0.95] tracking-tight hero-gradient-text">
              We Remanufacture.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}
              className="text-lg md:text-xl text-white/70 mb-10 max-w-xl leading-relaxed">
              Remanufactured transmissions, catalytic converter repair, exhaust leak repair, suspension & brakes — backed by a
              <span className="text-blue-primary font-semibold"> 3-Year Nationwide Unlimited Mileage Warranty</span>. Expert 1–3 day turnaround.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1 }} className="flex flex-wrap gap-4 mb-16">
              <button onClick={() => onNavigate('contact')} className="hero-cta-primary group">
                <span className="relative z-10 flex items-center gap-2">Get a Free Estimate <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
              </button>
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="btn-outline backdrop-blur-sm border-white/20 hover:border-blue-primary">
                <Phone size={18} /> Call {BUSINESS_INFO.phone}
              </a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.3 }} className="flex flex-wrap gap-4 md:gap-6">
            {[
              { val: '20+', label: 'Years Experience' },
              { val: '3-Year', label: 'Nationwide Warranty' },
              { val: '1–3 Day', label: 'Turnaround' },
              { val: '★ 4.9', label: 'Google Rating' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4 + i * 0.1 }} className="hero-stat-badge">
                <span className="text-white font-black text-lg">{stat.val}</span>
                <span className="text-white/50 text-[10px] uppercase tracking-widest font-bold">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <MeshedGears />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-dark to-transparent z-10" />
      </section>

      {/* Services Grid */}
      <section className="bg-bg-dark py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="eyebrow">WHAT WE DO</span>
            <h2 className="text-4xl md:text-5xl mb-6">Our Services</h2>
            <p className="max-w-2xl mx-auto">From remanufactured transmissions to catalytic converter repair, exhaust leak service, suspension, brakes, and general auto repair — complete automotive care in Alexandria.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allDisplayServices.map((s, idx) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }} viewport={{ once: true }}
                onClick={() => onNavigate(s.id)} className="card cursor-pointer group">
                <div className="icon-badge">
                  <s.icon className={`${s.accentColor} group-hover:scale-110 transition-transform`} size={28} />
                </div>
                <h3 className="text-xl mb-4 group-hover:text-blue-primary transition-colors">{s.navLabel || s.title}</h3>
                <p className="text-sm">{s.shortDesc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Section */}
      <section className="bg-bg-dark py-24 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight">Why the Region Trusts <br /><span className="text-blue-primary">National Transmission.</span></h2>
            <p className="text-lg mb-12">Family-owned and dedicated to keeping your vehicle running right. We treat every vehicle like our own — with the same exacting standards on every single job.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: Zap, color: 'text-accent-blue', title: '1–3 Day Turnaround', desc: 'Most transmission and engine jobs completed in 1–3 business days. Fast — without cutting corners.' },
                { icon: Wrench, color: 'text-accent-orange', title: 'Remanufactured, Not Just Rebuilt', desc: "Every wear component replaced and restored beyond factory spec. That's the National Transmission difference." },
                { icon: Shield, color: 'text-accent-green', title: '3-Year Nationwide Warranty', desc: 'Unlimited mileage. Honored anywhere in the country on every remanufactured unit we build.' },
                { icon: Users, color: 'text-accent-teal', title: 'Alexandria Roots', desc: 'Locally owned and family-operated in Central Louisiana for over 20 years. Your neighbors. Your shop.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 bg-bg-icon rounded-icon flex items-center justify-center shrink-0">
                    <item.icon className={item.color} size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">{item.title}</h4>
                    <p className="text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <img src={IMAGES.shop[1]} alt="Shop" className="rounded-card border border-border-subtle shadow-xl w-full" referrerPolicy="no-referrer" />
                <div className="bg-bg-card border border-border-subtle p-6 rounded-card shadow-xl">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="relative w-12 h-12">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-bg-icon" />
                        <circle cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="4" strokeDasharray="125.6" strokeDashoffset="2.5" className="text-blue-primary" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">98%</span>
                    </div>
                    <div>
                      <span className="block text-white font-bold leading-none">Satisfaction</span>
                      <span className="text-[10px] text-text-label uppercase tracking-widest">CLIENT SCORE</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-bg-card border border-border-subtle p-6 rounded-card shadow-xl">
                  <span className="block text-white font-bold text-lg">Local & Legacy</span>
                  <span className="text-[10px] text-text-label uppercase tracking-widest">FAMILY OWNED</span>
                </div>
                <img src={IMAGES.shop[2]} alt="Shop" className="rounded-card border border-border-subtle shadow-xl w-full" referrerPolicy="no-referrer" />
                <div className="bg-blue-primary p-6 rounded-card shadow-xl">
                  <span className="block text-white font-black text-3xl">20+</span>
                  <span className="block text-white/90 text-sm font-medium">Years</span>
                  <span className="text-[10px] text-white/60 uppercase tracking-widest">EXPERTISE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remanned vs Rebuilt Teaser */}
      <section className="bg-bg-deepest py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="eyebrow">THE DIFFERENCE</span>
          <h2 className="text-4xl md:text-5xl mb-4">Remanned vs. Rebuilt.</h2>
          <p className="text-blue-primary font-bold text-lg mb-8 uppercase tracking-widest">Know what you’re paying for.</p>
          <p className="max-w-2xl mx-auto mb-16">Many shops rebuild — replacing only the failed parts. At National Transmission, we remanufacture beyond factory specifications. Every component with potential wear is replaced proactively, including known model-specific failure points.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card text-left">
              <span className="inline-block bg-bg-icon text-text-label text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded-full mb-6">REBUILT</span>
              <h3 className="text-2xl mb-6">What Rebuilt Means</h3>
              <ul className="space-y-4">
                {['Only failed parts replaced', 'Worn components may remain', "Doesn't address model-specific weak points", 'Shorter lifespan'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-text-muted"><span className="w-1.5 h-1.5 bg-text-label rounded-full"></span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="card text-left border-blue-primary shadow-[0_0_40px_rgba(37,99,235,0.12)]">
              <span className="inline-block bg-blue-primary text-white text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded-full mb-6">OUR STANDARD</span>
              <h3 className="text-2xl mb-6">What We Do</h3>
              <ul className="space-y-4">
                {['Every wear component replaced', 'Restored beyond factory specifications', 'Known model-specific failure points addressed', 'Backed by 3-Year Nationwide Warranty'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white"><CheckCircle2 className="text-blue-primary" size={18} />{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <button onClick={() => onNavigate('remanned')} className="mt-12 text-blue-primary font-bold flex items-center gap-2 mx-auto hover:gap-4 transition-all">
            Learn the Full Difference <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Warranty Banner */}
      <section className="bg-blue-primary py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-center mb-12">
            <div className="md:border-r border-white/20"><span className="block text-5xl font-black text-white mb-2">3 Year</span><span className="text-xs uppercase tracking-widest text-white/80">Nationwide Warranty</span></div>
            <div className="md:border-r border-white/20"><span className="block text-5xl font-black text-white mb-2">Unlimited</span><span className="text-xs uppercase tracking-widest text-white/80">Mileage Guarantee</span></div>
            <div><span className="block text-5xl font-black text-white mb-2">1–3 Day</span><span className="text-xs uppercase tracking-widest text-white/80">Turnaround</span></div>
          </div>
          <p className="text-center text-white/90 max-w-xl mx-auto mb-10">Our rebuilds go beyond factory spec — addressing the weak points that cause common failures. That's why we can stand behind a 3-Year Nationwide Unlimited Mileage Warranty with confidence.</p>
          <div className="flex justify-center">
            <button onClick={() => onNavigate('warranty')} className="bg-white text-blue-primary font-bold py-4 px-8 rounded-btn hover:bg-white/90 transition-colors flex items-center gap-2">
              View Full Warranty Details <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-bg-deepest py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="eyebrow">CUSTOMER REVIEWS</span>
            <h2 className="text-4xl md:text-5xl mb-4">Trusted by Central Louisiana</h2>
            <p className="text-blue-primary font-bold flex items-center justify-center gap-2">
              <span className="flex text-accent-orange">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</span>
              Excellent · Based on 20+ Reviews
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Stephen Peters', text: 'The staff went the extra mile to coordinate a replacement catalytic converter and arranged their schedule to get it done in a timely manner. Excellent service.' },
              { name: 'Charlie Mullins', text: 'Reliable. Fast. Friendly. Good warranty. Nice waiting room.' },
              { name: 'charanda Washington', text: 'I had a transmission replacement — very quick and satisfying! The gentlemen were very polite, patient, and professional. Highly recommend!' }
            ].map((rev, idx) => (
              <div key={idx} className="card">
                <div className="flex text-accent-orange mb-6">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
                <p className="italic mb-8 text-lg font-light">"{rev.text}"</p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">{rev.name}</span>
                  <span className="text-[10px] text-text-label uppercase tracking-widest">Via Google</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-bg-dark py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card border-accent-teal/30 flex flex-col justify-center">
            <div className="icon-badge bg-accent-teal/10"><ExternalLink className="text-accent-teal" size={28} /></div>
            <h3 className="text-3xl mb-6">Also Visit National Tire & Auto</h3>
            <p className="text-lg mb-8">Looking for tires, brakes, alignments, or suspension in Pineville? Our sister shop has you covered.</p>
            <a href={BUSINESS_INFO.sisterSite} target="_blank" rel="noopener noreferrer" className="btn-primary self-start">Visit nattireauto.com <ArrowRight size={20} /></a>
          </div>
          <div className="card">
            <h3 className="text-3xl mb-8">Get a Free Estimate</h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Generic Service Page (Exhaust/Brakes) ---

const ServicePage = ({ service, onNavigate }: { service: Service, onNavigate: (id: PageId) => void }) => {
  const subPages = service.id === 'exhaust' ? CATALYTIC_SUBPAGES : [];
  return (
    <div className="pt-20">
      <section className="relative py-24 bg-[radial-gradient(ellipse_70%_60%_at_20%_35%,rgba(37,99,235,0.12)_0%,transparent_70%),#080E1A]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 text-text-label text-xs uppercase tracking-widest mb-4">
              <button onClick={() => onNavigate('home')} className="hover:text-blue-primary">Home</button>
              <ChevronRight size={12} /><span>Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6">{service.title}</h1>
            <p className="text-blue-primary font-bold text-xl mb-8">{service.tagline}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-card overflow-hidden border border-border-subtle shadow-2xl h-[400px]">
            <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
        </div>
      </section>

      {subPages.length > 0 && (
        <div className="hidden lg:block bg-bg-dark border-y border-border-subtle sticky top-20 z-40 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-6 py-3 flex gap-3 min-w-max">
            {subPages.map(s => (
              <button key={s.id} onClick={() => onNavigate(s.id)}
                className="py-2 px-4 rounded-full text-xs font-bold bg-bg-icon text-text-muted hover:text-white hover:bg-blue-primary transition-all">
                {s.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <section className="bg-bg-dark py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl mb-8">Premium Automotive Care</h2>
            <p className="text-lg">{service.longDesc}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-card overflow-hidden border border-border-subtle shadow-2xl h-[500px]">
              <img src={service.detailImage} alt="Detail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h3 className="text-3xl mb-8">What We Do</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.checklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="text-blue-primary shrink-0" size={20} />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-primary py-16 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl mb-8 text-white">Ready to get started?</h2>
          <button onClick={() => onNavigate('contact')} className="bg-white text-blue-primary font-bold py-4 px-10 rounded-btn hover:bg-white/90 transition-colors text-lg">
            Call {BUSINESS_INFO.phone}
          </button>
        </div>
      </section>
    </div>
  );
};

// --- Transmission Category Page (Enhanced) ---

const TransmissionCategoryPage = ({ onNavigate }: { onNavigate: (id: PageId) => void }) => {
  const service = SERVICES.find(s => s.id === 'transmission')!;
  return (
    <div className="pt-20">
      <section className="relative py-24 bg-[radial-gradient(ellipse_70%_60%_at_20%_35%,rgba(37,99,235,0.15)_0%,transparent_70%),#080E1A]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 text-text-label text-xs uppercase tracking-widest mb-4">
              <button onClick={() => onNavigate('home')} className="hover:text-blue-primary">Home</button>
              <ChevronRight size={12} /><span>Transmissions</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-4">Remanufactured<br />Transmissions</h1>
            <p className="text-blue-primary font-bold text-xl mb-6">{service.tagline}</p>
            {/* Warranty badge */}
            <div className="inline-flex items-center gap-3 bg-blue-primary/10 border border-blue-primary/30 rounded-card px-5 py-3 mb-8">
              <Shield className="text-blue-primary" size={24} />
              <div>
                <span className="block text-white font-black text-lg leading-none">3-Year Warranty</span>
                <span className="text-blue-primary text-xs font-bold uppercase tracking-widest">Nationwide · Unlimited Mileage</span>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-card overflow-hidden border border-border-subtle shadow-2xl h-[400px]">
            <img src={service.heroImage} alt="Transmission" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
        </div>
      </section>

      {/* Beyond Factory Spec Section */}
      <section className="bg-bg-dark py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="eyebrow">OUR PROCESS</span>
              <h2 className="text-4xl mb-8">Built Beyond Factory. Not Just To Spec.</h2>
              <p className="text-lg mb-6">{service.longDesc}</p>
              <p className="mb-8">Unlike a simple rebuild that replaces only what failed, our remanufacturing process proactively addresses the weak points engineers know exist in specific transmission models — the components most likely to fail next. Your transmission comes back stronger than it left the factory.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.checklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="text-blue-primary shrink-0" size={20} />
                    <span className="font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {/* Failure Points Card */}
              <div className="card border-accent-orange/30">
                <h3 className="text-2xl mb-6 text-white">Known Failure Points — Addressed</h3>
                <p className="mb-6">Every transmission model has documented weak points. Standard rebuilds ignore them until they fail again. We don't.</p>
                <ul className="space-y-3">
                  {[
                    { title: 'Pump Wear', desc: 'Internal pump components are inspected and replaced to prevent low-pressure failures.' },
                    { title: 'Soft Part Degradation', desc: 'All seals, O-rings, gaskets, and friction plates replaced — not just the ones that broke.' },
                    { title: 'Solenoid Pack Issues', desc: 'Common in many modern transmissions; inspected and replaced to prevent shift quality problems.' },
                    { title: 'Thrust Washers & Bushings', desc: 'Often overlooked in standard rebuilds; we replace them to prevent premature wear.' },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <ChevronRight className="text-blue-primary shrink-0 mt-0.5" size={16} />
                      <div><span className="text-white font-semibold">{item.title}: </span><span className="text-text-muted text-sm">{item.desc}</span></div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Warranty Card */}
              <div className="bg-blue-primary rounded-card p-8">
                <h3 className="text-2xl text-white font-black mb-4">3-Year Nationwide Warranty</h3>
                <p className="text-white/90 mb-4">Our confidence in our craftsmanship is reflected in our warranty. Every remanufactured transmission is backed by a 3-Year, Unlimited Mileage Warranty — honored anywhere in the country.</p>
                <ul className="space-y-2">
                  {['3 Years of Coverage', 'Unlimited Mileage', 'Honored Nationwide', 'No Hidden Conditions'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-white"><CheckCircle2 size={16} /><span className="font-semibold">{item}</span></li>
                  ))}
                </ul>
                <button onClick={() => onNavigate('warranty')} className="mt-6 bg-white text-blue-primary font-bold py-3 px-6 rounded-btn hover:bg-white/90 transition-colors flex items-center gap-2">
                  View Warranty Details <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-primary py-16 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl mb-8 text-white">Get your transmission remanufactured right.</h2>
          <button onClick={() => onNavigate('contact')} className="bg-white text-blue-primary font-bold py-4 px-10 rounded-btn hover:bg-white/90 transition-colors text-lg">
            Call {BUSINESS_INFO.phone}
          </button>
        </div>
      </section>
    </div>
  );
};

// --- Suspension Category Page ---

const SuspensionCategoryPage = ({ onNavigate }: { onNavigate: (id: PageId) => void }) => {
  const service = SERVICES.find(s => s.id === 'suspension')!;
  return (
    <div className="pt-20">
      <section className="relative py-24 bg-[radial-gradient(ellipse_70%_60%_at_20%_35%,rgba(37,99,235,0.12)_0%,transparent_70%),#080E1A]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 text-text-label text-xs uppercase tracking-widest mb-4">
              <button onClick={() => onNavigate('home')} className="hover:text-blue-primary">Home</button>
              <ChevronRight size={12} /><span>Suspension</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6">Front End & Suspension</h1>
            <p className="text-blue-primary font-bold text-xl mb-8">{service.tagline}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-card overflow-hidden border border-border-subtle shadow-2xl h-[400px]">
            <img src={service.heroImage} alt="Suspension" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
        </div>
      </section>

      {/* Sub-nav strip */}
      <div className="hidden lg:block bg-bg-dark border-y border-border-subtle sticky top-20 z-40 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-3 min-w-max">
          {SUSPENSION_SUBPAGES.map(s => (
            <button key={s.id} onClick={() => onNavigate(s.id)}
              className="py-2 px-4 rounded-full text-xs font-bold bg-bg-icon text-text-muted hover:text-white hover:bg-blue-primary transition-all">
              {s.title}
            </button>
          ))}
        </div>
      </div>

      <section className="bg-bg-dark py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl mb-8">Complete Suspension Services</h2>
            <p className="text-lg">{service.longDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUSPENSION_SUBPAGES.map((s, idx) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }} viewport={{ once: true }}
                onClick={() => onNavigate(s.id)} className="card cursor-pointer group">
                <h3 className="text-xl mb-3 group-hover:text-blue-primary transition-colors">{s.title}</h3>
                <p className="text-sm mb-4">{s.tagline}</p>
                <span className="text-blue-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">Learn More <ArrowRight size={14} /></span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-primary py-16 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl mb-8 text-white">Suspension problems? We'll fix it right.</h2>
          <button onClick={() => onNavigate('contact')} className="bg-white text-blue-primary font-bold py-4 px-10 rounded-btn hover:bg-white/90 transition-colors text-lg">
            Call {BUSINESS_INFO.phone}
          </button>
        </div>
      </section>
    </div>
  );
};

// --- General Repair Category Page ---

const GeneralRepairPage = ({ onNavigate }: { onNavigate: (id: PageId) => void }) => {
  const service = SERVICES.find(s => s.id === 'general-repair')!;
  return (
    <div className="pt-20">
      <section className="relative py-24 bg-[radial-gradient(ellipse_70%_60%_at_20%_35%,rgba(37,99,235,0.12)_0%,transparent_70%),#080E1A]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 text-text-label text-xs uppercase tracking-widest mb-4">
              <button onClick={() => onNavigate('home')} className="hover:text-blue-primary">Home</button>
              <ChevronRight size={12} /><span>General Repair</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6">General Auto Repair</h1>
            <p className="text-blue-primary font-bold text-xl mb-8">{service.tagline}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-card overflow-hidden border border-border-subtle shadow-2xl h-[400px]">
            <img src={service.heroImage} alt="General Repair" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
        </div>
      </section>

      {/* Sub-nav strip */}
      <div className="hidden lg:block bg-bg-dark border-y border-border-subtle sticky top-20 z-40 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-3 min-w-max">
          {GENERAL_REPAIR_SUBPAGES.map(s => (
            <button key={s.id} onClick={() => onNavigate(s.id)}
              className="py-2 px-4 rounded-full text-xs font-bold bg-bg-icon text-text-muted hover:text-white hover:bg-blue-primary transition-all">
              {s.title}
            </button>
          ))}
        </div>
      </div>

      <section className="bg-bg-dark py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl mb-8">Complete Auto Repair in Alexandria</h2>
            <p className="text-lg">{service.longDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GENERAL_REPAIR_SUBPAGES.map((s, idx) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} viewport={{ once: true }}
                onClick={() => onNavigate(s.id)} className="card cursor-pointer group">
                <h3 className="text-xl mb-3 group-hover:text-blue-primary transition-colors">{s.title}</h3>
                <p className="text-sm mb-4">{s.tagline}</p>
                <span className="text-blue-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">Learn More <ArrowRight size={14} /></span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-primary py-16 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl mb-8 text-white">Need auto repair in Alexandria? We've got you.</h2>
          <button onClick={() => onNavigate('contact')} className="bg-white text-blue-primary font-bold py-4 px-10 rounded-btn hover:bg-white/90 transition-colors text-lg">
            Call {BUSINESS_INFO.phone}
          </button>
        </div>
      </section>
    </div>
  );
};

// --- Sub Service Page (reusable for all individual landing pages) ---

const SubServicePage = ({ sub, onNavigate }: { sub: SubService, onNavigate: (id: PageId) => void }) => {
  const relatedSubs = ALL_SUBPAGES.filter(s => s.categoryId === sub.categoryId && s.id !== sub.id).slice(0, 4);
  return (
    <div className="pt-20">
      <section className="relative py-24 bg-[radial-gradient(ellipse_70%_60%_at_20%_35%,rgba(37,99,235,0.12)_0%,transparent_70%),#080E1A]">
        <div className="max-w-7xl mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 text-text-label text-xs uppercase tracking-widest mb-4">
              <button onClick={() => onNavigate('home')} className="hover:text-blue-primary">Home</button>
              <ChevronRight size={12} />
              <button onClick={() => onNavigate(sub.categoryId)} className="hover:text-blue-primary">{sub.category}</button>
              <ChevronRight size={12} />
              <span>{sub.title}</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6">{sub.title}</h1>
            <p className="text-blue-primary font-bold text-xl mb-8">{sub.tagline}</p>
            <p className="text-xl text-white/80 mb-6">Alexandria & Central Louisiana · National Transmission</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-bg-dark py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl mb-8">{sub.title} in Alexandria, LA</h2>
            <p className="text-lg mb-8 leading-relaxed">{sub.longDesc}</p>
            <h3 className="text-2xl mb-6">What We Do</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {sub.checklist.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white">
                  <CheckCircle2 className="text-blue-primary shrink-0" size={20} />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Why National Transmission */}
            <div className="card border-blue-primary/20 mb-8">
              <h3 className="text-2xl mb-6">Why Choose National Transmission?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: '3-Year Nationwide Warranty', color: 'text-accent-green' },
                  { icon: Zap, label: '1–3 Day Turnaround', color: 'text-accent-blue' },
                  { icon: Users, label: 'Family-Owned, 20+ Years', color: 'text-accent-teal' },
                  { icon: Wrench, label: 'Certified & Licensed', color: 'text-accent-orange' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon className={item.color} size={20} />
                    <span className="text-white font-semibold text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card bg-blue-primary border-blue-primary text-center">
              <h3 className="text-2xl text-white font-black mb-3">Free Estimate</h3>
              <p className="text-white/80 mb-6 text-sm">Call us or submit a request — we'll get back to you fast.</p>
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="bg-white text-blue-primary font-bold py-3 px-6 rounded-btn hover:bg-white/90 transition-colors flex items-center justify-center gap-2 mb-3">
                <Phone size={18} /> {BUSINESS_INFO.phone}
              </a>
              <button onClick={() => onNavigate('contact')} className="bg-white/20 text-white font-bold py-3 px-6 rounded-btn hover:bg-white/30 transition-colors w-full">
                Request Online
              </button>
            </div>

            {relatedSubs.length > 0 && (
              <div className="card">
                <h4 className="text-lg font-bold text-white mb-4">Related {sub.category} Services</h4>
                <ul className="space-y-2">
                  {relatedSubs.map(s => (
                    <li key={s.id}>
                      <button onClick={() => onNavigate(s.id)} className="text-text-muted hover:text-blue-primary transition-colors text-sm flex items-center gap-2">
                        <ChevronRight size={12} />{s.title}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button onClick={() => onNavigate(sub.categoryId)} className="text-blue-primary font-bold text-sm flex items-center gap-1 mt-2 hover:gap-2 transition-all">
                      View All {sub.category} <ArrowRight size={14} />
                    </button>
                  </li>
                </ul>
              </div>
            )}

            <div className="card">
              <h4 className="text-lg font-bold text-white mb-4">Visit Us</h4>
              <div className="space-y-3">
                <div className="flex gap-3"><MapPin className="text-blue-primary shrink-0" size={18} /><span className="text-text-muted text-sm">{BUSINESS_INFO.address}</span></div>
                <div className="flex gap-3"><Clock className="text-blue-primary shrink-0" size={18} /><span className="text-text-muted text-sm">{BUSINESS_INFO.hours}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Remanned Page ---

const RemannedPage = ({ onNavigate }: { onNavigate: (id: PageId) => void }) => (
  <div className="pt-20">
    <section className="py-24 bg-[radial-gradient(ellipse_70%_60%_at_20%_35%,rgba(37,99,235,0.12)_0%,transparent_70%),#080E1A] text-center">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl mb-6">Remanned vs. Rebuilt</h1>
        <p className="text-blue-primary font-bold text-2xl">Understanding the difference — and why it matters.</p>
      </div>
    </section>
    <section className="bg-bg-dark py-24">
      <div className="max-w-3xl mx-auto px-6 text-center mb-20">
        <h2 className="text-4xl mb-8">Know What You&apos;re Paying For</h2>
        <p className="text-lg">Many people are confused about the difference between remanufactured and rebuilt. Rebuilding replaces only the parts that failed. Remanufacturing is far more involved — every component with potential wear is replaced, and known model-specific failure points are addressed proactively. The unit is restored beyond factory-new specifications. This is what National Transmission does. And we back it with a 3-Year Nationwide Warranty.</p>
      </div>
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        <div className="card">
          <span className="inline-block bg-bg-icon text-text-label text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded-full mb-6">REBUILT</span>
          <h3 className="text-2xl mb-6">What Rebuilt Means</h3>
          <ul className="space-y-4">
            {["Only failed parts replaced","Worn components may remain","Model-specific weak points ignored","Shorter lifespan", "No comprehensive warranty"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-text-muted"><span className="w-1.5 h-1.5 bg-text-label rounded-full"></span>{item}</li>
            ))}
          </ul>
        </div>
        <div className="card border-blue-primary shadow-[0_0_40px_rgba(37,99,235,0.12)]">
          <span className="inline-block bg-blue-primary text-white text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded-full mb-6">OUR STANDARD</span>
          <h3 className="text-2xl mb-6">What We Do</h3>
          <ul className="space-y-4">
            {["Every wear component replaced","Restored beyond factory specifications","Known failure points proactively addressed","Maximum reliability and longevity","3-Year Nationwide Unlimited Mileage Warranty"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white"><CheckCircle2 className="text-blue-primary" size={18} />{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-bg-deepest py-20 text-center border-y border-border-subtle">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 italic">"We remanufacture. And we do it to the highest of standards."</h2>
          <p className="text-text-label uppercase tracking-widest font-bold">— National Transmission · Alexandria, Louisiana</p>
        </div>
      </div>
      <div className="text-center py-20">
        <button onClick={() => onNavigate('contact')} className="btn-primary text-lg py-5 px-12">Get a Free Estimate <ArrowRight size={24} /></button>
      </div>
    </section>
  </div>
);

// --- Warranty Page ---

const WarrantyPage = ({ onNavigate }: { onNavigate: (id: PageId) => void }) => (
  <div className="pt-20">
    <section className="py-24 bg-bg-deepest text-center">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl mb-6">Our Nationwide Warranty</h1>
        <p className="text-blue-primary font-bold text-2xl">3 Years. Unlimited Miles. Honored Anywhere.</p>
      </div>
    </section>
    <section className="bg-bg-dark py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[{ val: '3 Year', label: 'Nationwide Warranty' },{ val: 'Unlimited', label: 'Mileage Guarantee' },{ val: '1–3 Day', label: 'Service Turnaround' }].map((stat, i) => (
            <div key={i} className="card border-blue-primary/30 text-center">
              <span className="block text-5xl font-black text-blue-primary mb-2">{stat.val}</span>
              <span className="text-text-muted font-bold uppercase tracking-widest text-xs">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl mb-8">Built to Last. Backed to Prove It.</h2>
            <p className="text-lg mb-6">Our warranty reflects our confidence in our craftsmanship. Because we remanufacture beyond factory spec — addressing known failure points, replacing every wear component, and using precision engineering — we can stand behind a warranty that most shops can't offer.</p>
            <p className="mb-8">Both our engines and transmissions are backed by a Nationwide 3-Year, Unlimited Mileage Warranty, honored anywhere in the country.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Outstanding 3-Year Warranty","Unlimited Mileage","Honored Nationwide","1–3 Day Turnaround","All Makes & Models","Certified & Licensed","20+ Years Experience","Excellent Customer Service"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white"><CheckCircle2 className="text-blue-primary" size={20} /><span className="font-bold text-sm">{item}</span></div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <img src={IMAGES.warrantyBadge} alt="Warranty Badge" className="max-w-[280px] drop-shadow-2xl" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </section>
    <section className="bg-blue-primary py-16 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl mb-8 text-white">Questions about our warranty?</h2>
        <button onClick={() => onNavigate('contact')} className="bg-white text-blue-primary font-bold py-4 px-10 rounded-btn hover:bg-white/90 transition-colors text-lg">Call {BUSINESS_INFO.phone}</button>
      </div>
    </section>
  </div>
);

// --- Contact Page ---

const ContactPage = () => (
  <div className="pt-20">
    <section className="py-24 bg-bg-deepest text-center">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl mb-6">Contact Us</h1>
        <p className="text-blue-primary font-bold text-2xl">Get a free estimate. We’ll take care of you.</p>
      </div>
    </section>
    <section className="bg-bg-dark py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="card flex flex-col justify-between">
          <div>
            <h3 className="text-3xl mb-8">Get In Touch</h3>
            <div className="space-y-8">
              <div>
                <span className="eyebrow">Phone</span>
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-4xl md:text-5xl font-black text-white hover:text-blue-primary transition-colors">{BUSINESS_INFO.phone}</a>
                <a href={`sms:${BUSINESS_INFO.phoneRaw}`} className="block mt-2 text-blue-primary font-bold hover:underline">Text Us at {BUSINESS_INFO.phone}</a>
              </div>
              <div className="flex gap-4"><Mail className="text-blue-primary" size={24} /><div><span className="eyebrow">Email</span><span className="text-white font-bold text-lg break-all">{BUSINESS_INFO.email}</span></div></div>
              <div className="flex gap-4"><Clock className="text-blue-primary" size={24} /><div><span className="eyebrow">Hours</span><span className="text-white font-bold text-lg">{BUSINESS_INFO.hours}</span></div></div>
              <div className="flex gap-4"><MapPin className="text-blue-primary" size={24} /><div><span className="eyebrow">Address</span><span className="text-white font-bold text-lg">{BUSINESS_INFO.address}</span></div></div>
            </div>
          </div>
          <div className="mt-12 pt-12 border-t border-border-subtle flex flex-wrap gap-4">
            <a href={BUSINESS_INFO.maps} target="_blank" rel="noopener noreferrer" className="btn-primary">Get Directions</a>
            <a href={BUSINESS_INFO.facebook} target="_blank" rel="noopener noreferrer" className="btn-outline">Facebook</a>
          </div>
        </div>
        <div className="card">
          <h3 className="text-3xl mb-8">Free Estimate Request</h3>
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
);

// --- App Root ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.substring(1);
      const id = (path === '' ? 'home' : path) as PageId;
      const validPages: PageId[] = [
        'home', 'transmission', 'exhaust', 'suspension', 'brakes', 'remanned', 'warranty', 'contact',
        'general-repair',
        'suspension-tie-rod', 'suspension-ball-joints', 'suspension-struts', 'suspension-control-arms',
        'suspension-wheel-alignment', 'suspension-wheel-bearings', 'suspension-power-steering',
        'suspension-cv-axle', 'suspension-sway-bar',
        'repair-diagnostics', 'repair-ac', 'repair-heating', 'repair-brakes-full', 'repair-oil-change',
        'repair-battery', 'repair-alternator', 'repair-starter', 'repair-radiator', 'repair-fuel-system',
        'repair-timing-belt', 'repair-truck-service',
        'catalytic-replacement', 'catalytic-repair', 'exhaust-leak-repair', 'muffler-service', 'o2-sensor'
      ];
      if (validPages.includes(id)) {
        setCurrentPage(id);
      } else {
        setCurrentPage('home');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (id: PageId) => {
    setCurrentPage(id);
    const path = id === 'home' ? '/' : `/${id}`;
    window.history.pushState(null, '', path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const renderPage = () => {
    // Check sub-pages first
    const sub = ALL_SUBPAGES.find(s => s.id === currentPage);
    if (sub) return <SubServicePage sub={sub} onNavigate={handleNavigate} />;

    // Category pages
    if (currentPage === 'transmission') return <TransmissionCategoryPage onNavigate={handleNavigate} />;
    if (currentPage === 'suspension') return <SuspensionCategoryPage onNavigate={handleNavigate} />;
    if (currentPage === 'general-repair') return <GeneralRepairPage onNavigate={handleNavigate} />;

    // Generic service pages (exhaust, brakes)
    const service = SERVICES.find(s => s.id === currentPage);
    if (service) return <ServicePage service={service} onNavigate={handleNavigate} />;

    switch (currentPage) {
      case 'home': return <HomePage onNavigate={handleNavigate} />;
      case 'remanned': return <RemannedPage onNavigate={handleNavigate} />;
      case 'warranty': return <WarrantyPage onNavigate={handleNavigate} />;
      case 'contact': return <ContactPage />;
      default: return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div key={currentPage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
