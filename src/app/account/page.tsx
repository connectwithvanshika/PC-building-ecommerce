import Link from "next/link";
import { Package, Heart, User, MapPin, CreditCard, ChevronRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const mockOrders = [
  {
    id: "NX-A1B2C3",
    date: "July 15, 2026",
    status: "Delivered",
    total: 3499.99,
    items: [{ name: "Nebula X9 Gaming Desktop", qty: 1 }],
  },
  {
    id: "NX-D4E5F6",
    date: "July 10, 2026",
    status: "Shipped",
    total: 169.99,
    items: [{ name: "Samsung 990 PRO 2TB", qty: 1 }],
  },
];

const statusColor: Record<string, string> = {
  Delivered: "bg-green-500/10 text-green-500",
  Shipped: "bg-blue-500/10 text-blue-500",
  Processing: "bg-yellow-500/10 text-yellow-500",
  Cancelled: "bg-red-500/10 text-red-500",
};

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black tracking-tighter mb-10">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar */}
        <aside className="space-y-1">
          <Link href="/account" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold">
            <Package className="h-4 w-4" /> Orders
          </Link>
          <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium text-muted-foreground">
            <Heart className="h-4 w-4" /> Wishlist
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium text-muted-foreground">
            <User className="h-4 w-4" /> Profile
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium text-muted-foreground">
            <MapPin className="h-4 w-4" /> Addresses
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium text-muted-foreground">
            <CreditCard className="h-4 w-4" /> Payment Methods
          </Link>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Order History</h2>
          </div>
          
          {mockOrders.map(order => (
            <div key={order.id} className="bg-card border rounded-2xl overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-3 border-b">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Order</div>
                    <div className="font-bold">{order.id}</div>
                  </div>
                  <Separator orientation="vertical" className="h-8 hidden sm:block" />
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Date</div>
                    <div className="font-medium">{order.date}</div>
                  </div>
                  <Separator orientation="vertical" className="h-8 hidden sm:block" />
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Total</div>
                    <div className="font-bold">${order.total.toFixed(2)}</div>
                  </div>
                </div>
                <Badge className={`${statusColor[order.status]} self-start sm:self-auto`}>{order.status}</Badge>
              </div>
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  {order.items.map((item, i) => (
                    <p key={i} className="text-sm text-muted-foreground">{item.qty}× {item.name}</p>
                  ))}
                </div>
                <div className="flex gap-2">
                  {order.status === "Shipped" && (
                    <Button variant="outline" size="sm" className="rounded-full gap-1.5">
                      <Truck className="h-4 w-4" /> Track
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="rounded-full gap-1">
                    Details <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
