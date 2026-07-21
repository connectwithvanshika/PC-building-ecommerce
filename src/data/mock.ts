import { Product } from "@/types";

const brands = ["NVIDIA", "Intel", "AMD", "Samsung", "Corsair", "Razer", "ASUS", "Logitech", "WD", "Seagate", "MSI", "Gigabyte"];
const descriptors = ["Pro", "Elite", "Ultra", "Max", "Extreme", "X", "Plus", "Gaming", "Creator", "Series 9"];

let seed = 12345;
function random() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function randomInt(min: number, max: number) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals: number = 2) {
  return parseFloat((random() * (max - min) + min).toFixed(decimals));
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(random() * arr.length)];
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
    
    const categoryImagePools: Record<string, string[]> = {
      "Desktops": [
        "1587202372634-32705e3bf49c", "1593640408182-31c70c8268f5", "1587302912306-cf1ed9ed3314", "1603481582583-0f60de6100b8", "1541807084-5c52b6b3adef"
      ],
      "Laptops": [
        "1603302576837-37561b2e2302", "1531297172864-fd2221044d4e", "1593642632823-8f785ba67e45", "1517336714731-489689fd1ca8", "1525547719571-a2d4ac8945e2"
      ],
      "Components": [
        "1518770660439-4636190af475", "1591488320449-011701bb6704", "1555680202-c86f0e12f086", "1625842268584-8f3296236761", "1541604193435-22287d32c2c2"
      ],
      "Peripherals": [
        "1595225476474-87563907a212", "1615663245857-ac93bb7c39e7", "1527864550417-7fd11b4ad181", "1593640495253-23196b27a87f", "1584727637099-2b6a19f2c6ed"
      ],
      "Monitors": [
        "1527443224154-c4a3942d3acf", "1586210579191-33b45e38fa2c", "1551288049-bebda4e38f71", "1616423640778-28d1b53229bd", "1541560052-77ec8bbc37f7"
      ],
      "Storage": [
        "1588508065161-55869bd53314", "1593640408182-31c70c8268f5", "1518770660439-4636190af475", "1625842268584-8f3296236761", "1541604193435-22287d32c2c2"
      ]
    };
    
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
        break;
      case "Peripherals":
        name = `${brand} ${descriptor} ${randomItem(["Mechanical Keyboard", "Wireless Mouse", "Gaming Headset"])}`;
        price = randomInt(49, 299) + 0.99;
        specs = {
          "Connectivity": randomItem(["Wireless 2.4GHz", "Bluetooth", "Wired USB-C"]),
          "Battery Life": `${randomInt(20, 100)} Hours`,
          "Color": randomItem(["Obsidian Black", "Glacier White", "Mercury Silver"])
        };
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
        break;
    }
    
    const pool = categoryImagePools[category] || categoryImagePools["Desktops"];
    const img1 = pool[i % pool.length];
    const img2 = pool[(i + 1) % pool.length];
    images = [
      `https://images.unsplash.com/photo-${img1}?w=800&q=80`,
      `https://images.unsplash.com/photo-${img2}?w=800&q=80`
    ];
    
    products.push({
      id: `prod-${category.toLowerCase()}-${startId + i}`,
      name,
      brand,
      category,
      price,
      originalPrice: random() > 0.7 ? price + randomInt(50, 300) : undefined,
      description: `Experience uncompromising performance with the ${name}. Engineered for the most demanding workloads and powered by the latest innovations from ${brand}, this ${category.toLowerCase()} delivers exceptional reliability, speed, and efficiency.`,
      specs,
      images,
      rating: randomFloat(3.5, 5.0, 1),
      reviews: randomInt(12, 1450),
      inStock: random() > 0.1,
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
