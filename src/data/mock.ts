import { Product } from "@/types";

const brands = ["NVIDIA", "Intel", "AMD", "Samsung", "Corsair", "Razer", "ASUS", "Logitech", "WD", "Seagate", "MSI", "Gigabyte"];
const descriptors = ["Pro", "Elite", "Ultra", "Max", "Extreme", "X", "Plus", "Gaming", "Creator", "Series 9"];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals: number = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateProductsForCategory(category: string, startId: number, count: number = 20): Product[] {
  const products: Product[] = [];
  
  for (let i = 0; i < count; i++) {
    const brand = randomItem(brands);
    const descriptor = randomItem(descriptors);
    const modelNumber = randomInt(1000, 9999);
    
    let name = "";
    let specs: Record<string, string> = {};
    let images: string[] = [];
    let price = 0;
    
    switch (category) {
      case "Desktops":
        name = `${brand} ${descriptor} Desktop PC ${modelNumber}`;
        price = randomInt(899, 4999) + 0.99;
        specs = {
          "Processor": `Intel Core i${randomItem(["7", "9"])}-${randomInt(12000, 14900)}K`,
          "Memory": `${randomItem(["16", "32", "64"])}GB DDR5`,
          "Storage": `${randomItem(["1", "2", "4"])}TB NVMe SSD`,
          "Graphics": `NVIDIA RTX ${randomItem(["4070", "4080", "4090"])}`
        };
        images = [
          `https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80&random=${startId + i}-1`,
          `https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80&random=${startId + i}-2`
        ];
        break;
      case "Laptops":
        name = `${brand} ${descriptor} Book ${randomInt(13, 17)} inch`;
        price = randomInt(799, 3499) + 0.99;
        specs = {
          "Display": `${randomItem(["13", "14", "15", "16", "17"])}-inch ${randomItem(["4K", "QHD", "OLED"])}`,
          "Processor": `AMD Ryzen ${randomItem(["7", "9"])} ${randomInt(6000, 8900)}HS`,
          "Memory": `${randomItem(["16", "32"])}GB LPDDR5`,
          "Weight": `${randomFloat(2.5, 5.5, 1)} lbs`
        };
        images = [
          `https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80&random=${startId + i}-1`,
          `https://images.unsplash.com/photo-1531297172864-fd2221044d4e?w=800&q=80&random=${startId + i}-2`
        ];
        break;
      case "Components":
        name = `${brand} ${descriptor} ${randomItem(["Motherboard", "Graphics Card", "CPU Cooler"])} ${modelNumber}`;
        price = randomInt(149, 1599) + 0.99;
        specs = {
          "Form Factor": randomItem(["ATX", "Micro-ATX", "Mini-ITX", "N/A"]),
          "Socket": randomItem(["AM5", "LGA1700", "N/A"]),
          "RGB": randomItem(["Yes", "No"]),
          "Warranty": "3 Years"
        };
        images = [
          `https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&random=${startId + i}-1`,
          `https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80&random=${startId + i}-2`
        ];
        break;
      case "Peripherals":
        name = `${brand} ${descriptor} ${randomItem(["Mechanical Keyboard", "Wireless Mouse", "Gaming Headset"])}`;
        price = randomInt(49, 299) + 0.99;
        specs = {
          "Connectivity": randomItem(["Wireless 2.4GHz", "Bluetooth", "Wired USB-C"]),
          "Battery Life": `${randomInt(20, 100)} Hours`,
          "Color": randomItem(["Obsidian Black", "Glacier White", "Mercury Silver"])
        };
        images = [
          `https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80&random=${startId + i}-1`,
          `https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80&random=${startId + i}-2`
        ];
        break;
      case "Monitors":
        name = `${brand} ${descriptor} ${randomItem(["Gaming", "Creator", "Ultrawide"])} Monitor ${randomInt(24, 49)}"`;
        price = randomInt(199, 1299) + 0.99;
        specs = {
          "Resolution": randomItem(["1920x1080", "2560x1440", "3840x2160", "5120x1440"]),
          "Refresh Rate": `${randomItem(["60", "144", "165", "240", "360"])}Hz`,
          "Panel Type": randomItem(["IPS", "VA", "OLED", "Mini-LED"]),
          "Response Time": "1ms"
        };
        images = [
          `https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80&random=${startId + i}-1`,
          `https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=800&q=80&random=${startId + i}-2`
        ];
        break;
      case "Storage":
        name = `${brand} ${descriptor} ${randomItem(["NVMe SSD", "SATA SSD", "External HDD"])} ${randomItem(["1TB", "2TB", "4TB", "8TB"])}`;
        price = randomInt(59, 499) + 0.99;
        specs = {
          "Capacity": randomItem(["1TB", "2TB", "4TB", "8TB"]),
          "Interface": randomItem(["PCIe 4.0 x4", "PCIe 5.0 x4", "USB 3.2 Gen 2", "SATA III"]),
          "Read Speed": `Up to ${randomInt(500, 14000)} MB/s`,
          "Write Speed": `Up to ${randomInt(450, 12000)} MB/s`
        };
        images = [
          `https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=800&q=80&random=${startId + i}-1`,
          `https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80&random=${startId + i}-2`
        ];
        break;
    }
    
    products.push({
      id: `prod-${category.toLowerCase()}-${startId + i}`,
      name,
      brand,
      category,
      price,
      originalPrice: Math.random() > 0.7 ? price + randomInt(50, 300) : undefined,
      description: `Experience uncompromising performance with the ${name}. Engineered for the most demanding workloads and powered by the latest innovations from ${brand}, this ${category.toLowerCase()} delivers exceptional reliability, speed, and efficiency.`,
      specs,
      images,
      rating: randomFloat(3.5, 5.0, 1),
      reviews: randomInt(12, 1450),
      inStock: Math.random() > 0.1,
      featured: i < 2, // First 2 of each category are featured
      newArrival: i >= 2 && i < 4 // 3rd and 4th are new arrivals
    });
  }
  
  return products;
}

export const products: Product[] = [
  ...generateProductsForCategory("Desktops", 1000),
  ...generateProductsForCategory("Laptops", 2000),
  ...generateProductsForCategory("Components", 3000),
  ...generateProductsForCategory("Peripherals", 4000),
  ...generateProductsForCategory("Monitors", 5000),
  ...generateProductsForCategory("Storage", 6000),
];

export function getFeaturedProducts() {
  return products.filter((p) => p.featured).slice(0, 8);
}

export function getNewArrivals() {
  return products.filter((p) => p.newArrival).slice(0, 8);
}

export function getProductsByCategory(category: string) {
  if (category === "all") return products;
  return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

// Generate filter options dynamically based on all products
export const brandsList = Array.from(new Set(products.map(p => p.brand))).sort();
