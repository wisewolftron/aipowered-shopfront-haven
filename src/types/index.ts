
export interface ProductType {
  _id: string;
  name: string;
  price: number;
  discount: number;
  rating: number;
  stock: number;
  category: string;
  images: string[];
  shortDescription: string;
  description: string;
  aiDescription: string;
  features: string[];
  reviews: ReviewType[];
  specifications: Record<string, string>;
  createdAt: string;
  quantity?: number; // Add optional quantity property for cart items
}

export interface ReviewType {
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful?: number;
  images?: string[];
}

export interface CategoryType {
  id: string;
  name: string;
  slug: string;
  image: string;
  featured?: boolean;
  popular?: boolean;
  new?: boolean;
}

export interface TestimonialType {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}
