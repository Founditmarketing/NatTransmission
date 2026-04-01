/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cog, Shield, Zap, Users, Wrench, Car, Gauge, ExternalLink, 
  Phone, Mail, Clock, MapPin, Facebook, ChevronRight, Menu, X, Star,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { BUSINESS_INFO, IMAGES, SERVICES, PageId, Service } from './constants';

// --- Components ---

const Navbar = ({ onNavigate, currentPage }: { onNavigate: (id: PageId) => void, currentPage: PageId }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'transmission', label: 'Transmission' },
    { id: 'exhaust', label: 'Exhaust' },
    { id: 'suspension', label: 'Suspension' },
    { id: 'brakes', label: 'Brakes' },
    { id: 'remanned', label: 'Remanned vs Rebuild' },
    { id: 'warranty', label: 'Warranty' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-dark/95 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-3 group">
          <img src={IMAGES.logo} alt="National Transmission" className="h-10 md:h-12" referrerPolicy="no-referrer" />
          <div className="hidden sm:block text-left">
            <span className="block text-white font-black text-lg leading-none group-hover:text-blue-primary transition-colors">NATIONAL</span>
            <span className="block text-blue-primary font-bold text-xs tracking-widest uppercase">Transmission</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, 7).map(link => (
            <button 
              key={link.id} 
              onClick={() => onNavigate(link.id as PageId)}
              className={`text-sm font-semibold transition-colors hover:text-blue-primary ${currentPage === link.id ? 'text-blue-primary' : 'text-text-white'}`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => onNavigate('contact')}
            className="btn-primary py-2.5 px-5 text-sm"
          >
            Free Estimate <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-bg-deepest z-[60] flex flex-col p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12 shrink-0">
              <img src={IMAGES.logo} alt="Logo" className="h-10" referrerPolicy="no-referrer" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2 hover:bg-bg-icon rounded-full transition-colors">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.slice(0, 7).map(link => (
                <button 
                  key={link.id} 
                  onClick={() => { onNavigate(link.id as PageId); setIsMobileMenuOpen(false); }}
                  className={`text-2xl font-bold text-left transition-colors ${currentPage === link.id ? 'text-blue-primary' : 'text-white hover:text-blue-primary'}`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-6 border-t border-border-subtle mt-2">
                <button 
                  onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }}
                  className="btn-primary w-full justify-center py-4 text-lg"
                >
                  Free Estimate <ArrowRight size={24} />
                </button>
                <a 
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="btn-outline w-full justify-center py-4 text-lg mt-4"
                >
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
            <li><button onClick={() => onNavigate('home')} className="text-text-muted hover:text-blue-primary transition-colors">Home</button></li>
            <li><button onClick={() => onNavigate('remanned')} className="text-text-muted hover:text-blue-primary transition-colors">Remanned vs Rebuild</button></li>
            <li><button onClick={() => onNavigate('warranty')} className="text-text-muted hover:text-blue-primary transition-colors">Our Warranty</button></li>
            <li><button onClick={() => onNavigate('contact')} className="text-text-muted hover:text-blue-primary transition-colors">Contact Us</button></li>
          </ul>
        </div>

        <div>
          <span className="eyebrow">Services</span>
          <ul className="space-y-3">
            {SERVICES.map(s => (
              <li key={s.id}><button onClick={() => onNavigate(s.id)} className="text-text-muted hover:text-blue-primary transition-colors">{s.title}</button></li>
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

const ContactForm = () => {
  return (
    <form action={`mailto:${BUSINESS_INFO.email}`} method="POST" encType="text/plain" className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" name="Name" placeholder="Your Name" required className="input-field" />
        <input type="tel" name="Phone" placeholder="Phone Number" required className="input-field" />
      </div>
      <input type="email" name="Email" placeholder="Email Address" required className="input-field" />
      <select name="Service" required className="input-field">
        <option value="">Select Service</option>
        <option value="transmission">Transmission</option>
        <option value="exhaust">Exhaust</option>
        <option value="suspension">Front End & Suspension</option>
        <option value="brakes">Brakes</option>
        <option value="other">Other</option>
      </select>
      <textarea name="Message" placeholder="How can we help?" rows={4} className="input-field"></textarea>
      <button type="submit" className="btn-primary w-full justify-center">
        Send Estimate Request <ArrowRight size={20} />
      </button>
    </form>
  );
};

// --- Page Sections ---

const HeroSparks = () => {
  const sparks = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 2.5 + Math.random() * 3,
    size: 1 + Math.random() * 2.5,
    opacity: 0.3 + Math.random() * 0.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {sparks.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            bottom: '-5%',
            width: s.size,
            height: s.size,
            background: `radial-gradient(circle, rgba(245,158,11,${s.opacity}) 0%, rgba(37,99,235,${s.opacity * 0.5}) 100%)`,
            boxShadow: `0 0 ${s.size * 3}px rgba(245,158,11,${s.opacity * 0.6})`,
          }}
          animate={{
            y: [0, -window.innerHeight * 1.2],
            x: [0, (Math.random() - 0.5) * 80],
            opacity: [0, s.opacity, s.opacity, 0],
            scale: [0.5, 1, 1, 0.3],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};

/**
 * Meshed Gears — Chunky Rounded Design
 * Gear ratio: 8:6 = 4:3, Large 10s CW, Small 7.5s CCW
 */
const generateSoftGearPath = (cx: number, cy: number, teeth: number, outerR: number, rootR: number): string => {
  const step = (Math.PI * 2) / teeth;
  const tipFrac = 0.30;
  const gapFrac = 0.30;
  const riseFrac = (1 - tipFrac - gapFrac) / 2;
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const base = i * step;
    const gapEnd = base + gapFrac * step;
    const tipStart = gapEnd + riseFrac * step;
    const tipEnd = tipStart + tipFrac * step;
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
  const largeTeeth = 8;
  const smallTeeth = 6;
  const largeOuterR = 320;
  const largeRootR = 250;
  const largeHubR = 160;
  const smallOuterR = 200;
  const smallRootR = 155;
  const smallHubR = 100;

  // Center distance — widened so teeth slot INTO gaps, not overlap
  const centerDist = 480;
  const largePeriod = 6;
  const smallPeriod = largePeriod * (smallTeeth / largeTeeth);
  const smallPhaseOffset = 180 / smallTeeth;
  // Mesh delay = half a tooth pitch in time — keeps teeth in gaps at any speed
  const meshDelay = largePeriod / (largeTeeth * 2);

  const svgW = 1000;
  const svgH = 1050;
  const largeCx = 740;
  const largeCy = 680;
  const meshAngle = -108 * (Math.PI / 180);
  const smallCx = largeCx + centerDist * Math.cos(meshAngle);
  const smallCy = largeCy + centerDist * Math.sin(meshAngle);

  return (
    <div className="absolute bottom-[-200px] right-[-400px] z-[4] pointer-events-none hidden md:block"
      style={{ width: svgW, height: svgH }}>
      <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="opacity-[0.15]">
        <defs>
          <filter id="gear-glow-soft">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g filter="url(#gear-glow-soft)">
          <g className="gear-large-v2" style={{ transformOrigin: `${largeCx}px ${largeCy}px` }}>
            <path d={generateSoftGearPath(largeCx, largeCy, largeTeeth, largeOuterR, largeRootR)}
              fill="#2563EB" stroke="#93C5FD" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx={largeCx} cy={largeCy} r={largeRootR - 8} fill="#1E40AF" stroke="#93C5FD" strokeWidth="0.5" />
            <circle cx={largeCx} cy={largeCy} r={largeHubR} fill="#080E1A" stroke="#60A5FA" strokeWidth="2" />
            {Array.from({ length: 5 }, (_, i) => {
              const rad = (i * 72) * Math.PI / 180;
              return (
                <line key={i} x1={largeCx + 168 * Math.cos(rad)} y1={largeCy + 168 * Math.sin(rad)}
                  x2={largeCx + 230 * Math.cos(rad)} y2={largeCy + 230 * Math.sin(rad)}
                  stroke="#60A5FA" strokeWidth="6" strokeLinecap="round" opacity="0.4" />
              );
            })}
            <circle cx={largeCx} cy={largeCy} r={20} fill="#1E40AF" stroke="#60A5FA" strokeWidth="2" />
            <circle cx={largeCx} cy={largeCy} r={8} fill="#2563EB" />
          </g>
        </g>

        <g filter="url(#gear-glow-soft)">
          <g className="gear-small-v2" style={{ transformOrigin: `${smallCx}px ${smallCy}px` }}>
            <path d={generateSoftGearPath(smallCx, smallCy, smallTeeth, smallOuterR, smallRootR)}
              fill="#2563EB" stroke="#93C5FD" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx={smallCx} cy={smallCy} r={smallRootR - 6} fill="#1E40AF" stroke="#93C5FD" strokeWidth="0.5" />
            <circle cx={smallCx} cy={smallCy} r={smallHubR} fill="#080E1A" stroke="#60A5FA" strokeWidth="2" />
            {Array.from({ length: 3 }, (_, i) => {
              const rad = (i * 120) * Math.PI / 180;
              return (
                <line key={i} x1={smallCx + 106 * Math.cos(rad)} y1={smallCy + 106 * Math.sin(rad)}
                  x2={smallCx + 141 * Math.cos(rad)} y2={smallCy + 141 * Math.sin(rad)}
                  stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" opacity="0.4" />
              );
            })}
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

const HomePage = ({ onNavigate }: { onNavigate: (id: PageId) => void }) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section — Full-Bleed Cinematic */}
      <section 
        ref={heroRef}
        className="hero-section relative min-h-screen flex items-end overflow-hidden"
      >
        {/* BG Image with parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          animate={{ 
            x: (mousePos.x - 0.5) * -20,
            y: (mousePos.y - 0.5) * -10,
          }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.8 }}
        >
          <div 
            className="absolute inset-[-40px] bg-cover bg-center"
            style={{ backgroundImage: `url('/Car images/Open hood car.png')` }}
          />
        </motion.div>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#080E1A] via-[#080E1A]/80 to-transparent" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#080E1A]/90 via-[#080E1A]/40 to-transparent" />
        <div 
          className="absolute inset-0 z-[2] opacity-30 transition-opacity duration-700"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(37,99,235,0.15), transparent)`,
          }}
        />

        {/* Animated Sparks */}
        <HeroSparks />

        {/* Scan Line Effect */}
        <div className="absolute inset-0 z-[3] pointer-events-none hero-scanlines opacity-[0.03]" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 pb-24 pt-40 w-full">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-[2px] bg-blue-primary" />
              <span className="text-blue-primary font-bold uppercase tracking-[0.2em] text-xs">
                Alexandria, Louisiana · Est. 20+ Years
              </span>
            </motion.div>

            {/* Main Heading — Staggered */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 leading-[0.95] tracking-tight"
            >
              We Don't Just<br />
              Rebuild.
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-[0.95] tracking-tight hero-gradient-text"
            >
              We Remanufacture.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-lg md:text-xl text-white/70 mb-10 max-w-xl leading-relaxed"
            >
              Remanufactured transmissions, engines, exhaust & suspension — backed by a 
              <span className="text-blue-primary font-semibold"> 3-Year Nationwide Unlimited Mileage Warranty</span>. 
              Expert 1–3 day turnaround.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <button 
                onClick={() => onNavigate('contact')} 
                className="hero-cta-primary group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get a Free Estimate 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <a 
                href={`tel:${BUSINESS_INFO.phoneRaw}`} 
                className="btn-outline backdrop-blur-sm border-white/20 hover:border-blue-primary"
              >
                <Phone size={18} /> Call {BUSINESS_INFO.phone}
              </a>
            </motion.div>
          </div>

          {/* Floating Stat Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-wrap gap-4 md:gap-6"
          >
            {[
              { val: '20+', label: 'Years Experience' },
              { val: '3-Year', label: 'Nationwide Warranty' },
              { val: '1–3 Day', label: 'Turnaround' },
              { val: '★ 4.9', label: 'Google Rating' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.1 }}
                className="hero-stat-badge"
              >
                <span className="text-white font-black text-lg">{stat.val}</span>
                <span className="text-white/50 text-[10px] uppercase tracking-widest font-bold">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Meshed Gears — Bottom Right */}
        <MeshedGears />

        {/* Bottom edge fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-dark to-transparent z-10" />
      </section>

      {/* Services Grid */}
      <section className="bg-bg-dark py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="eyebrow">WHAT WE DO</span>
            <h2 className="text-4xl md:text-5xl mb-6">Our Services</h2>
            <p className="max-w-2xl mx-auto">From remanufactured transmissions to exhaust, suspension, and brakes — complete automotive care under one roof in Alexandria.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, idx) => (
              <motion.div 
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                onClick={() => onNavigate(s.id)}
                className="card cursor-pointer group"
              >
                <div className="icon-badge">
                  <s.icon className={`${s.accentColor} group-hover:scale-110 transition-transform`} size={28} />
                </div>
                <h3 className="text-xl mb-4 group-hover:text-blue-primary transition-colors">{s.title}</h3>
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
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight">
              Why the Region Trusts <br />
              <span className="text-blue-primary">National Transmission.</span>
            </h2>
            <p className="text-lg mb-12">We're a family-owned team dedicated to keeping your vehicle running right. We treat every vehicle like our own — with the same exacting standards on every single job.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: Zap, color: 'text-accent-blue', title: '1–3 Day Turnaround', desc: 'Most transmission and engine jobs completed in 1–3 business days. Fast — without cutting corners.' },
                { icon: Wrench, color: 'text-accent-orange', title: 'Remanufactured, Not Rebuilt', desc: "Every wear component replaced and restored to factory spec. That's the National Transmission difference." },
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
                <img src={IMAGES.shop[1]} alt="Shop 1" className="rounded-card border border-border-subtle shadow-xl w-full" referrerPolicy="no-referrer" />
                <div className="bg-bg-card border border-border-subtle p-6 rounded-card shadow-xl">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="relative w-12 h-12">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-bg-icon" />
                        <circle cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="4" strokeDasharray="125.6" strokeDashoffset="2.5" className="text-blue-primary" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">98</span>
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
                <img src={IMAGES.shop[2]} alt="Shop 2" className="rounded-card border border-border-subtle shadow-xl w-full" referrerPolicy="no-referrer" />
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
          <p className="text-blue-primary font-bold text-lg mb-8 uppercase tracking-widest">Know what you're paying for.</p>
          <p className="max-w-2xl mx-auto mb-16">Many shops rebuild — replacing only the failed parts. At National Transmission, we remanufacture. Every component with potential wear is replaced, restoring the unit as close to factory-new as possible.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card text-left">
              <span className="inline-block bg-bg-icon text-text-label text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded-full mb-6">REBUILT</span>
              <h3 className="text-2xl mb-6">What Rebuilt Means</h3>
              <ul className="space-y-4">
                {['Only failed parts replaced', 'Worn components may remain', 'May not restore full performance', 'Shorter lifespan'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-text-muted">
                    <span className="w-1.5 h-1.5 bg-text-label rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card text-left border-blue-primary shadow-[0_0_40px_rgba(37,99,235,0.12)]">
              <span className="inline-block bg-blue-primary text-white text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded-full mb-6">OUR STANDARD</span>
              <h3 className="text-2xl mb-6">What We Do</h3>
              <ul className="space-y-4">
                {['Every wear component replaced', 'Restored to factory specifications', 'Maximum reliability and longevity', 'Backed by 3-Year Nationwide Warranty'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="text-blue-primary" size={18} />
                    {item}
                  </li>
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
            <div className="md:border-r border-white/20">
              <span className="block text-5xl font-black text-white mb-2">3 Year</span>
              <span className="text-xs uppercase tracking-widest text-white/80">Nationwide Warranty</span>
            </div>
            <div className="md:border-r border-white/20">
              <span className="block text-5xl font-black text-white mb-2">Unlimited</span>
              <span className="text-xs uppercase tracking-widest text-white/80">Mileage Guarantee</span>
            </div>
            <div>
              <span className="block text-5xl font-black text-white mb-2">1–3 Day</span>
              <span className="text-xs uppercase tracking-widest text-white/80">Turnaround</span>
            </div>
          </div>
          <p className="text-center text-white/90 max-w-xl mx-auto mb-10">Both our engines and transmissions are backed by a Nationwide 3-Year, Unlimited Mileage Warranty — all work done to the highest standards.</p>
          <div className="flex justify-center">
            <button onClick={() => onNavigate('warranty')} className="bg-white text-blue-primary font-bold py-4 px-8 rounded-btn hover:bg-white/90 transition-colors">
              View Full Warranty Details <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-bg-dark py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="eyebrow">ABOUT US</span>
            <h2 className="text-4xl md:text-5xl mb-8">Serving Central Louisiana for Over 20 Years</h2>
            <p className="text-lg mb-6">At National Transmission, we remanufacture — not just rebuild. Customer service, satisfaction, and quality are our number one priority. We work on all transmission models in the US for all makes and models.</p>
            <p className="mb-10">In the Pineville area? Visit our sister shop — National Tire & Auto.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex gap-4">
                <Phone className="text-blue-primary" size={20} />
                <div>
                  <span className="block text-[10px] text-text-label uppercase tracking-widest">Phone</span>
                  <span className="text-white font-bold">{BUSINESS_INFO.phone}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="text-blue-primary" size={20} />
                <div>
                  <span className="block text-[10px] text-text-label uppercase tracking-widest">Email</span>
                  <span className="text-white font-bold">{BUSINESS_INFO.email}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="text-blue-primary" size={20} />
                <div>
                  <span className="block text-[10px] text-text-label uppercase tracking-widest">Hours</span>
                  <span className="text-white font-bold">{BUSINESS_INFO.hours}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="text-blue-primary" size={20} />
                <div>
                  <span className="block text-[10px] text-text-label uppercase tracking-widest">Address</span>
                  <span className="text-white font-bold">{BUSINESS_INFO.address}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => onNavigate('contact')} className="btn-primary">Call Now</button>
              <a href={BUSINESS_INFO.maps} target="_blank" rel="noopener noreferrer" className="btn-outline">Get Directions</a>
            </div>
          </div>
          <div className="rounded-card overflow-hidden border border-border-subtle shadow-2xl h-[500px]">
            <img src={IMAGES.shop[4]} alt="Shop" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-bg-deepest py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="eyebrow">CUSTOMER REVIEWS</span>
            <h2 className="text-4xl md:text-5xl mb-4">Trusted by Central Louisiana</h2>
            <p className="text-blue-primary font-bold flex items-center justify-center gap-2">
              <span className="flex text-accent-orange">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </span>
              Excellent · Based on 20+ Reviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Stephen Peters', text: "This business provides the customer service all businesses could learn from. The staff went the extra mile to coordinate a replacement and arranged their schedule to get it done in a timely manner. Excellent service." },
              { name: 'Charlie Mullins', text: "Reliable. Fast. Friendly. Good warranty. Nice waiting room." },
              { name: 'charanda Washington', text: "I had a transmission replacement — very quick and satisfying! The gentlemen were very polite, patient, and professional. I highly recommend their services!" }
            ].map((rev, idx) => (
              <div key={idx} className="card">
                <div className="flex text-accent-orange mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
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

      {/* Sister Site & Contact */}
      <section className="bg-bg-dark py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card border-accent-teal/30 flex flex-col justify-center">
            <div className="icon-badge bg-accent-teal/10">
              <ExternalLink className="text-accent-teal" size={28} />
            </div>
            <h3 className="text-3xl mb-6">Also Visit National Tire & Auto</h3>
            <p className="text-lg mb-8">Looking for tires, brakes, alignments, or suspension in Pineville? Our sister shop has you covered.</p>
            <a href={BUSINESS_INFO.sisterSite} target="_blank" rel="noopener noreferrer" className="btn-primary self-start">
              Visit nattireauto.com <ArrowRight size={20} />
            </a>
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

const ServicePage = ({ service, onNavigate }: { service: Service, onNavigate: (id: PageId) => void }) => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-[radial-gradient(ellipse_70%_60%_at_20%_35%,rgba(37,99,235,0.12)_0%,transparent_70%),#080E1A]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 text-text-label text-xs uppercase tracking-widest mb-4">
              <button onClick={() => onNavigate('home')} className="hover:text-blue-primary">Home</button>
              <ChevronRight size={12} />
              <span>Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6">{service.title}</h1>
            <p className="text-blue-primary font-bold text-xl mb-8">{service.tagline}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-card overflow-hidden border border-border-subtle shadow-2xl h-[400px]">
            <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
        </div>
      </section>

      {/* Sub-nav Strip */}
      <div className="bg-bg-dark border-y border-border-subtle sticky top-20 z-40 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-4 min-w-max">
          {SERVICES.map(s => (
            <button 
              key={s.id} 
              onClick={() => onNavigate(s.id)}
              className={`py-2.5 px-6 rounded-full text-sm font-bold transition-all ${service.id === s.id ? 'bg-blue-primary text-white' : 'bg-bg-icon text-text-muted hover:text-white'}`}
            >
              {s.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
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

      {/* CTA Band */}
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

const RemannedPage = ({ onNavigate }: { onNavigate: (id: PageId) => void }) => {
  return (
    <div className="pt-20">
      <section className="py-24 bg-[radial-gradient(ellipse_70%_60%_at_20%_35%,rgba(37,99,235,0.12)_0%,transparent_70%),#080E1A] text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl mb-6">Remanned vs. Rebuilt</h1>
          <p className="text-blue-primary font-bold text-2xl">Understanding the difference — and why it matters.</p>
        </div>
      </section>

      <section className="bg-bg-dark py-24">
        <div className="max-w-3xl mx-auto px-6 text-center mb-20">
          <h2 className="text-4xl mb-8">Know What You're Paying For</h2>
          <p className="text-lg">Many people are confused about the difference between remanufactured and rebuilt. Rebuilding involves cleaning or replacing only the parts that actually failed. Remanufacturing is much more involved — every component with potential wear is replaced, bringing the unit as close to factory-new as possible. This is what National Transmission does. We remanufacture. And we do it to the highest of standards.</p>
        </div>

        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="card">
            <span className="inline-block bg-bg-icon text-text-label text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded-full mb-6">REBUILT</span>
            <h3 className="text-2xl mb-6">What Rebuilt Means</h3>
            <ul className="space-y-4">
              {['Only failed parts replaced', 'Worn components may remain', 'May not restore full performance', 'Shorter lifespan'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-text-muted">
                  <span className="w-1.5 h-1.5 bg-text-label rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card border-blue-primary shadow-[0_0_40px_rgba(37,99,235,0.12)]">
            <span className="inline-block bg-blue-primary text-white text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded-full mb-6">OUR STANDARD</span>
            <h3 className="text-2xl mb-6">What We Do</h3>
            <ul className="space-y-4">
              {['Every wear component replaced', 'Restored to factory specifications', 'Maximum reliability and longevity', 'Backed by 3-Year Nationwide Warranty'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white">
                  <CheckCircle2 className="text-blue-primary" size={18} />
                  {item}
                </li>
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
          <button onClick={() => onNavigate('contact')} className="btn-primary text-lg py-5 px-12">
            Get a Free Estimate <ArrowRight size={24} />
          </button>
        </div>
      </section>
    </div>
  );
};

const WarrantyPage = ({ onNavigate }: { onNavigate: (id: PageId) => void }) => {
  return (
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
            {[
              { val: '3 Year', label: 'Nationwide Warranty' },
              { val: 'Unlimited', label: 'Mileage Guarantee' },
              { val: '1–3 Day', label: 'Service Turnaround' }
            ].map((stat, i) => (
              <div key={i} className="card border-blue-primary/30 text-center">
                <span className="block text-5xl font-black text-blue-primary mb-2">{stat.val}</span>
                <span className="text-text-muted font-bold uppercase tracking-widest text-xs">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl mb-8">Built to Last. Backed to Prove It.</h2>
              <p className="text-lg mb-8">We work on all transmission models in the U.S. and offer 1–3 day turnaround. Both engines and transmissions are backed by a Nationwide 3-Year, Unlimited Mileage Warranty — honored nationwide.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Outstanding Warranty', 'Extremely Fast Turnaround', '20+ Years Experience', 'All Makes & Models', 'Certified & Licensed', 'Excellent Customer Service'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="text-blue-primary" size={20} />
                    <span className="font-bold">{item}</span>
                  </div>
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
          <button onClick={() => onNavigate('contact')} className="bg-white text-blue-primary font-bold py-4 px-10 rounded-btn hover:bg-white/90 transition-colors text-lg">
            Call {BUSINESS_INFO.phone}
          </button>
        </div>
      </section>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="pt-20">
      <section className="py-24 bg-bg-deepest text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl mb-6">Contact Us</h1>
          <p className="text-blue-primary font-bold text-2xl">Get a free estimate. We'll take care of you.</p>
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
                <div className="flex gap-4">
                  <Mail className="text-blue-primary" size={24} />
                  <div>
                    <span className="eyebrow">Email</span>
                    <span className="text-white font-bold text-lg">{BUSINESS_INFO.email}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="text-blue-primary" size={24} />
                  <div>
                    <span className="eyebrow">Hours</span>
                    <span className="text-white font-bold text-lg">{BUSINESS_INFO.hours}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin className="text-blue-primary" size={24} />
                  <div>
                    <span className="eyebrow">Address</span>
                    <span className="text-white font-bold text-lg">{BUSINESS_INFO.address}</span>
                  </div>
                </div>
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
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  const handleNavigate = (id: PageId) => {
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const renderPage = () => {
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
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
