export interface NavLink {
  href: string;
  labelKey: string;
}

export interface Trip {
  _id?: string;
  key?: string;
  imageUrl: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  price?: string;
  link?: string;
  title?: string; // For dynamic additions
  description?: string; // For dynamic additions
}

export interface Testimonial {
  key?: string; // Optional because DB uses _id
  _id?: string;
  name: string;
  location: string;
  message?: string;
  rating?: number;
}

export interface GalleryImage {
  id: number;
  src: string;
  altKey: string;
  type: 'image' | 'video';
}