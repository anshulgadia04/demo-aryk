export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badges?: string[];
};

import img1 from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.55_f82027bb.jpg";
import img2 from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.54_8b831021.jpg";
import img3 from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.53_e5916e0a.jpg";
import img4 from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.53_9ec97964.jpg";
import img5 from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.53_21ccdee9.jpg";
import img6 from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.52_9cb19fa4.jpg";

export const products: Product[] = [
  {
    id: 1,
    name: "Ashwagandha Bounce",
    category: "MOISTURISER",
    price: 2700,
    rating: 4.8,
    reviewCount: 1367,
    image: img1,
    badges: ["BESTSELLER", "IN A MINI"],
  },
  {
    id: 2,
    name: "Sandalnut Bloom",
    category: "MOISTURISER",
    price: 2700,
    rating: 4.6,
    reviewCount: 61,
    image: img2,
    badges: ["BESTSELLER"],
  },
  {
    id: 3,
    name: "Gotu Kola",
    category: "TONER SERUM",
    price: 2400,
    rating: 4.7,
    reviewCount: 892,
    image: img3,
    badges: ["BESTSELLER"],
  },
  {
    id: 4,
    name: "Turmeric Brightening",
    category: "FACE MASK",
    price: 1800,
    rating: 4.9,
    reviewCount: 2134,
    image: img4,
    badges: ["BESTSELLER"],
  },
  {
    id: 5,
    name: "Rose Quartz Glow",
    category: "FACE OIL",
    price: 3200,
    rating: 4.5,
    reviewCount: 456,
    image: img5,
  },
  {
    id: 6,
    name: "Vitamin C Serum",
    category: "SERUM",
    price: 2900,
    rating: 4.8,
    reviewCount: 789,
    image: img6,
    badges: ["NEW"],
  },
];


