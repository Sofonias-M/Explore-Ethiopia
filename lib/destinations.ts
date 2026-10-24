export type Destination = {
  id: string;
  name: string;
  slug: string;
  region: string;
  category: "Historical" | "Natural" | "Cultural" | "Adventure";
  description: string;
  imageUrl: string;
  bestTimeToVisit: string;
  duration?: string;
  locationDetail?: string;
  estimatedCost: number;
  rating: number;
  reviews: number;
  gallery?: string[];
};

export const destinations: Destination[] = [
  {
    id: "1",
    name: "Lalibela",
    slug: "lalibela",
    region: "Amhara",
    category: "Historical",
    description:
      "Lalibela is home to one of the most extraordinary architectural wonders in the world — a group of 11 medieval rock-hewn churches, carved directly into the mountainside in the 12th and 13th centuries. It's a UNESCO World Heritage Site and a must-visit for anyone interested in history, culture and spirituality.",
    imageUrl:
      "https://images.unsplash.com/photo-1646647689780-308bd6f4f84d?q=80&w=1170&auto=format&fit=crop",
    bestTimeToVisit: "Oct – Mar",
    duration: "2–3 days",
    locationDetail: "Amhara, Ethiopia",
    estimatedCost: 120,
    rating: 4.9,
    reviews: 124,
    gallery: [
      "https://images.unsplash.com/photo-1646647689780-308bd6f4f84d?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "2",
    name: "Simien Mountains",
    slug: "simien-mountains",
    region: "Amhara",
    category: "Adventure",
    description:
      "Explore dramatic mountain peaks, deep valleys, breathtaking viewpoints, and unique Ethiopian wildlife such as the Gelada baboon and Walia ibex in this stunning national park.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXrJ5cBmoTNQndPEEsXGRJbRgmaaRYITmP4_iywxcfjw&s=10",
    bestTimeToVisit: "Oct – Apr",
    duration: "3–5 days",
    locationDetail: "Amhara, Ethiopia",
    estimatedCost: 180,
    rating: 4.8,
    reviews: 98,
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXrJ5cBmoTNQndPEEsXGRJbRgmaaRYITmP4_iywxcfjw&s=10",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "3",
    name: "Danakil Depression",
    slug: "danakil-depression",
    region: "Afar",
    category: "Natural",
    description:
      "Experience one of the world's most unusual landscapes, with colorful mineral formations, active volcanoes, vast salt flats, and otherworldly geological wonders.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXPWh3tyB8jb_BnC82Y5pNEuOffqLaPNk2g1XubZrilQ&s=10",
    bestTimeToVisit: "Nov – Feb",
    duration: "3–4 days",
    locationDetail: "Afar, Ethiopia",
    estimatedCost: 250,
    rating: 4.7,
    reviews: 76,
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXPWh3tyB8jb_BnC82Y5pNEuOffqLaPNk2g1XubZrilQ&s=10",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "4",
    name: "Gondar",
    slug: "gondar",
    region: "Amhara",
    category: "Historical",
    description:
      "Visit the historic stone castles and royal compounds of Fasil Ghebbi in Gondar, often described as the Camelot of Africa, rich with imperial Ethiopian history.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSTMG3SAUISerllapPqFKR8aS4UyjatrR3ELR9PF3uuw&s=10",
    bestTimeToVisit: "Oct – Mar",
    duration: "1–2 days",
    locationDetail: "Amhara, Ethiopia",
    estimatedCost: 100,
    rating: 4.6,
    reviews: 65,
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSTMG3SAUISerllapPqFKR8aS4UyjatrR3ELR9PF3uuw&s=10",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "5",
    name: "Axum",
    slug: "axum",
    region: "Tigray",
    category: "Cultural",
    description:
      "Explore towering ancient obelisks, subterranean tombs, and the legendary resting place of the Ark of the Covenant in one of Africa's greatest ancient empires.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3dQrS6TQKxouiZOoytYgvPHs6TALEe907_-JHVOc-Eg&s=10",
    bestTimeToVisit: "Oct – Mar",
    duration: "1–2 days",
    locationDetail: "Tigray, Ethiopia",
    estimatedCost: 90,
    rating: 4.5,
    reviews: 52,
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3dQrS6TQKxouiZOoytYgvPHs6TALEe907_-JHVOc-Eg&s=10",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "6",
    name: "Bahir Dar",
    slug: "bahir-dar",
    region: "Amhara",
    category: "Natural",
    description:
      "Enjoy the palm-fringed shores of Lake Tana, ancient island monasteries with centuries-old wall paintings, and excursions to the majestic Blue Nile Falls.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIPi3DJ3Uc5ijAen8uNDeoNstLDUtLjt-mI_vv9_3LjA&s=10",
    bestTimeToVisit: "Oct – Mar",
    duration: "2 days",
    locationDetail: "Amhara, Ethiopia",
    estimatedCost: 85,
    rating: 4.4,
    reviews: 48,
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIPi3DJ3Uc5ijAen8uNDeoNstLDUtLjt-mI_vv9_3LjA&s=10",
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

export const categories = [
  "All",
  "Historical",
  "Natural",
  "Cultural",
  "Adventure",
] as const;
