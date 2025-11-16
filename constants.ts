import { NavLink, Trip, Testimonial, GalleryImage } from './types';

export const WHATSAPP_LINK = "https://wa.me/962799999999"; // Placeholder number
export const INSTAGRAM_LINK = "https://www.instagram.com/actionhike.jo/";

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

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, src: 'https://picsum.photos/seed/gallery1/600/600', altKey: 'gallery_alt1' },
  { id: 2, src: 'https://picsum.photos/seed/gallery2/600/600', altKey: 'gallery_alt2' },
  { id: 3, src: 'https://picsum.photos/seed/gallery3/600/600', altKey: 'gallery_alt3' },
  { id: 4, src: 'https://picsum.photos/seed/gallery4/600/600', altKey: 'gallery_alt4' },
  { id: 5, src: 'https://picsum.photos/seed/gallery5/600/600', altKey: 'gallery_alt5' },
  { id: 6, src: 'https://picsum.photos/seed/gallery6/600/600', altKey: 'gallery_alt6' },
  { id: 7, src: 'https://picsum.photos/seed/gallery7/600/600', altKey: 'gallery_alt7' },
  { id: 8, src: 'https://picsum.photos/seed/gallery8/600/600', altKey: 'gallery_alt8' },
];