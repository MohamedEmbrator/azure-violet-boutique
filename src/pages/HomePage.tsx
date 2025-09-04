import { useState, useEffect } from "react";
import { ArrowRight, Star, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";

// Mock data for latest products
const latestProducts = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://picsum.photos/600/600?random=10",
    category: "Men",
    isNew: true,
    colors: ["#000000", "#FFFFFF", "#FF0000"]
  },
  {
    id: "2",
    name: "Designer Denim Jacket",
    price: 89.99,
    originalPrice: 120.00,
    image: "https://picsum.photos/600/600?random=11",
    category: "Women",
    isOnSale: true,
    colors: ["#1E40AF", "#000000"]
  },
  {
    id: "3",
    name: "Luxury Silk Scarf",
    price: 45.99,
    image: "https://picsum.photos/600/600?random=12",
    category: "Accessories",
    isNew: true,
    colors: ["#EF4444", "#F59E0B", "#10B981"]
  },
  {
    id: "4",
    name: "Sport Running Shoes",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://picsum.photos/600/600?random=13",
    category: "Footwear",
    isOnSale: true,
    colors: ["#000000", "#FFFFFF", "#3B82F6"]
  },
  {
    id: "5",
    name: "Elegant Evening Dress",
    price: 159.99,
    image: "https://picsum.photos/600/600?random=14",
    category: "Women",
    colors: ["#000000", "#8B5CF6", "#EF4444"]
  },
  {
    id: "6",
    name: "Casual Polo Shirt",
    price: 24.99,
    originalPrice: 34.99,
    image: "https://picsum.photos/600/600?random=15",
    category: "Men",
    isOnSale: true,
    colors: ["#FFFFFF", "#000000", "#10B981"]
  },
  {
    id: "7",
    name: "Designer Handbag",
    price: 199.99,
    image: "https://picsum.photos/600/600?random=16",
    category: "Accessories",
    isNew: true,
    colors: ["#000000", "#8B4513", "#F59E0B"]
  },
  {
    id: "8",
    name: "Winter Wool Coat",
    price: 249.99,
    originalPrice: 299.99,
    image: "https://picsum.photos/600/600?random=17",
    category: "Outerwear",
    isOnSale: true,
    colors: ["#000000", "#8B4513", "#6B7280"]
  },
  {
    id: "9",
    name: "Classic Wristwatch",
    price: 89.99,
    image: "https://picsum.photos/600/600?random=18",
    category: "Accessories",
    colors: ["#C0C0C0", "#FFD700", "#000000"]
  },
  {
    id: "10",
    name: "Summer Sundress",
    price: 49.99,
    originalPrice: 69.99,
    image: "https://picsum.photos/600/600?random=19",
    category: "Women",
    isOnSale: true,
    colors: ["#FFFF00", "#FF69B4", "#87CEEB"]
  }
];

const stats = [
  { icon: Users, label: "Happy Customers", value: "50,000+" },
  { icon: Star, label: "5-Star Reviews", value: "12,000+" },
  { icon: TrendingUp, label: "Products Sold", value: "1M+" }
];

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState(latestProducts.slice(0, 8));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Carousel */}
      <section className="container mx-auto px-4 py-8">
        <HeroCarousel />
      </section>

      {/* Stats Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-soft">
                <CardContent className="pt-6">
                  <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collections designed for every style and occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Men's Collection", image: "https://picsum.photos/800/600?random=20", link: "/category/men" },
              { name: "Women's Collection", image: "https://picsum.photos/800/600?random=21", link: "/category/women" },
              { name: "Accessories", image: "https://picsum.photos/800/600?random=22", link: "/category/accessories" }
            ].map((category, index) => (
              <Link key={index} to={category.link} className="group block">
                <Card className="overflow-hidden hover:shadow-medium transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                      <Button variant="outline" size="sm" className="bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-black">
                        Explore Collection
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Arrivals</h2>
              <p className="text-muted-foreground">Discover our newest products and trending styles</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-primary text-white border-0">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, and fashion tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-black border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-white">TC</span>
                </div>
                <span className="text-lg font-bold">TrendyCloth</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Your destination for premium fashion and style. Quality clothing that makes a statement.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/category/men" className="hover:text-primary transition-colors">Men's Fashion</Link></li>
                <li><Link to="/category/women" className="hover:text-primary transition-colors">Women's Fashion</Link></li>
                <li><Link to="/category/accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
                <li><Link to="/category/sale" className="hover:text-primary transition-colors">Sale</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Customer Care</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping Info</Link></li>
                <li><Link to="/returns" className="hover:text-primary transition-colors">Returns</Link></li>
                <li><Link to="/size-guide" className="hover:text-primary transition-colors">Size Guide</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 TrendyCloth. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;