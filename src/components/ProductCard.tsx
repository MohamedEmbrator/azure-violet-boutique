import { useState } from "react";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isOnSale?: boolean;
  rating?: number;
  colors?: string[];
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  isNew = false,
  isOnSale = false,
  rating = 4.5,
  colors = ["#000000", "#FFFFFF", "#FF0000"]
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
    
    // Handle add to cart logic here
    console.log(`Added product ${id} to cart`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Card className="product-card group cursor-pointer overflow-hidden">
      <Link to={`/product/${id}`} className="block">
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <Badge variant="secondary" className="bg-success text-success-foreground">
                New
              </Badge>
            )}
            {isOnSale && discountPercentage > 0 && (
              <Badge variant="destructive">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Action buttons - appear on hover */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={handleToggleWishlist}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              asChild
            >
              <Link to={`/product/${id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Quick add to cart button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="w-full btn-gradient"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {isLoading ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Category */}
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {category}
          </p>

          {/* Product name */}
          <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-xs ${
                    star <= Math.floor(rating)
                      ? "text-yellow-400"
                      : star <= rating
                      ? "text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({rating})</span>
          </div>

          {/* Colors */}
          {colors && colors.length > 0 && (
            <div className="flex items-center gap-1 mb-3">
              {colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="h-4 w-4 rounded-full border border-border"
                  style={{ backgroundColor: color }}
                />
              ))}
              {colors.length > 3 && (
                <span className="text-xs text-muted-foreground ml-1">
                  +{colors.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="price-tag">${price.toFixed(2)}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;