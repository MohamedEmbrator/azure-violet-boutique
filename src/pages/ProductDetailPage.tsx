import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw, 
  Plus, 
  Minus, 
  Share2,
  ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

interface ProductColor {
  name: string;
  color: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  sizes: string[];
  inStock: boolean;
  features: string[];
}

// Mock product data
const mockProduct: Product = {
  id: "1",
  name: "Premium Cotton T-Shirt",
  price: 29.99,
  originalPrice: 39.99,
  description: "Experience ultimate comfort with our premium cotton t-shirt. Made from 100% organic cotton, this versatile piece features a classic fit that works for any occasion. The breathable fabric ensures all-day comfort while maintaining its shape wash after wash.",
  images: [
    "https://picsum.photos/800/800?random=30",
    "https://picsum.photos/800/800?random=31",
    "https://picsum.photos/800/800?random=32",
    "https://picsum.photos/800/800?random=33"
  ],
  category: "Men's Clothing",
  rating: 4.8,
  reviewCount: 324,
  colors: [
    { name: "Black", color: "#000000", image: "https://picsum.photos/800/800?random=30" },
    { name: "White", color: "#FFFFFF", image: "https://picsum.photos/800/800?random=31" },
    { name: "Navy", color: "#1E40AF", image: "https://picsum.photos/800/800?random=32" },
    { name: "Gray", color: "#6B7280", image: "https://picsum.photos/800/800?random=33" }
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  inStock: true,
  features: [
    "100% Organic Cotton",
    "Pre-shrunk for perfect fit",
    "Reinforced seams",
    "Machine washable",
    "Eco-friendly dyeing process"
  ]
};

// Related products
const relatedProducts = [
  {
    id: "2",
    name: "Classic Polo Shirt",
    price: 39.99,
    image: "https://picsum.photos/600/600?random=40",
    category: "Men",
    colors: ["#000000", "#FFFFFF", "#FF0000"]
  },
  {
    id: "3",
    name: "Casual Button Down",
    price: 49.99,
    image: "https://picsum.photos/600/600?random=41",
    category: "Men",
    colors: ["#0000FF", "#FFFFFF"]
  },
  {
    id: "4",
    name: "Summer Tank Top",
    price: 19.99,
    image: "https://picsum.photos/600/600?random=42",
    category: "Men",
    colors: ["#000000", "#FFFFFF", "#FF0000"]
  },
  {
    id: "5",
    name: "Long Sleeve Tee",
    price: 34.99,
    image: "https://picsum.photos/600/600?random=43",
    category: "Men",
    colors: ["#000000", "#6B7280"]
  }
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [paymentType, setPaymentType] = useState<'full' | 'partial'>('full');
  const [userBalance] = useState(1250.00); // Mock user balance

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProduct(mockProduct);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleColorChange = (colorIndex: number) => {
    setSelectedColor(colorIndex);
    setSelectedImage(colorIndex);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose a size before adding to cart",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Added to cart!",
      description: `${product?.name} (Size: ${selectedSize}) has been added to your cart.`
    });
  };

  const handlePurchase = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose a size before purchasing",
        variant: "destructive"
      });
      return;
    }

    setShowPurchaseDialog(true);
  };

  const confirmPurchase = () => {
    if (!product) return;

    const totalPrice = product.price * quantity;
    const amountToPay = paymentType === 'full' ? totalPrice : totalPrice * 0.5;

    if (amountToPay > userBalance) {
      toast({
        title: "Insufficient balance",
        description: "Please add more funds to your account or choose partial payment.",
        variant: "destructive"
      });
      return;
    }

    // Simulate purchase
    toast({
      title: "Purchase successful!",
      description: `You've successfully purchased ${product.name}. Amount deducted: $${amountToPay.toFixed(2)}`
    });

    setShowPurchaseDialog(false);
  };

  const discountPercentage = product?.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-square bg-muted animate-pulse rounded-lg" />
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-muted animate-pulse rounded" />
              <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
              <div className="h-12 bg-muted animate-pulse rounded w-1/2" />
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-4 bg-muted animate-pulse rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate('/products')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate('/products')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discountPercentage > 0 && (
                  <Badge variant="destructive" className="absolute top-4 left-4">
                    -{discountPercentage}%
                  </Badge>
                )}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
            </Card>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-muted'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.floor(product.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">Color: {product.colors[selectedColor].name}</h3>
              <div className="flex gap-3">
                {product.colors.map((colorOption, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorChange(index)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === index 
                        ? 'border-primary scale-110' 
                        : 'border-muted hover:border-primary/50'
                    }`}
                    style={{ backgroundColor: colorOption.color }}
                    title={colorOption.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 border rounded-md text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handlePurchase}
                size="lg"
                className="w-full btn-gradient"
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? `Buy Now - $${(product.price * quantity).toFixed(2)}` : 'Out of Stock'}
              </Button>
              
              <Button
                onClick={handleAddToCart}
                variant="outline"
                size="lg"
                className="w-full"
                disabled={!product.inStock}
              >
                Add to Cart
              </Button>

              <Button variant="ghost" size="lg" className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share Product
              </Button>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Product Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <span className="text-sm">Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="text-sm">1 Year Warranty</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-5 w-5 text-primary" />
                    <span className="text-sm">30-Day Returns</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                  <div className="prose max-w-none text-muted-foreground">
                    <p>{product.description}</p>
                    <h4 className="text-foreground font-medium mt-6 mb-3">Specifications</h4>
                    <ul>
                      <li><strong>Material:</strong> 100% Organic Cotton</li>
                      <li><strong>Fit:</strong> Classic Regular Fit</li>
                      <li><strong>Care:</strong> Machine wash cold, tumble dry low</li>
                      <li><strong>Origin:</strong> Made in USA</li>
                      <li><strong>Sustainability:</strong> GOTS Certified Organic Cotton</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
                    <p className="text-muted-foreground">Reviews functionality coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Shipping & Returns</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Shipping Options</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Standard Shipping: 3-5 business days (Free on orders $50+)</li>
                        <li>Express Shipping: 1-2 business days ($9.99)</li>
                        <li>Overnight Shipping: Next business day ($19.99)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Returns</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>30-day return window</li>
                        <li>Items must be unworn with tags attached</li>
                        <li>Free returns on defective items</li>
                        <li>Return shipping fee: $4.99 (deducted from refund)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} {...relatedProduct} />
            ))}
          </div>
        </div>
      </div>

      {/* Purchase Confirmation Dialog */}
      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              Please confirm your purchase details and select payment method.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/50">
              <h4 className="font-medium mb-2">{product.name}</h4>
              <p className="text-sm text-muted-foreground">
                Size: {selectedSize} | Color: {product.colors[selectedColor].name} | Qty: {quantity}
              </p>
              <p className="font-semibold mt-2">Total: ${(product.price * quantity).toFixed(2)}</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Payment Options</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="full"
                    checked={paymentType === 'full'}
                    onChange={(e) => setPaymentType(e.target.value as 'full' | 'partial')}
                    className="text-primary"
                  />
                  <span>Pay Full Amount: ${(product.price * quantity).toFixed(2)}</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="partial"
                    checked={paymentType === 'partial'}
                    onChange={(e) => setPaymentType(e.target.value as 'full' | 'partial')}
                    className="text-primary"
                  />
                  <span>Pay 50% Now: ${((product.price * quantity) * 0.5).toFixed(2)}</span>
                </label>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm">
                <strong>Your Balance:</strong> ${userBalance.toFixed(2)}
              </p>
              <p className="text-sm">
                <strong>Amount to Pay:</strong> ${(paymentType === 'full' 
                  ? product.price * quantity 
                  : (product.price * quantity) * 0.5
                ).toFixed(2)}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPurchaseDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmPurchase} className="btn-gradient">
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailPage;