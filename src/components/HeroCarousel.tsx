import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "New Spring Collection",
    subtitle: "Fresh Styles for 2024",
    description: "Discover the latest trends in fashion with our curated spring collection. Premium quality meets modern design.",
    image: "https://picsum.photos/1920/800?random=1",
    ctaText: "Shop Collection",
    ctaLink: "/category/new",
    backgroundColor: "from-primary to-secondary"
  },
  {
    id: 2,
    title: "Summer Sale",
    subtitle: "Up to 70% Off",
    description: "Don't miss out on amazing deals across all categories. Limited time offer on premium clothing and accessories.",
    image: "https://picsum.photos/1920/800?random=2",
    ctaText: "Shop Sale",
    ctaLink: "/category/sale",
    backgroundColor: "from-secondary to-primary"
  },
  {
    id: 3,
    title: "Premium Denim",
    subtitle: "Crafted to Perfection",
    description: "Experience the finest denim collection with perfect fits and exceptional comfort. Made from sustainable materials.",
    image: "https://picsum.photos/1920/800?random=3",
    ctaText: "Explore Denim",
    ctaLink: "/category/denim",
    backgroundColor: "from-primary-light to-secondary-dark"
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto-switch every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <Card className="relative overflow-hidden rounded-lg">
      <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              index === currentSlide
                ? "translate-x-0"
                : index < currentSlide
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.backgroundColor} opacity-80`} />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <div className="animate-fade-in-up">
                    <p className="text-sm font-medium uppercase tracking-wider opacity-90 mb-2">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        asChild
                        size="lg"
                        className="bg-white text-primary hover:bg-white/90 font-semibold"
                      >
                        <Link to={slide.ctaLink}>
                          <ShoppingBag className="mr-2 h-5 w-5" />
                          {slide.ctaText}
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-white text-white hover:bg-white hover:text-primary"
                        asChild
                      >
                        <Link to="/products">
                          View All Products
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="absolute top-4 right-4 z-20">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white text-xs"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          >
            {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default HeroCarousel;