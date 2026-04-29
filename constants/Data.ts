// ── Types ─────────────────────────────────────────────────
export interface Category {
  id: string;
  name: string;
  icon: string;      // MaterialIcons name
  color: string;
  bgColor: string;
  count: string;
  subservices: string[];
}

export interface SubService {
  title: string;
  price: string;
  rating: string;
  reviews: string;
  duration: string;
  img: string;
  tab: string;
  category?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  comment: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  color: string;
}

// ── Categories ─────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  {
    id: 'Electrical',
    name: 'Electrical',
    icon: 'electrical-services',
    color: '#d97706',
    bgColor: '#fef3c7',
    count: '5 Services',
    subservices: ['Visit', 'Switch/socket repair', 'Fan repair/install', 'Light install', 'Wiring issue'],
  },
  {
    id: 'Plumbing',
    name: 'Plumbing',
    icon: 'plumbing',
    color: '#2563eb',
    bgColor: '#dbeafe',
    count: '5 Services',
    subservices: ['Visit charge', 'Tap repair', 'Leakage fix', 'Drain block', 'Motor check'],
  },
  {
    id: 'Cleaning',
    name: 'Cleaning',
    icon: 'cleaning-services',
    color: '#059669',
    bgColor: '#d1fae5',
    count: '5 Services',
    subservices: ['Bathroom cleaning', 'Kitchen deep cleaning', '1BHK full cleaning', '2BHK', '3BHK'],
  },
  {
    id: 'Painting',
    name: 'Painting',
    icon: 'format-paint',
    color: '#e11d48',
    bgColor: '#ffe4e6',
    count: '6 Services',
    subservices: [
      'Interior Wall Painting', 'Exterior / Facade Painting',
      'Ceiling Painting', 'Wood & Furniture Painting',
      'Waterproofing & Texture Coating', 'Wallpaper Installation & Removal',
    ],
  },
  {
    id: 'AC Repair',
    name: 'AC Repair',
    icon: 'ac-unit',
    color: '#0891b2',
    bgColor: '#cffafe',
    count: '4 Services',
    subservices: ['Basic service', 'Deep cleaning', 'Gas refill', 'Installation'],
  },
  {
    id: 'Carpentry',
    name: 'Carpentry',
    icon: 'handyman',
    color: '#7c3aed',
    bgColor: '#ede9fe',
    count: '9 Services',
    subservices: [
      'Door Repair & Installation', 'Window Frame Repair',
      'Kitchen Cabinet Installation & Repair', 'Wardrobe / Closet Assembly',
      'Furniture Assembly & Repair', 'Shelf & Storage Unit Installation',
      'Baseboard & Trim Repair', 'Wood Flooring Installation', 'False Ceiling / POP Work',
    ],
  },
];

// ── Popular Services (Home screen quick tiles) ─────────────
export const POPULAR_SERVICES = [
  { id: 'Electrical', name: 'Electrical',    icon: 'electrical-services' },
  { id: 'Cleaning',   name: 'Deep Cleaning', icon: 'cleaning-services' },
  { id: 'AC Repair',  name: 'AC Servicing',  icon: 'ac-unit' },
  { id: 'Plumbing',   name: 'Plumbing',      icon: 'plumbing' },
];

// ── All Sub-Services ───────────────────────────────────────
export const ALL_SUBSERVICES: Record<string, SubService[]> = {
  Electrical: [
    { title: 'Visit', price: '₹99', rating: '4.8', reviews: '1.2k', duration: '30 mins',
      img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80', tab: 'Consultation' },
    { title: 'Switch/socket repair', price: '₹149', rating: '4.9', reviews: '2.3k', duration: '1 hour',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', tab: 'Repair' },
    { title: 'Fan repair/install', price: '₹199–₹299', rating: '4.8', reviews: '3.1k', duration: '1-2 hours',
      img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80', tab: 'Repair' },
    { title: 'Light install', price: '₹149', rating: '4.7', reviews: '1.8k', duration: '1 hour',
      img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80', tab: 'Installation' },
    { title: 'Wiring issue', price: '₹199–₹399', rating: '4.8', reviews: '920', duration: '2-3 hours',
      img: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&q=80', tab: 'Repair' },
  ],
  Plumbing: [
    { title: 'Visit charge', price: '₹99', rating: '4.8', reviews: '2.5k', duration: '30 mins',
      img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80', tab: 'Consultation' },
    { title: 'Tap repair', price: '₹199', rating: '4.7', reviews: '1.8k', duration: '1 hour',
      img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80', tab: 'Repair' },
    { title: 'Leakage fix', price: '₹299–₹499', rating: '4.8', reviews: '420', duration: '1-2 hours',
      img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', tab: 'Repair' },
    { title: 'Drain block', price: '₹299', rating: '4.9', reviews: '950', duration: '2 hours',
      img: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80', tab: 'Repair' },
    { title: 'Motor check', price: '₹149', rating: '4.8', reviews: '610', duration: '1.5 hours',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', tab: 'Repair' },
  ],
  Cleaning: [
    { title: 'Bathroom cleaning', price: '₹499–₹699', rating: '4.7', reviews: '1.1k', duration: '2 hours',
      img: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=80', tab: 'Deep Cleaning' },
    { title: 'Kitchen deep cleaning', price: '₹999', rating: '4.8', reviews: '850', duration: '3 hours',
      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', tab: 'Deep Cleaning' },
    { title: '1BHK full cleaning', price: '₹1499', rating: '4.9', reviews: '410', duration: '4-5 hours',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', tab: 'Full House' },
    { title: '2BHK', price: '₹1999', rating: '4.9', reviews: '240', duration: '6 hours',
      img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80', tab: 'Full House' },
    { title: '3BHK', price: '₹2499', rating: '4.9', reviews: '180', duration: 'Full Day',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', tab: 'Full House' },
  ],
  Painting: [
    { title: 'Interior Wall Painting', price: '₹9,999', rating: '4.8', reviews: '320', duration: '2-3 Days',
      img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80', tab: 'Full House' },
    { title: 'Exterior Painting', price: '₹14,999', rating: '4.7', reviews: '140', duration: '5 Days',
      img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80', tab: 'Full House' },
    { title: 'Ceiling Painting', price: '₹2,499', rating: '4.6', reviews: '230', duration: '1 Day',
      img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80', tab: 'Stencil' },
    { title: 'Furniture Painting', price: '₹3,299', rating: '4.9', reviews: '180', duration: '2 Days',
      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', tab: 'Stencil' },
    { title: 'Waterproofing', price: '₹6,499', rating: '4.8', reviews: '95', duration: '3 Days',
      img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80', tab: 'Expert' },
    { title: 'Wallpaper Installation', price: '₹1,899', rating: '4.9', reviews: '210', duration: '1 Day',
      img: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80', tab: 'Expert' },
  ],
  'AC Repair': [
    { title: 'Basic service', price: '₹499', rating: '4.8', reviews: '1.2k', duration: '1 hour',
      img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80', tab: 'Servicing' },
    { title: 'Deep cleaning', price: '₹699', rating: '4.7', reviews: '2.4k', duration: '2 hours',
      img: 'https://images.unsplash.com/photo-1631545806609-e5d4c25f6929?w=800&q=80', tab: 'Servicing' },
    { title: 'Gas refill', price: '₹2000–₹3000', rating: '4.9', reviews: '850', duration: '1 hour',
      img: 'https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?w=800&q=80', tab: 'Repair' },
    { title: 'Installation', price: '₹1500–₹2000', rating: '4.8', reviews: '610', duration: '3 hours',
      img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80', tab: 'Installation' },
  ],
  Carpentry: [
    { title: 'Door Repair', price: '₹499', rating: '4.8', reviews: '1.4k', duration: '2 hours',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', tab: 'Repair' },
    { title: 'Window Frame Fix', price: '₹699', rating: '4.7', reviews: '820', duration: '3 hours',
      img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80', tab: 'Repair' },
    { title: 'Cabinet Install', price: '₹4,499', rating: '4.9', reviews: '240', duration: '1 Day',
      img: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&q=80', tab: 'Installation' },
    { title: 'Wardrobe Assembly', price: '₹2,999', rating: '4.8', reviews: '530', duration: '5 hours',
      img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80', tab: 'Installation' },
    { title: 'Furniture Repair', price: '₹899', rating: '4.7', reviews: '1.2k', duration: '2-3 hours',
      img: 'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=800&q=80', tab: 'Repair' },
    { title: 'Shelf Installation', price: '₹1,299', rating: '4.9', reviews: '640', duration: '2 hours',
      img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80', tab: 'Installation' },
    { title: 'Baseboard Repair', price: '₹799', rating: '4.6', reviews: '310', duration: '2 hours',
      img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80', tab: 'Repair' },
    { title: 'Wood Flooring', price: '₹15,999', rating: '4.9', reviews: '110', duration: '3 Days',
      img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80', tab: 'Installation' },
    { title: 'False Ceiling', price: '₹12,499', rating: '5.0', reviews: '85', duration: '4 Days',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', tab: 'Installation' },
  ],
};

// ── Testimonials ───────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1, name: 'Priya Sharma', role: 'Homeowner',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
    comment: 'Homezy has made my life so much easier. The electricians were professional, arrived on time, and did an amazing job!',
  },
  {
    id: 2, name: 'Rahul Verma', role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
    comment: 'I use their deep cleaning services for my office regularly. Efficient and thorough. Highly recommended!',
  },
  {
    id: 3, name: 'Ananya Iyer', role: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 5,
    comment: 'Excellent plumbing service! They fixed a chronic leakage issue others couldn\'t solve. Best home service app in the city.',
  },
  {
    id: 4, name: 'Vikram Singh', role: 'Marketing Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    rating: 5,
    comment: 'The AC repair team was fantastic. Diagnosed the issue within minutes and had it fixed before lunch. Fair pricing!',
  },
  {
    id: 5, name: 'Meera Kapur', role: 'Interior Designer',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    rating: 5,
    comment: 'Homezy\'s carpentry team is top-notch. Their attention to detail on our custom shelves was remarkable.',
  },
];

// ── Offers ─────────────────────────────────────────────────
export const OFFERS: Offer[] = [
  {
    id: 'o1',
    title: 'Flat 20% OFF',
    description: 'On your first booking this month!',
    code: 'FIRST20',
    color: '#3e2a56',
  },
  {
    id: 'o2',
    title: '₹100 Cashback',
    description: 'On electrical services above ₹500',
    code: 'ELEC100',
    color: '#d97706',
  },
];

// ── Service Descriptions ───────────────────────────────────
export const SERVICE_DESCRIPTIONS: Record<string, string> = {
  Electrical: 'Our certified electricians handle everything from diagnostic repairs to full system upgrades. Precision wiring, panel inspections, and modern fixture installations — all backed by a satisfaction guarantee.',
  Plumbing: 'Reliable plumbing solutions for all your home needs. From fixing minor leaks and clogged drains to complete pipe replacements and appliance installations.',
  Cleaning: 'Our comprehensive deep cleaning service covers every corner of your home. We use eco-friendly products to remove tough stains, sanitize surfaces, and leave your space sparkling.',
  Painting: 'Give your home a fresh new look with expert color consultation, surface preparation, and a flawless finish for both interior and exterior walls.',
  'AC Repair': 'Keep your home cool with expert AC servicing. We handle everything from gas refilling and filter cleaning to complex PCB repairs and new installations.',
  Carpentry: 'Expert carpentry for repairs, installations, and furniture assembly. Quality craftsmanship you can count on.',
};

// ── Provider Names ─────────────────────────────────────────
export const PROVIDER_NAMES: Record<string, string> = {
  Cleaning: 'SparkleClean Solutions',
  Electrical: 'VoltMaster Pro',
  Plumbing: 'FlowGuard Plumbing',
  Painting: 'FinishExpert Pro',
  'AC Repair': 'CoolAir Solutions',
  Carpentry: 'WoodCraft Masters',
};
