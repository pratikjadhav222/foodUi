import { Restaurant } from '../types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Palace',
    cuisine: 'American • Burgers',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 29,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
    priceRange: '₹200-500',
    isOpen: true,
    address: '12 MG Road, Bangalore',
    menuItems: [
      { id: '1a', name: 'Classic Burger', price: 199, description: 'Juicy patty with lettuce & tomato', category: 'Burgers', isVeg: false },
      { id: '1b', name: 'Veggie Burger', price: 169, description: 'Crispy veggie patty with fresh veggies', category: 'Burgers', isVeg: true },
      { id: '1c', name: 'Cheese Fries', price: 99, description: 'Fries loaded with cheddar cheese', category: 'Sides', isVeg: true },
      { id: '1d', name: 'Oreo Shake', price: 149, description: 'Thick shake blended with Oreo cookies', category: 'Drinks', isVeg: true },
    ],
  },
  {
    id: '2',
    name: 'Pizza Villa',
    cuisine: 'Italian • Pizza',
    rating: 4.3,
    deliveryTime: '30-45 min',
    deliveryFee: 39,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600',
    priceRange: '₹300-700',
    isOpen: true,
    address: '5 Koramangala, Bangalore',
    menuItems: [
      { id: '2a', name: 'Margherita Pizza', price: 299, description: 'Classic tomato base with mozzarella', category: 'Pizza', isVeg: true },
      { id: '2b', name: 'BBQ Chicken Pizza', price: 399, description: 'Smoky BBQ with grilled chicken', category: 'Pizza', isVeg: false },
      { id: '2c', name: 'Garlic Bread', price: 129, description: 'Toasted garlic butter bread with herbs', category: 'Sides', isVeg: true },
    ],
  },
  {
    id: '3',
    name: 'Sushi Zen',
    cuisine: 'Japanese • Sushi',
    rating: 4.7,
    deliveryTime: '40-55 min',
    deliveryFee: 59,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600',
    priceRange: '₹500-1200',
    isOpen: false,
    address: '8 Indiranagar, Bangalore',
    menuItems: [
      { id: '3a', name: 'Salmon Nigiri', price: 349, description: 'Fresh salmon on seasoned rice', category: 'Nigiri', isVeg: false },
      { id: '3b', name: 'Veggie Roll', price: 279, description: 'Avocado & cucumber maki roll', category: 'Rolls', isVeg: true },
    ],
  },
  {
    id: '4',
    name: 'Taco Fiesta',
    cuisine: 'Mexican • Tacos',
    rating: 4.2,
    deliveryTime: '20-30 min',
    deliveryFee: 19,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600',
    priceRange: '₹150-400',
    isOpen: true,
    address: '3 JP Nagar, Bangalore',
    menuItems: [
      { id: '4a', name: 'Chicken Taco', price: 179, description: 'Spiced chicken with salsa & sour cream', category: 'Tacos', isVeg: false },
      { id: '4b', name: 'Bean Burrito', price: 159, description: 'Refried beans with cheese & guacamole', category: 'Burritos', isVeg: true },
      { id: '4c', name: 'Nachos', price: 199, description: 'Crispy nachos with jalapeños & cheese dip', category: 'Sides', isVeg: true },
    ],
  },
];

export const CATEGORIES = ['All', 'Burgers', 'Pizza', 'Sushi', 'Mexican', 'Chinese', 'Indian', 'Desserts'];
