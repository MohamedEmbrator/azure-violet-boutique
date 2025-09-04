import { useState, useEffect } from "react";
import { ShoppingCart, User, Search, Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface HeaderProps {
  userBalance?: number;
  cartItemsCount?: number;
}

const Header = ({ userBalance = 1250.00, cartItemsCount = 3 }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        {/* Top bar with balance and account */}
        <div className="flex items-center justify-between py-2 text-sm border-b">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Free shipping on orders over $50</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium">
              Balance: <span className="text-primary font-bold">${userBalance.toFixed(2)}</span>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-8 w-8 p-0"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-xl font-bold text-white">TC</span>
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              TrendyCloth
            </span>
          </Link>

          {/* Search bar - hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </form>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/balance">Add Balance</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login">Sign In</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation - desktop */}
        <nav className="hidden md:flex items-center space-x-6 py-4 border-t">
          <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
            All Products
          </Link>
          <Link to="/category/men" className="text-sm font-medium hover:text-primary transition-colors">
            Men
          </Link>
          <Link to="/category/women" className="text-sm font-medium hover:text-primary transition-colors">
            Women
          </Link>
          <Link to="/category/accessories" className="text-sm font-medium hover:text-primary transition-colors">
            Accessories
          </Link>
          <Link to="/category/sale" className="text-sm font-medium hover:text-primary transition-colors text-destructive">
            Sale
          </Link>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
            </form>

            {/* Mobile navigation links */}
            <div className="flex flex-col space-y-2">
              <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors py-2">
                All Products
              </Link>
              <Link to="/category/men" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Men
              </Link>
              <Link to="/category/women" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Women
              </Link>
              <Link to="/category/accessories" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Accessories
              </Link>
              <Link to="/category/sale" className="text-sm font-medium hover:text-primary transition-colors py-2 text-destructive">
                Sale
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;