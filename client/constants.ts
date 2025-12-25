import { NavLink, Trip, Testimonial, GalleryImage } from './types';
import img1 from './src/Captured_on_trail/1.jpeg';
import img2 from './src/Captured_on_trail/2.jpeg';
import img3 from './src/Captured_on_trail/3.jpeg';
import img4 from './src/Captured_on_trail/4.jpeg';
import img5 from './src/Captured_on_trail/5.jpeg';
import img6 from './src/Captured_on_trail/6.jpeg';
import img7 from './src/Captured_on_trail/7.jpeg';
import img8 from './src/Captured_on_trail/8.jpeg';
import img9 from './src/Captured_on_trail/9.jpeg';
import img10 from './src/Captured_on_trail/10.jpeg';
import img11 from './src/Captured_on_trail/11.jpeg';
import img12 from './src/Captured_on_trail/12.jpeg';
import vid13 from './src/Captured_on_trail/13.mp4';
import img14 from './src/Captured_on_trail/14.jpeg';
import img15 from './src/Captured_on_trail/15.jpeg';
import img16 from './src/Captured_on_trail/16.jpeg';
import img17 from './src/Captured_on_trail/17.jpeg';
import img18 from './src/Captured_on_trail/18.jpeg';
import vid19 from './src/Captured_on_trail/19.mp4';
import img20 from './src/Captured_on_trail/20.jpeg';
import img21 from './src/Captured_on_trail/21.jpeg';
import img22 from './src/Captured_on_trail/22.jpeg';
import img23 from './src/Captured_on_trail/23.jpeg';
import img24 from './src/Captured_on_trail/24.jpeg';
import img25 from './src/Captured_on_trail/25.jpeg';
import img26 from './src/Captured_on_trail/26.jpeg';

import actionLogo from './src/ActionHikeLogo.jpg';

export const WHATSAPP_LINK = "https://wa.me/962799248785"; // Placeholder number
export const INSTAGRAM_LINK = "https://www.instagram.com/actionhike.jo?igsh=ZW0xdjViOTIweDFq";

export const NAV_LINKS: NavLink[] = [
  { href: '#about', labelKey: 'nav_about' },
  { href: '#trips', labelKey: 'nav_trips' },
  { href: '#gallery', labelKey: 'nav_gallery' },
  { href: '#testimonials', labelKey: 'nav_testimonials' },
  { href: '#contact', labelKey: 'nav_contact' },
];

export const TRIPS_DATA: Trip[] = [
  {
    key: 'wadirum',
    imageUrl: 'https://picsum.photos/seed/wadirum/800/600',
    difficulty: 'Moderate',
  },
  {
    key: 'petra',
    imageUrl: 'https://picsum.photos/seed/petra/800/600',
    difficulty: 'Challenging',
  },
  {
    key: 'dana',
    imageUrl: 'https://picsum.photos/seed/dana/800/600',
    difficulty: 'Challenging',
  },
  {
    key: 'ajloun',
    imageUrl: 'https://picsum.photos/seed/ajloun/800/600',
    difficulty: 'Easy',
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    key: 'testimonial1',
    name: 'Sarah K.',
    location: 'Amman, Jordan',
  },
  {
    key: 'testimonial2',
    name: 'Michael B.',
    location: 'London, UK',
  },
  {
    key: 'testimonial3',
    name: 'Fatima A.',
    location: 'Dubai, UAE',
  },
];

export const actionlogourl = actionLogo;

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, src: img1, altKey: 'gallery_alt1', type: 'image' },
  { id: 2, src: img2, altKey: 'gallery_alt2', type: 'image' },
  { id: 3, src: img3, altKey: 'gallery_alt3', type: 'image' },
  { id: 4, src: img4, altKey: 'gallery_alt4', type: 'image' },
  { id: 5, src: img5, altKey: 'gallery_alt5', type: 'image' },
  { id: 6, src: img6, altKey: 'gallery_alt6', type: 'image' },
  { id: 7, src: img7, altKey: 'gallery_alt7', type: 'image' },
  { id: 8, src: img8, altKey: 'gallery_alt8', type: 'image' },
  { id: 9, src: img9, altKey: 'gallery_alt1', type: 'image' },
  { id: 10, src: img10, altKey: 'gallery_alt2', type: 'image' },
  { id: 11, src: img11, altKey: 'gallery_alt3', type: 'image' },
  { id: 12, src: img12, altKey: 'gallery_alt4', type: 'image' },
  { id: 13, src: vid13, altKey: 'gallery_alt5', type: 'video' },
  { id: 14, src: img14, altKey: 'gallery_alt6', type: 'image' },
  { id: 15, src: img15, altKey: 'gallery_alt7', type: 'image' },
  { id: 16, src: img16, altKey: 'gallery_alt8', type: 'image' },
  { id: 17, src: img17, altKey: 'gallery_alt1', type: 'image' },
  { id: 18, src: img18, altKey: 'gallery_alt2', type: 'image' },
  { id: 19, src: vid19, altKey: 'gallery_alt3', type: 'video' },
  { id: 20, src: img20, altKey: 'gallery_alt4', type: 'image' },
  { id: 21, src: img21, altKey: 'gallery_alt5', type: 'image' },
  { id: 22, src: img22, altKey: 'gallery_alt6', type: 'image' },
  { id: 23, src: img23, altKey: 'gallery_alt7', type: 'image' },
  { id: 24, src: img24, altKey: 'gallery_alt8', type: 'image' },
  { id: 25, src: img25, altKey: 'gallery_alt1', type: 'image' },
  { id: 26, src: img26, altKey: 'gallery_alt2', type: 'image' },
];