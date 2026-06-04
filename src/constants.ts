import { Cog, Shield, Car, Gauge, Wrench } from 'lucide-react';

export const BUSINESS_INFO = {
  name: "National Transmission",
  phone: "(318) 445-2244",
  phoneRaw: "3184452244",
  email: "nationaltransmission1521@gmail.com",
  address: "1521 MacArthur Dr., Alexandria, LA",
  hours: "Mon\u2013Fri 8am\u20135pm",
  facebook: "https://www.facebook.com/NationalTransmissionLLC",
  maps: "https://www.google.com/maps/dir//national+transmission/@31.283333,-92.5077791,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x863ab527a006aaab:0xc735f4da20dcf669!2m2!1d-92.4727595!2d31.2832644",
  sisterSite: "https://nattireauto.com"
};

export const IMAGES = {
  logo: "/Car images/National-Transmission2.gif",
  warrantyBadge: "/Car images/Wheel with brakes.png",
  shop: [
    "/Car images/Guy working on Suspension 2.png",
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

export type PageId =
  | 'home' | 'transmission' | 'exhaust' | 'suspension' | 'brakes' | 'remanned' | 'warranty' | 'contact'
  | 'general-repair'
  | 'suspension-tie-rod' | 'suspension-ball-joints' | 'suspension-struts' | 'suspension-control-arms'
  | 'suspension-wheel-alignment' | 'suspension-wheel-bearings' | 'suspension-power-steering'
  | 'suspension-cv-axle' | 'suspension-sway-bar'
  | 'repair-diagnostics' | 'repair-ac' | 'repair-heating' | 'repair-brakes-full' | 'repair-oil-change'
  | 'repair-battery' | 'repair-alternator' | 'repair-starter' | 'repair-radiator' | 'repair-fuel-system'
  | 'repair-timing-belt' | 'repair-truck-service'
  | 'catalytic-replacement' | 'catalytic-repair' | 'exhaust-leak-repair' | 'muffler-service' | 'o2-sensor';

export interface Service {
  id: PageId;
  title: string;
  navLabel?: string;
  shortDesc: string;
  longDesc: string;
  icon: any;
  accentColor: string;
  heroImage: string;
  detailImage: string;
  tagline: string;
  checklist: string[];
}

export interface SubService {
  id: PageId;
  title: string;
  category: string;
  categoryId: PageId;
  tagline: string;
  longDesc: string;
  checklist: string[];
}

export const SERVICES: Service[] = [
  {
    id: "transmission",
    title: "Remanufactured Transmissions",
    shortDesc: "Expert 1\u20133 day turnaround. We remanufacture every component beyond factory spec \u2014 not simply rebuild.",
    longDesc: "At National Transmission, we don\u2019t just rebuild \u2014 we remanufacture. Every wear component is replaced and restored beyond factory specifications using precision engineering that exceeds OEM baselines. We address known model-specific failure points proactively: pump wear, soft-part degradation, solenoid pack issues, and more. This is why our transmissions outlast ordinary rebuilds and why we back every unit with a 3-Year Nationwide Unlimited Mileage Warranty. We service all transmission models in the US for all makes and models.",
    icon: Cog,
    accentColor: "text-accent-orange",
    heroImage: "/Car images/Car.png",
    detailImage: "/Car images/Open hood car.png",
    tagline: "Built Beyond Factory. Backed for 3 Years.",
    checklist: [
      "All Transmission Models in the US",
      "Remanufactured Engines Available",
      "1\u20133 Day Transmission Turnaround",
      "Addresses Known Model-Specific Failure Points",
      "Precision Engineering Beyond OEM Standards",
      "3-Year Nationwide Unlimited Mileage Warranty",
      "All Makes & Models",
      "Certified & Licensed",
      "20+ Years Experience",
      "Excellent Customer Service"
    ]
  },
  {
    id: "exhaust",
    title: "Catalytic Converters & Exhaust",
    navLabel: "Catalytic Converters",
    shortDesc: "Expert catalytic converter replacement & repair. Exhaust leak diagnosis and repair. Factory & aftermarket systems.",
    longDesc: "We provide high-quality catalytic converter and exhaust services using the best equipment and most qualified technicians. We specialize in catalytic converter replacement and repair as well as exhaust leak diagnosis and repair. We service factory original systems and aftermarket name-brand mufflers. Note: We focus on repair and leak services \u2014 not custom performance exhaust builds.",
    icon: Gauge,
    accentColor: "text-accent-blue",
    heroImage: "/Car images/Exhaust pipes II.png",
    detailImage: "/Car images/Exhaust pipes.png",
    tagline: "Catalytic converter repair & exhaust leak specialists.",
    checklist: [
      "Catalytic Converter Replacement & Repair",
      "Exhaust Leak Repair",
      "Exhaust System Diagnosis",
      "O2 Sensor Replacement",
      "Muffler Service & Repair",
      "Factory & Aftermarket Systems",
      "All Makes & Models",
      "Certified & Licensed",
      "20+ Years Experience"
    ]
  },
  {
    id: "suspension",
    title: "Front End & Suspension",
    shortDesc: "Front-end assembly, steering, suspension, and alignment for all makes and models.",
    longDesc: "The steering assembly steers the vehicle while the suspension absorbs the imperfections of the road. We service and repair front-end assemblies, suspension systems, and vehicle alignment. From tie rods and ball joints to struts, control arms, and wheel alignment \u2014 our certified technicians restore safe, precise handling for all makes and models.",
    icon: Car,
    accentColor: "text-accent-teal",
    heroImage: "/Car images/Guy working on Suspension 2.png",
    detailImage: "/Car images/Suspension.png",
    tagline: "Steering, suspension, and alignment \u2014 done right.",
    checklist: [
      "Tie Rod Replacement",
      "Ball Joint Replacement",
      "Strut & Shock Service",
      "Control Arm Repair",
      "Wheel Alignment",
      "Wheel Bearing Replacement",
      "Power Steering Service",
      "CV Axle Replacement",
      "All Makes & Models",
      "20+ Years Experience"
    ]
  },
  {
    id: "brakes",
    title: "Brake Inspection & Repair",
    shortDesc: "Complete brake inspection and repair. Pads, rotors, fluid \u2014 all makes and models.",
    longDesc: "Your brakes are your vehicle\u2019s most critical safety system. We offer comprehensive brake inspection and repair for all makes and models. Whether you hear squealing or feel a soft pedal, our certified technicians get you back on the road safely.",
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
      "Caliper Inspection",
      "Certified & Licensed",
      "20+ Years Experience"
    ]
  },
  {
    id: "general-repair",
    title: "General Auto Repair",
    shortDesc: "Diagnostics, AC, heating, oil changes, batteries, alternators, and more \u2014 complete auto care in Alexandria.",
    longDesc: "National Transmission is your one-stop shop for all automotive repair needs in Central Louisiana. From check engine light diagnosis to AC repair, heating system service, battery replacement, alternator repair, and routine maintenance \u2014 our certified technicians handle it all for all makes and models including trucks.",
    icon: Wrench,
    accentColor: "text-accent-orange",
    heroImage: "/Car images/Open hood car.png",
    detailImage: "/Car images/Car.png",
    tagline: "Complete auto care. All makes and models.",
    checklist: [
      "Vehicle Diagnostics",
      "AC Repair & Recharge",
      "Heating System Repair",
      "Oil Change & Lube",
      "Battery Replacement",
      "Alternator & Starter Repair",
      "Radiator Flush",
      "Fuel System Service",
      "Timing Belt Replacement",
      "Truck Repair & Service"
    ]
  }
];

export const SUSPENSION_SUBPAGES: SubService[] = [
  { id: "suspension-tie-rod", title: "Tie Rod Replacement", category: "Suspension", categoryId: "suspension", tagline: "Precise steering starts with solid tie rods.", longDesc: "Tie rods connect your steering system to your wheels. Worn tie rods cause vague steering, uneven tire wear, and clunking when turning. We replace inner and outer tie rod ends on all makes and models and always perform a wheel alignment after service to ensure straight tracking.", checklist: ["Inner & Outer Tie Rod Replacement", "Steering System Inspection", "Post-Service Wheel Alignment", "All Makes & Models", "20+ Years Experience"] },
  { id: "suspension-ball-joints", title: "Ball Joint Replacement", category: "Suspension", categoryId: "suspension", tagline: "Keep your wheels connected and your ride smooth.", longDesc: "Ball joints are the pivot points connecting your wheel hubs to the suspension arms. Worn ball joints cause clunking, uneven tire wear, and in severe cases steering failure. We perform thorough ball joint inspections and replacements using quality parts matched to your vehicle.", checklist: ["Upper & Lower Ball Joint Replacement", "Load-Bearing Inspection", "Suspension System Evaluation", "All Makes & Models", "20+ Years Experience"] },
  { id: "suspension-struts", title: "Strut & Shock Replacement", category: "Suspension", categoryId: "suspension", tagline: "Smooth rides depend on healthy struts and shocks.", longDesc: "Worn struts and shocks cause excessive bouncing, longer stopping distances, and poor handling. Our technicians replace struts and shocks with quality components and check alignment after installation to restore safe, comfortable handling.", checklist: ["Strut Assembly Replacement", "Shock Absorber Replacement", "Mount & Spring Inspection", "Post-Service Alignment Check", "All Makes & Models"] },
  { id: "suspension-control-arms", title: "Control Arm Service", category: "Suspension", categoryId: "suspension", tagline: "Your handling depends on control arm integrity.", longDesc: "Control arms link your wheel hub to the frame, guiding wheel movement. Worn bushings or ball joints cause vibrations, pulling, and clunking. We replace control arms and bushings to restore precise handling and extend tire life.", checklist: ["Control Arm Replacement", "Bushing Replacement", "Ball Joint Assessment", "Post-Service Alignment", "All Makes & Models"] },
  { id: "suspension-wheel-alignment", title: "Wheel Alignment Service", category: "Suspension", categoryId: "suspension", tagline: "Straight tracking. Even tire wear. Better fuel economy.", longDesc: "Proper wheel alignment ensures all four wheels point in the correct direction. Misalignment causes uneven tire wear and pulling. Whether from a pothole, suspension work, or gradual drift, our alignment service brings your vehicle back to specification.", checklist: ["4-Wheel Alignment Service", "Camber, Caster & Toe Adjustment", "Tire Wear Analysis", "Pre & Post Measurement Report", "All Makes & Models"] },
  { id: "suspension-wheel-bearings", title: "Wheel Bearing Replacement", category: "Suspension", categoryId: "suspension", tagline: "Eliminate that grinding hum before it gets serious.", longDesc: "A failing wheel bearing produces a grinding or humming noise that changes with vehicle speed. Left untreated, it can lead to wheel separation. We diagnose and replace wheel bearings quickly to prevent further hub or drivetrain damage.", checklist: ["Wheel Bearing Diagnosis", "Hub Assembly Replacement", "Seal & Race Inspection", "Road Test Verification", "All Makes & Models"] },
  { id: "suspension-power-steering", title: "Power Steering Repair", category: "Suspension", categoryId: "suspension", tagline: "Effortless steering, properly maintained.", longDesc: "Stiff steering, a whining pump, or fluid leaks indicate power steering problems. We service both conventional hydraulic and electronically-assisted steering systems, diagnosing and repairing pumps, racks, lines, and fluid systems.", checklist: ["Power Steering Fluid Service", "Pump Inspection & Replacement", "Rack & Pinion Assessment", "Hose & Line Inspection", "All Makes & Models"] },
  { id: "suspension-cv-axle", title: "CV Axle Replacement", category: "Suspension", categoryId: "suspension", tagline: "CV axle failure is a breakdown waiting to happen.", longDesc: "CV axles transfer power to the drive wheels while accommodating suspension movement. A torn CV boot or failed joint causes clicking during turns and vibration under acceleration. We replace CV axles and boots quickly to restore drivetrain integrity.", checklist: ["CV Axle Shaft Replacement", "CV Boot Replacement", "Joint Inspection", "Drivetrain Assessment", "All Makes & Models"] },
  { id: "suspension-sway-bar", title: "Sway Bar Link Replacement", category: "Suspension", categoryId: "suspension", tagline: "Reduce body roll and restore stability.", longDesc: "Sway bar links connect your sway bar to the suspension, reducing body roll during cornering. Worn links cause clunking over bumps and increased lean in turns. Replacement immediately restores stability and ride comfort.", checklist: ["Sway Bar Link Replacement", "End Link Inspection", "Bushing Check", "Suspension System Review", "All Makes & Models"] }
];

export const GENERAL_REPAIR_SUBPAGES: SubService[] = [
  { id: "repair-diagnostics", title: "Vehicle Diagnostics", category: "General Repair", categoryId: "general-repair", tagline: "Don\u2019t guess \u2014 let our technicians read the real story.", longDesc: "A check engine light, ABS warning, or transmission code requires professional scanning and expertise to interpret correctly. Our technicians use state-of-the-art diagnostic tools to pinpoint the exact cause \u2014 not just the symptom \u2014 saving you time and money.", checklist: ["OBD-II Diagnostic Scan", "ABS & Transmission Code Reading", "Electrical System Diagnosis", "Comprehensive Vehicle Inspection", "All Makes & Models"] },
  { id: "repair-ac", title: "Auto AC Repair & Recharge", category: "General Repair", categoryId: "general-repair", tagline: "Louisiana summers demand a fully functioning AC.", longDesc: "In Central Louisiana\u2019s heat, a working AC isn\u2019t a luxury. We diagnose and repair AC problems including refrigerant leaks, failed compressors, clogged condensers, and blower motor failures, and perform AC recharge services.", checklist: ["AC System Diagnostic", "Refrigerant Recharge", "Compressor Inspection & Replacement", "Leak Detection & Repair", "Condenser & Evaporator Service"] },
  { id: "repair-heating", title: "Heating System Repair", category: "General Repair", categoryId: "general-repair", tagline: "Stay comfortable with a properly functioning heater.", longDesc: "Insufficient heat, fogging windshields, coolant loss, or overheating all indicate heating system problems. We service heater cores, thermostats, blower motors, and the entire coolant system to keep you comfortable and your engine protected.", checklist: ["Heater Core Inspection & Replacement", "Thermostat Replacement", "Coolant System Flush", "Blower Motor Service", "Hose & Clamp Inspection"] },
  { id: "repair-brakes-full", title: "Full Brake Service", category: "General Repair", categoryId: "general-repair", tagline: "Your most critical safety system \u2014 serviced right.", longDesc: "Our full brake service covers pads, rotors, calipers, brake fluid, lines, and the master cylinder. Whether you hear squealing or feel a soft pedal, our certified technicians restore your brakes to peak performance.", checklist: ["Full Brake System Inspection", "Brake Pad Replacement", "Rotor Resurfacing & Replacement", "Brake Fluid Flush", "Caliper Inspection"] },
  { id: "repair-oil-change", title: "Oil Change Service", category: "General Repair", categoryId: "general-repair", tagline: "The simplest service. The most important habit.", longDesc: "Regular oil changes are the foundation of engine longevity. We service all vehicles with conventional, synthetic blend, or full synthetic oil to manufacturer specifications, along with filter replacement and a courtesy multi-point inspection.", checklist: ["Conventional & Synthetic Oil Service", "Oil Filter Replacement", "Fluid Level Check", "Tire Pressure Check", "Multi-Point Inspection"] },
  { id: "repair-battery", title: "Car Battery Replacement", category: "General Repair", categoryId: "general-repair", tagline: "Don\u2019t get stranded \u2014 we\u2019ll test and replace your battery.", longDesc: "Slow cranking, warning lights, or a no-start all point to a failing battery. We perform load tests to determine true battery health and replace with quality batteries meeting your vehicle\u2019s specifications, including AGM batteries for modern vehicles.", checklist: ["Battery Load Test & Diagnosis", "Battery Replacement", "Terminal Cleaning & Inspection", "Charging System Check", "Alternator Output Test"] },
  { id: "repair-alternator", title: "Alternator Repair & Replacement", category: "General Repair", categoryId: "general-repair", tagline: "Keep your electrical system charged and running.", longDesc: "A failing alternator causes battery drain, dimming lights, and eventually a no-start condition. We diagnose alternator output with precision equipment and replace with quality remanufactured or OEM units.", checklist: ["Alternator Output Testing", "Belt & Drive System Inspection", "Alternator Replacement", "Battery Charge Verification", "Electrical System Check"] },
  { id: "repair-starter", title: "Starter Replacement", category: "General Repair", categoryId: "general-repair", tagline: "When your engine won\u2019t crank, the starter is usually to blame.", longDesc: "Clicking when turning the key, grinding noises, or intermittent starts indicate a failing starter. We diagnose and replace starters quickly to minimize your downtime and get you back on the road.", checklist: ["Starter System Diagnosis", "Starter Motor Replacement", "Solenoid Inspection", "Ground & Connection Check", "Flywheel Ring Gear Assessment"] },
  { id: "repair-radiator", title: "Radiator Flush & Repair", category: "General Repair", categoryId: "general-repair", tagline: "Prevent overheating before it causes engine damage.", longDesc: "Coolant flushes remove rust and degraded fluid that causes corrosion and overheating. We also inspect and repair radiators, hoses, water pumps, and thermostats to keep your engine at the correct operating temperature \u2014 especially critical in Louisiana\u2019s heat.", checklist: ["Coolant System Flush & Fill", "Radiator Inspection & Repair", "Water Pump Assessment", "Hose & Clamp Inspection", "Thermostat Check"] },
  { id: "repair-fuel-system", title: "Fuel System Service", category: "General Repair", categoryId: "general-repair", tagline: "Clean fuel systems mean better performance and economy.", longDesc: "Over time, fuel injectors, lines, and filters accumulate deposits reducing performance and fuel economy. We perform comprehensive fuel system cleaning and inspection to restore efficiency, power, and smooth operation.", checklist: ["Fuel Injector Cleaning", "Fuel Filter Replacement", "Fuel Pressure Testing", "Throttle Body Service", "Fuel Pump Inspection"] },
  { id: "repair-timing-belt", title: "Timing Belt Replacement", category: "General Repair", categoryId: "general-repair", tagline: "Timing belt failure is catastrophic \u2014 stay ahead of it.", longDesc: "The timing belt synchronizes your crankshaft and camshaft. When it breaks, it can cause severe engine damage. We follow manufacturer replacement intervals and replace the complete kit including tensioners, idler pulleys, and water pump.", checklist: ["Timing Belt Replacement", "Timing Chain Service", "Tensioner & Idler Replacement", "Water Pump Service (combo)", "Valve Timing Verification"] },
  { id: "repair-truck-service", title: "Truck Repair & Service", category: "General Repair", categoryId: "general-repair", tagline: "Specialized truck repair for Alexandria\u2019s hardest-working vehicles.", longDesc: "Trucks are the backbone of Central Louisiana. We service all major truck brands including Ford F-Series, Chevy Silverado/GMC Sierra, RAM, and Toyota Tundra \u2014 providing transmission, suspension, brake, and general repair services tailored to truck-specific demands.", checklist: ["4WD & AWD Service", "Heavy-Duty Transmission Service", "Truck Suspension Repair", "Diesel Engine Services", "Commercial Vehicle Maintenance"] }
];

export const CATALYTIC_SUBPAGES: SubService[] = [
  { id: "catalytic-replacement", title: "Catalytic Converter Replacement", category: "Catalytic Converters", categoryId: "exhaust", tagline: "Fast, professional catalytic converter replacement.", longDesc: "Catalytic converter failure causes failed emissions tests, reduced power, and poor fuel economy. Whether stolen or worn out, National Transmission provides professional replacement with OEM-quality and CARB-compliant converters for all makes and models.", checklist: ["OEM & Aftermarket Cat Replacement", "Emissions System Inspection", "O2 Sensor Check", "All Makes & Models", "Factory & Aftermarket Options"] },
  { id: "catalytic-repair", title: "Catalytic Converter Repair", category: "Catalytic Converters", categoryId: "exhaust", tagline: "Not every catalytic problem requires full replacement.", longDesc: "Some catalytic converter issues stem from related problems \u2014 O2 sensor failure, engine misfires, or exhaust leaks \u2014 rather than a failed converter itself. We diagnose root causes before recommending replacement, potentially saving you significant cost.", checklist: ["Root Cause Diagnosis", "O2 Sensor Replacement", "Related System Inspection", "Converter Function Testing", "Emissions System Repair"] },
  { id: "exhaust-leak-repair", title: "Exhaust Leak Repair", category: "Catalytic Converters", categoryId: "exhaust", tagline: "Exhaust leaks are a health and safety issue \u2014 fix them now.", longDesc: "Exhaust leaks allow toxic carbon monoxide fumes to enter the passenger cabin and cause louder exhaust noise and reduced performance. We locate and repair leaks at manifolds, gaskets, flex pipes, and mid-pipe connections.", checklist: ["Exhaust Leak Detection", "Manifold & Gasket Repair", "Flex Pipe Replacement", "Flange & Seal Repair", "Post-Repair Leak Test"] },
  { id: "muffler-service", title: "Muffler Service & Repair", category: "Catalytic Converters", categoryId: "exhaust", tagline: "Quiet your exhaust and restore proper flow.", longDesc: "A damaged muffler causes excessive noise, vibration, and reduced fuel economy. We service both factory original and aftermarket name-brand muffler systems for all makes and models \u2014 getting your vehicle sounding right.", checklist: ["Muffler Inspection & Replacement", "Factory & Aftermarket Systems", "Resonator Service", "Tailpipe Repair", "Full Exhaust System Assessment"] },
  { id: "o2-sensor", title: "O2 Sensor Replacement", category: "Catalytic Converters", categoryId: "exhaust", tagline: "Oxygen sensors keep your fuel system at peak efficiency.", longDesc: "A failing O2 sensor triggers a check engine light, reduces fuel economy, and can damage the catalytic converter over time. We diagnose which sensor is failing and replace with OEM-spec sensors for all makes and models.", checklist: ["O2 Sensor Diagnostic Scan", "Upstream & Downstream Replacement", "Exhaust System Inspection", "Fuel Trim Analysis", "Check Engine Light Clearance"] }
];

export const ALL_SUBPAGES: SubService[] = [
  ...SUSPENSION_SUBPAGES,
  ...GENERAL_REPAIR_SUBPAGES,
  ...CATALYTIC_SUBPAGES
];
