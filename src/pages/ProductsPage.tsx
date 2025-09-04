import { useState, useEffect } from "react";
import { Filter, Grid, List, SortAsc, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

// Mock product data
const allProducts = Array.from({ length: 50 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `Product ${i + 1}`,
  price: Math.round((Math.random() * 200 + 20) * 100) / 100,
  originalPrice: Math.random() > 0.7 ? Math.round((Math.random() * 100 + 250) * 100) / 100 : undefined,
  image: `https://picsum.photos/600/600?random=${i + 100}`,
  category: ['Men', 'Women', 'Accessories', 'Footwear', 'Outerwear'][Math.floor(Math.random() * 5)],
  isNew: Math.random() > 0.8,
  isOnSale: Math.random() > 0.7,
  rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
  colors: [
    ['#000000', '#FFFFFF', '#FF0000'],
    ['#0000FF', '#00FF00', '#FFFF00'],
    ['#800080', '#FFA500', '#FFC0CB']
  ][Math.floor(Math.random() * 3)]
}));

const categories = ['All', 'Men', 'Women', 'Accessories', 'Footwear', 'Outerwear'];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Best Rating' }
];

const ProductsPage = () => {
  const [products, setProducts] = useState(allProducts);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showOnSale, setShowOnSale] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...allProducts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (!selectedCategories.includes('All')) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Price filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sale filter
    if (showOnSale) {
      filtered = filtered.filter(product => product.isOnSale);
    }

    // New filter
    if (showNew) {
      filtered = filtered.filter(product => product.isNew);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return b.isNew ? 1 : -1;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategories, priceRange, sortBy, searchQuery, showOnSale, showNew]);

  const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
    } else {
      const newCategories = selectedCategories.includes('All')
        ? [category]
        : selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories.filter(c => c !== 'All'), category];
      
      setSelectedCategories(newCategories.length === 0 ? ['All'] : newCategories);
    }
  };

  const clearFilters = () => {
    setSelectedCategories(['All']);
    setPriceRange([0, 500]);
    setShowOnSale(false);
    setShowNew(false);
    setSearchQuery('');
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="font-semibold mb-3">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="px-3">
          <Slider
            defaultValue={priceRange}
            max={500}
            min={0}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-2"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Special Filters */}
      <div>
        <h3 className="font-semibold mb-3">Special Offers</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="on-sale"
              checked={showOnSale}
              onCheckedChange={(checked) => setShowOnSale(checked === true)}
            />
            <label htmlFor="on-sale" className="text-sm cursor-pointer">
              On Sale
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="new-arrivals"
              checked={showNew}
              onCheckedChange={(checked) => setShowNew(checked === true)}
            />
            <label htmlFor="new-arrivals" className="text-sm cursor-pointer">
              New Arrivals
            </label>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" onClick={clearFilters} className="w-full">
        <X className="mr-2 h-4 w-4" />
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Discover our complete collection of premium clothing and accessories
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Badge variant="secondary">{filteredProducts.length} products</Badge>
                </div>
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                {/* Mobile Filters */}
                <Sheet open={showFilters} onOpenChange={setShowFilters}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Filter products by category, price, and more
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SortAsc className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {filteredProducts.length} products
                </span>
                
                {/* View Mode Toggle */}
                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-8 w-8 p-0"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <Card className="p-12 text-center">
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              </Card>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;