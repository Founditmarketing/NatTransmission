import { Cog, Shield, Zap, Users, Wrench, Car, Gauge, ExternalLink, Phone, Mail, Clock, MapPin, Facebook, ChevronRight, Menu, X, Star } from 'lucide-react';

export const BUSINESS_INFO = {
  name: "National Transmission",
  phone: "(318) 445-2244",
  phoneRaw: "3184452244",
  email: "Hr@nattireauto.com",
  address: "1521 MacArthur Dr., Alexandria, LA",
  hours: "Mon–Fri 8am–5pm",
  facebook: "https://www.facebook.com/NationalTransmissionLLC",
  maps: "https://www.google.com/maps/dir//national+transmission/@31.283333,-92.5077791,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x863ab527a006aaab:0xc735f4da20dcf669!2m2!1d-92.4727595!2d31.2832644",
  sisterSite: "https://nattireauto.com"
};

export const IMAGES = {
  logo: "https://nattransmission.com/wp-content/uploads/2022/07/National-Transmission2.gif",
  warrantyBadge: "https://nattransmission.com/wp-content/uploads/2022/07/National-Transmission-04.png",
  shop: [
    "https://nattransmission.com/wp-content/uploads/2022/06/DSC_0519.jpeg",
    "/Car images/Open hood car.png",
    "/Car images/Wheel with brakes.png",
    "/Car images/Car.png",
    "/Car images/brakes.png"
  ],
  service: {
    transmission: "/Car images/Open hood car.png",
    engine: "/Car images/Car.png",
    exhaust: "/Car images/Wheel with brakes.png",
    suspension: "/Car images/brakes.png"
  }
};

export type PageId = 'home' | 'transmission' | 'exhaust' | 'suspension' | 'brakes' | 'remanned' | 'warranty' | 'contact';

export interface Service {
  id: PageId;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: any;
  accentColor: string;
  heroImage: string;
  detailImage: string;
  tagline: string;
  checklist: string[];
}

export const SERVICES: Service[] = [
  {
    id: 'transmission',
    title: "Remanufactured Transmissions",
    shortDesc: "Expert 1–3 day turnaround. We remanufacture every component to factory spec — not simply rebuild.",
    longDesc: "At National Transmission, we take great pride in our remanufacturing services. We do much more than rebuild — we remanufacture, which brings the component as close to factory-new as possible. We handle all transmission models in the US and also perform remanufactured engines.",
    icon: Cog,
    accentColor: "text-accent-orange",
    heroImage: "https://nattransmission.com/wp-content/uploads/2022/06/DSC_0525.jpeg",
    detailImage: "https://nattransmission.com/wp-content/uploads/2022/06/DSC_0519.jpeg",
    tagline: "All models. All makes. 1–3 day turnaround.",
    checklist: [
      "All Transmission Models in the US",
      "Remanufactured Engines Available",
      "1–3 Day Transmission Turnaround",
      "1–3 Day Engine Turnaround",
      "All Makes & Models",
      "Certified & Licensed",
      "20+ Years Experience",
      "Excellent Customer Service"
    ]
  },
  {
    id: 'exhaust',
    title: "Exhaust & Catalytic Converters",
    shortDesc: "Factory original and aftermarket exhaust services. Catalytic converter replacement and repair.",
    longDesc: "We provide high-quality exhaust and catalytic converter services using the best equipment and the most qualified technicians. We make repairs on factory original systems as well as aftermarket name-brand mufflers.",
    icon: Gauge,
    accentColor: "text-accent-blue",
    heroImage: "/Car images/Exhaust pipes II.png",
    detailImage: "/Car images/Exhaust pipes.png",
    tagline: "Factory original systems and aftermarket installs.",
    checklist: [
      "Catalytic Converter Replacement & Repair",
      "Exhaust System Diagnosis & Repair",
      "Factory & Aftermarket Muffler Services",
      "All Makes & Models",
      "Certified & Licensed",
      "20+ Years Experience"
    ]
  },
  {
    id: 'suspension',
    title: "Front End & Suspension",
    shortDesc: "Front-end assembly, steering, suspension, and alignment for all makes and models.",
    longDesc: "The steering assembly steers the vehicle while the suspension absorbs the imperfections of the road. We service and repair front-end assemblies, suspension systems, and vehicle alignment.",
    icon: Car,
    accentColor: "text-accent-teal",
    heroImage: "/Car images/Guy working on Suspension 2.png",
    detailImage: "/Car images/Suspension.png",
    tagline: "Steering, suspension, and alignment — done right.",
    checklist: [
      "Front-End Assembly Service & Repair",
      "Suspension Diagnosis & Repair",
      "Vehicle Alignment",
      "All Makes & Models",
      "20+ Years Experience",
      "Certified & Licensed",
      "Excellent Customer Service"
    ]
  },
  {
    id: 'brakes',
    title: "Brake Inspection & Repair",
    shortDesc: "Complete brake inspection and repair. Pads, rotors, fluid — all makes and models.",
    longDesc: "Your brakes are your vehicle's most critical safety system. We offer comprehensive brake inspection and repair for all makes and models. Whether you hear squealing or feel a soft pedal, our certified technicians get you back on the road safely.",
    icon: Shield,
    accentColor: "text-accent-green",
    heroImage: "/Car images/Wheel with brakes.png",
    detailImage: "/Car images/brakes.png",
    tagline: "Safety you can count on. All makes and models.",
    checklist: [
      "Brake Inspection for All Makes & Models",
      "Brake Pad Replacement",
      "Rotor Resurfacing & Replacement",
      "Brake Fluid Service",
      "Certified & Licensed",
      "20+ Years Experience"
    ]
  }
];
