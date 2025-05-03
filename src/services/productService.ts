
export interface Product {
  id: string;
  name: string;
  category: 'fruit' | 'vegetable';
  price: number;
  image: string;
  description: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  inStock: boolean;
  rating: number;
  featured?: boolean;
}

// Mock products data
const products: Product[] = [
  {
    id: '1',
    name: 'Fresh Apples',
    category: 'fruit',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop',
    description: 'Sweet and crunchy apples freshly picked from local orchards.',
    nutrition: {
      calories: 95,
      protein: 0.5,
      carbs: 25,
      fat: 0.3,
      fiber: 4.4,
    },
    inStock: true,
    rating: 4.8,
    featured: true,
  },
  {
    id: '2',
    name: 'Organic Bananas',
    category: 'fruit',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop',
    description: 'Perfectly ripened organic bananas rich in potassium and natural sweetness.',
    nutrition: {
      calories: 105,
      protein: 1.3,
      carbs: 27,
      fat: 0.4,
      fiber: 3.1,
    },
    inStock: true,
    rating: 4.5,
  },
  {
    id: '3',
    name: 'Fresh Broccoli',
    category: 'vegetable',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=600&auto=format&fit=crop',
    description: 'Farm-fresh broccoli florets packed with vitamins and minerals.',
    nutrition: {
      calories: 55,
      protein: 3.7,
      carbs: 11.2,
      fat: 0.6,
      fiber: 5.1,
    },
    inStock: true,
    rating: 4.3,
  },
  {
    id: '4',
    name: 'Ripe Strawberries',
    category: 'fruit',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop',
    description: 'Juicy and sweet strawberries hand-picked at peak ripeness.',
    nutrition: {
      calories: 32,
      protein: 0.7,
      carbs: 7.7,
      fat: 0.3,
      fiber: 2.0,
    },
    inStock: true,
    rating: 4.9,
    featured: true,
  },
  {
    id: '5',
    name: 'Fresh Spinach',
    category: 'vegetable',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop',
    description: 'Nutrient-rich spinach leaves, perfect for salads and cooking.',
    nutrition: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      fiber: 2.2,
    },
    inStock: true,
    rating: 4.7,
  },
  {
    id: '6',
    name: 'Juicy Oranges',
    category: 'fruit',
    price: 3.29,
    image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&auto=format&fit=crop',
    description: 'Sweet and tangy oranges bursting with vitamin C.',
    nutrition: {
      calories: 62,
      protein: 1.2,
      carbs: 15.4,
      fat: 0.2,
      fiber: 3.1,
    },
    inStock: true,
    rating: 4.6,
  },
  {
    id: '7',
    name: 'Fresh Carrots',
    category: 'vegetable',
    price: 1.79,
    image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=600&auto=format&fit=crop',
    description: 'Crunchy, sweet carrots perfect for snacking or cooking.',
    nutrition: {
      calories: 41,
      protein: 0.9,
      carbs: 9.6,
      fat: 0.2,
      fiber: 2.8,
    },
    inStock: true,
    rating: 4.4,
    featured: true,
  },
  {
    id: '8',
    name: 'Ripe Avocados',
    category: 'fruit',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1551198297-094dd136d3e9?w=600&auto=format&fit=crop',
    description: 'Perfectly ripened avocados with creamy texture and rich flavor.',
    nutrition: {
      calories: 160,
      protein: 2,
      carbs: 8.5,
      fat: 14.7,
      fiber: 6.7,
    },
    inStock: true,
    rating: 4.8,
  },
  {
    id: '9',
    name: 'Fresh Tomatoes',
    category: 'vegetable',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1592924357228-91b9e1c9a471?w=600&auto=format&fit=crop',
    description: 'Vine-ripened tomatoes with perfect sweetness and acidity.',
    nutrition: {
      calories: 22,
      protein: 1.1,
      carbs: 4.8,
      fat: 0.2,
      fiber: 1.5,
    },
    inStock: true,
    rating: 4.5,
  },
  {
    id: '10',
    name: 'Sweet Grapes',
    category: 'fruit',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop',
    description: 'Juicy and sweet seedless grapes, perfect for snacking.',
    nutrition: {
      calories: 69,
      protein: 0.7,
      carbs: 18.1,
      fat: 0.2,
      fiber: 0.9,
    },
    inStock: true,
    rating: 4.7,
    featured: true,
  },
  {
    id: '11',
    name: 'Bell Peppers',
    category: 'vegetable',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop',
    description: 'Colorful bell peppers, crisp and sweet, great for cooking or raw.',
    nutrition: {
      calories: 31,
      protein: 1,
      carbs: 7.6,
      fat: 0.3,
      fiber: 2.5,
    },
    inStock: true,
    rating: 4.4,
  },
  {
    id: '12',
    name: 'Fresh Blueberries',
    category: 'fruit',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&auto=format&fit=crop',
    description: 'Antioxidant-rich blueberries, sweet and perfect for snacking.',
    nutrition: {
      calories: 57,
      protein: 0.7,
      carbs: 14.5,
      fat: 0.3,
      fiber: 2.4,
    },
    inStock: true,
    rating: 4.9,
  },
];

export const getProducts = (): Product[] => {
  return products;
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: 'fruit' | 'vegetable'): Product[] => {
  return products.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};
