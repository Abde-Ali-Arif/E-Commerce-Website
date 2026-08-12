export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 4999,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 7999,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Footwear",
    price: 3499,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 4,
    name: "Classic T-Shirt",
    category: "Apparel",
    price: 999,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    id: 5,
    name: "Leather Backpack",
    category: "Accessories",
    price: 2999,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
  },
  {
    id: 6,
    name: "Gaming Keyboard",
    category: "Electronics",
    price: 5499,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
  },
  {
    id: 7,
    name: "Denim Jacket",
    category: "Apparel",
    price: 2499,
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
  },
  {
    id: 8,
    name: "Casual Sneakers",
    category: "Footwear",
    price: 2799,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
  },
];