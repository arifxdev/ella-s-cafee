export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'cake' | 'coffee' | 'pastry' | 'special';
  tagline: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  bgColor: string;
  accentColor: string;
  btnColor: string;
  calories?: string;
  allergens?: string[];
  pairing?: string;
  rating?: number;
  reviewsCount?: number;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
  selectedOption?: string;
}

export interface ReservationData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'conservatory' | 'terrace' | 'espresso-bar';
  notes?: string;
}
