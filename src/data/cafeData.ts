import { ProductItem } from '../types';

export const FEATURED_CAKES: ProductItem[] = [
  {
    id: 'aatis-pistachio',
    name: 'Aatis',
    subtitle: 'Pistachio Bliss',
    category: 'cake',
    tagline: 'Rich. Nutty. Irresistible.',
    description: 'Slow-steeped Sicilian pistachio sponge layered with whipped mascarpone cream and finished with roasted Iranian emerald pistachio crumbles. A signature Ella favourite.',
    price: 8.50,
    currency: '$',
    image: '/src/assets/images/cake_pistachio_bliss_1791177998979.jpg',
    bgColor: '#E3ECE2', // Pale pistachio tint
    accentColor: '#44634E',
    btnColor: '#1A2F23', // Dark forest green
    calories: '410 kcal',
    allergens: ['Dairy', 'Gluten', 'Pistachio Nuts'],
    pairing: 'Ella Signature Cortado or Flat White',
    rating: 4.9,
    reviewsCount: 184
  },
  {
    id: 'lermi-chocolate',
    name: 'Lermi',
    subtitle: 'Chocolate Dream',
    category: 'cake',
    tagline: 'Decadent. Smooth. Heavenly.',
    description: '70% Valrhona single-origin dark chocolate entremet with a glossy mirror glaze, silky hazelnut praline mousse core, and a hand-tempered chocolate truffle heart.',
    price: 9.00,
    currency: '$',
    image: '/src/assets/images/cake_chocolate_dream_1791178009334.jpg',
    bgColor: '#F6EEE6', // Soft warm caramel/almond tint
    accentColor: '#9C6234',
    btnColor: '#A56C36', // Warm caramel bronze
    calories: '460 kcal',
    allergens: ['Dairy', 'Gluten', 'Soy', 'Tree Nuts'],
    pairing: 'Single-Origin Ethiopian Pour-Over',
    rating: 5.0,
    reviewsCount: 247
  },
  {
    id: 'flitre-berry',
    name: 'Flitre',
    subtitle: 'Berry Delight',
    category: 'cake',
    tagline: 'Fruity. Fresh. Delightful.',
    description: 'Slow-baked Madagascar vanilla bean Basque cheesecake topped with a compote of freshly harvested wild blueberries, tart raspberries, and ruby coulis.',
    price: 9.50,
    currency: '$',
    image: '/src/assets/images/cake_berry_delight_1791178019409.jpg',
    bgColor: '#FAEAEC', // Soft rose pink blush tint
    accentColor: '#A84357',
    btnColor: '#B64A60', // Rose blush crimson
    calories: '380 kcal',
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    pairing: 'Iced Rose Cardamom Latte',
    rating: 4.8,
    reviewsCount: 162
  }
];

export const SPECIAL_BREW: ProductItem = {
  id: 'muil-coffee-special',
  name: 'Müil Coffee',
  subtitle: 'Ella’s Velvet Spanish Roast',
  category: 'coffee',
  tagline: 'Smooth. Bold. Unforgettable.',
  description: 'Our house specialty combines a concentrated double-shot of high-altitude Ethiopian Yirgacheffe espresso with silky condensed milk infusion and hand-textured microfoam, dusted with organic Ceylon cinnamon.',
  price: 6.25,
  currency: '$',
  image: '/src/assets/images/special_signature_latte_1791178030278.jpg',
  bgColor: '#F8F5EE',
  accentColor: '#C38B52',
  btnColor: '#1A2F23',
  calories: '185 kcal',
  allergens: ['Dairy (Oat milk alternative available)'],
  pairing: 'Aatis Pistachio Bliss or Warm Croissant',
  rating: 4.95,
  reviewsCount: 389
};

export const EXTENDED_MENU: ProductItem[] = [
  ...FEATURED_CAKES,
  SPECIAL_BREW,
  {
    id: 'lotus-biscoff-cheesecake',
    name: 'Lotus Biscoff Crown',
    subtitle: 'Caramel Speculoos Delight',
    category: 'cake',
    tagline: 'Spiced. Creamy. Crunch.',
    description: 'Velvety cream cheese whipped with spiced Belgian speculoos cookie butter on a crunchy caramel biscuit crust.',
    price: 8.75,
    currency: '$',
    image: '/src/assets/images/cake_chocolate_dream_1791178009334.jpg',
    bgColor: '#F7EFE6',
    accentColor: '#B36D2A',
    btnColor: '#1A2F23',
    rating: 4.9,
    reviewsCount: 110
  },
  {
    id: 'san-sebastian-basque',
    name: 'San Sebastián Basque',
    subtitle: 'Burnt Basque Cheesecake',
    category: 'cake',
    tagline: 'Caramelized crust, molten heart.',
    description: 'Traditional Spanish high-heat cheesecake with a deeply caramelized exterior and a gooey, molten vanilla custard center.',
    price: 9.00,
    currency: '$',
    image: '/src/assets/images/cake_pistachio_bliss_1791177998979.jpg',
    bgColor: '#F8F5EE',
    accentColor: '#8C5A2B',
    btnColor: '#1A2F23',
    rating: 4.95,
    reviewsCount: 220
  },
  {
    id: 'iced-spanish-latte',
    name: 'Iced Spanish Velvet',
    subtitle: 'Signature Chilled Brew',
    category: 'coffee',
    tagline: 'Cold, sweet, deeply caffeinated.',
    description: 'Chilled ristretto pulled directly over caramelized sweet milk and filtered mountain spring ice.',
    price: 6.50,
    currency: '$',
    image: '/src/assets/images/hero_green_cup_1791177988782.jpg',
    bgColor: '#F4ECE1',
    accentColor: '#A56C36',
    btnColor: '#1A2F23',
    rating: 4.9,
    reviewsCount: 420
  },
  {
    id: 'matcha-velvet-latte',
    name: 'Ceremonial Uji Matcha',
    subtitle: 'Stone-Ground Green Tea',
    category: 'coffee',
    tagline: 'Earthy. Silky. Harmonious.',
    description: 'First-harvest ceremonial grade Uji matcha whisked with warm oat milk and a touch of Madagascar vanilla bean nectar.',
    price: 6.75,
    currency: '$',
    image: '/src/assets/images/hero_green_cup_1791177988782.jpg',
    bgColor: '#E6ECE5',
    accentColor: '#3D5E44',
    btnColor: '#1A2F23',
    rating: 4.85,
    reviewsCount: 95
  }
];

export const CAFE_FEATURES = [
  {
    id: 'ingredients',
    title: 'Finest Ingredients',
    description: 'Sourced from the best coffee farms.',
    icon: 'leaf',
    color: 'dark'
  },
  {
    id: 'brewed',
    title: 'Perfectly Brewed',
    description: 'Expertly roasted for rich flavor.',
    icon: 'coffee',
    color: 'caramel'
  },
  {
    id: 'love',
    title: 'Made with Love',
    description: 'Crafted with passion for you.',
    icon: 'heart',
    color: 'dark'
  }
];

export const TRUST_PILLARS = [
  {
    icon: 'truck',
    title: 'Free Delivery',
    subtitle: 'On orders over $29'
  },
  {
    icon: 'shield',
    title: 'Secure Payment',
    subtitle: '100% secure checkout'
  },
  {
    icon: 'award',
    title: 'Premium Quality',
    subtitle: 'Best coffee, always'
  },
  {
    icon: 'headphones',
    title: '24/7 Support',
    subtitle: 'We’re here for you'
  }
];
