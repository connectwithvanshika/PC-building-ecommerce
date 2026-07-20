import Link from "next/link";
import { Share2, MessageCircle, Camera, Play, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="font-black text-2xl tracking-tighter block mb-6">
              NEXUS<span className="text-primary">TECH</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Premium computer hardware and custom builds for enthusiasts, creators, and professionals.
            </p>
            <div className="flex gap-4 text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors" aria-label="Facebook"><Share2 className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors" aria-label="Twitter"><MessageCircle className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors" aria-label="Instagram"><Camera className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors" aria-label="YouTube"><Play className="h-5 w-5" /></Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Shop</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/category/desktops" className="hover:text-primary transition-colors">Prebuilt PCs</Link></li>
              <li><Link href="/category/laptops" className="hover:text-primary transition-colors">Laptops</Link></li>
              <li><Link href="/category/components" className="hover:text-primary transition-colors">Components</Link></li>
              <li><Link href="/category/peripherals" className="hover:text-primary transition-colors">Peripherals</Link></li>
              <li><Link href="/category/monitors" className="hover:text-primary transition-colors">Monitors</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/warranty" className="hover:text-primary transition-colors">Warranty Information</Link></li>
              <li><Link href="/track-order" className="hover:text-primary transition-colors">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>123 Tech Boulevard, Silicon Valley, CA 94025</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>1-800-NEXUS-PC</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>support@nexustech.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NexusTech. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
