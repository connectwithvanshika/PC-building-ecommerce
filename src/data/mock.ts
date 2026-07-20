import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "p-1",
    name: "Nebula X9 Gaming Desktop",
    description: "High-performance prebuilt gaming PC featuring the latest RTX 4090 and Intel Core i9.",
    price: 3499.99,
    originalPrice: 3899.99,
    brand: "CustomBuilds",
    category: "Desktops",
    images: [
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      Processor: "Intel Core i9-14900K",
      Graphics: "NVIDIA GeForce RTX 4090",
      Memory: "64GB DDR5-6000",
      Storage: "2TB NVMe M.2 SSD",
    },
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
  },
  {
    id: "p-2",
    name: "Razer Blade 16",
    description: "The ultimate gaming laptop with a dual-mode Mini-LED display.",
    price: 2699.99,
    brand: "Razer",
    category: "Laptops",
    images: [
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      Processor: "Intel Core i9-13950HX",
      Graphics: "NVIDIA GeForce RTX 4080",
      Memory: "32GB DDR5",
      Storage: "1TB NVMe SSD",
    },
    rating: 4.9,
    reviews: 89,
    inStock: true,
    featured: true,
    newArrival: true,
  },
  {
    id: "p-3",
    name: "Samsung 990 PRO 2TB",
    description: "Blazing fast PCIe 4.0 NVMe M.2 SSD for gaming and high-performance computing.",
    price: 169.99,
    originalPrice: 199.99,
    brand: "Samsung",
    category: "Storage",
    images: [
      "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      Capacity: "2TB",
      Interface: "PCIe Gen 4.0 x4",
      "Read Speed": "Up to 7450 MB/s",
      "Write Speed": "Up to 6900 MB/s",
    },
    rating: 4.9,
    reviews: 432,
    inStock: true,
  },
  {
    id: "p-4",
    name: "ASUS ROG Strix GeForce RTX 4080",
    description: "Elite cooling and performance for the most demanding gamers.",
    price: 1399.99,
    brand: "ASUS",
    category: "Components",
    images: [
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      Chipset: "NVIDIA RTX 4080",
      Memory: "16GB GDDR6X",
      "Boost Clock": "2535 MHz",
      Cooling: "Triple Fan",
    },
    rating: 4.7,
    reviews: 56,
    inStock: false,
    newArrival: true,
  },
  {
    id: "p-5",
    name: "Logitech G Pro X Superlight",
    description: "Ultra-lightweight wireless gaming mouse designed for esports professionals.",
    price: 149.99,
    brand: "Logitech G",
    category: "Peripherals",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      Sensor: "HERO 25K",
      Weight: "< 63g",
      Battery: "Up to 70 hours",
      Connectivity: "LIGHTSPEED Wireless",
    },
    rating: 4.8,
    reviews: 890,
    inStock: true,
    featured: true,
  },
  {
    id: "p-6",
    name: "Keychron Q1 Pro Mechanical Keyboard",
    description: "Custom wireless mechanical keyboard with a full aluminum body.",
    price: 199.00,
    brand: "Keychron",
    category: "Peripherals",
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      Layout: "75%",
      Switches: "K Pro Banana",
      Connectivity: "Bluetooth 5.1 / Type-C",
      Material: "CNC Aluminum",
    },
    rating: 4.6,
    reviews: 120,
    inStock: true,
  },
  {
    id: "p-7",
    name: "Alienware 34 Curved QD-OLED",
    description: "Immersive curved gaming monitor with infinite contrast and vivid colors.",
    price: 999.99,
    originalPrice: 1099.99,
    brand: "Alienware",
    category: "Monitors",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      Size: "34 inches",
      Resolution: "3440 x 1440",
      "Refresh Rate": "175Hz",
      "Panel Type": "QD-OLED",
    },
    rating: 4.9,
    reviews: 215,
    inStock: true,
    featured: true,
  },
  {
    id: "p-8",
    name: "Corsair RM850x PSU",
    description: "850 Watt 80 PLUS Gold fully modular ATX power supply.",
    price: 129.99,
    brand: "Corsair",
    category: "Components",
    images: [
      "https://images.unsplash.com/photo-1587202372588-4228399eebe9?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      Wattage: "850W",
      Efficiency: "80 PLUS Gold",
      Modularity: "Fully Modular",
      Fan: "135mm Magnetic Levitation",
    },
    rating: 4.8,
    reviews: 650,
    inStock: true,
  }
];

export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getNewArrivals = () => products.filter(p => p.newArrival);
export const getProductsByCategory = (category: string) => products.filter(p => p.category === category);
export const getProductById = (id: string) => products.find(p => p.id === id);
