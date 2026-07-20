"use client";

import { useState } from "react";
import { products as allProducts } from "@/data/mock";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  Plus,
  Pencil,
  Trash2,
  Search,
  DollarSign,
  BarChart3,
} from "lucide-react";

type AdminView = "overview" | "products" | "orders";

const mockOrders = [
  { id: "NX-A1B2C3", customer: "Jane Smith", date: "Jul 15, 2026", status: "Delivered", total: 3499.99 },
  { id: "NX-D4E5F6", customer: "John Doe", date: "Jul 14, 2026", status: "Shipped", total: 169.99 },
  { id: "NX-G7H8I9", customer: "Alice Walker", date: "Jul 13, 2026", status: "Processing", total: 2699.99 },
  { id: "NX-J1K2L3", customer: "Bob Chen", date: "Jul 12, 2026", status: "Delivered", total: 999.99 },
  { id: "NX-M4N5O6", customer: "Sara Kim", date: "Jul 11, 2026", status: "Cancelled", total: 149.99 },
];

const statusColor: Record<string, string> = {
  Delivered: "bg-green-500/10 text-green-500",
  Shipped: "bg-blue-500/10 text-blue-500",
  Processing: "bg-yellow-500/10 text-yellow-500",
  Cancelled: "bg-red-500/10 text-red-500",
};

export default function AdminPage() {
  const [view, setView] = useState<AdminView>("overview");
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [search, setSearch] = useState("");

  const totalRevenue = mockOrders.reduce((s, o) => s + o.total, 0);
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const navItems = [
    { id: "overview" as AdminView, label: "Overview", icon: LayoutDashboard },
    { id: "products" as AdminView, label: "Products", icon: Package },
    { id: "orders" as AdminView, label: "Orders", icon: ShoppingBag },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Admin Sidebar */}
      <aside className="w-60 border-r bg-card flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b">
          <div className="font-black text-lg">Admin Panel</div>
          <div className="text-xs text-muted-foreground mt-1">NexusTech Dashboard</div>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                view === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-background">
        {view === "overview" && (
          <div className="space-y-8">
            <h1 className="text-3xl font-black tracking-tight">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <StatCard icon={DollarSign} label="Total Revenue" value={`$${totalRevenue.toFixed(0)}`} trend="+12.5%" />
              <StatCard icon={ShoppingBag} label="Total Orders" value={`${mockOrders.length}`} trend="+8.2%" />
              <StatCard icon={Package} label="Products" value={`${products.length}`} trend="+2" />
              <StatCard icon={Users} label="Customers" value="1,247" trend="+5.1%" />
            </div>

            {/* Recent Orders */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent Orders</h2>
                <Button variant="outline" size="sm" onClick={() => setView("orders")} className="rounded-full">View All</Button>
              </div>
              <OrdersTable orders={mockOrders.slice(0, 5)} />
            </div>

            {/* Top Products */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Top Products</h2>
                <Button variant="outline" size="sm" onClick={() => setView("products")} className="rounded-full">View All</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.filter(p => p.featured).map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-4 rounded-xl border bg-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-lg object-cover bg-muted" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.category}</p>
                    </div>
                    <span className="font-bold text-sm">${p.price.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-3xl font-black tracking-tight">Products</h1>
              <Button className="rounded-full gap-1.5 self-start">
                <Plus className="h-4 w-4" /> Add Product
              </Button>
            </div>

            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9 h-11"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="border rounded-2xl overflow-hidden bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left px-4 py-3 font-semibold">Product</th>
                      <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Category</th>
                      <th className="text-left px-4 py-3 font-semibold">Price</th>
                      <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Stock</th>
                      <th className="text-left px-4 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p, i) => (
                      <tr key={p.id} className={`border-b last:border-b-0 ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-muted shrink-0" />
                            <span className="font-medium line-clamp-1 max-w-[160px]">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{p.category}</td>
                        <td className="px-4 py-3 font-semibold">${p.price.toFixed(2)}</td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <Badge className={p.inStock ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}>
                            {p.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => setProducts(prev => prev.filter(x => x.id !== p.id))}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {view === "orders" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-black tracking-tight">Orders</h1>
            <OrdersTable orders={mockOrders} />
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend }: { icon: React.ElementType; label: string; value: string; trend: string }) {
  return (
    <div className="bg-card border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className="flex items-center gap-1 text-xs text-green-500 font-semibold">
          <TrendingUp className="h-3 w-3" /> {trend}
        </span>
      </div>
      <div className="text-2xl font-black mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function OrdersTable({ orders }: { orders: typeof mockOrders }) {
  return (
    <div className="border rounded-2xl overflow-hidden bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="text-left px-4 py-3 font-semibold">Order ID</th>
              <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Customer</th>
              <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Date</th>
              <th className="text-left px-4 py-3 font-semibold">Status</th>
              <th className="text-right px-4 py-3 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order.id} className={`border-b last:border-b-0 ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                <td className="px-4 py-3 font-mono text-primary font-medium">{order.id}</td>
                <td className="px-4 py-3 hidden sm:table-cell">{order.customer}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{order.date}</td>
                <td className="px-4 py-3">
                  <Badge className={statusColor[order.status]}>{order.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right font-bold">${order.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
