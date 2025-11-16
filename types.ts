export interface NavLink {
  href: string;
  labelKey: string;
}

export interface Trip {
  key: string;
  imageUrl: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
}

export interface Testimonial {
  key: string;
  name: string;
  location: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  altKey: string;
}