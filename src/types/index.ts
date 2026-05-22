export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  isVeg: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  priceRange: string;
  isOpen: boolean;
  address: string;
  menuItems: MenuItem[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
