import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useCallback, useMemo } from "react";

interface CartItem {
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  unit: string;
  quantity: number;
}

interface ProductCardProps {
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  unit: string;
  className?: string;
  cart: CartItem[];
  setCart: (cart: CartItem[] | ((prev: CartItem[]) => CartItem[])) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  price,
  originalPrice,
  unit,
  className,
  cart,
  setCart,
}) => {
  // Determine if the product is already in the cart
  const isAddedToCart = useMemo(
    () => cart.some(item => item.title === title),
    [cart, title]
  );

  // Handler to add the product to cart
  const handleAddToCart = useCallback(() => {
    if (isAddedToCart) return;

    const newItem: CartItem = { title, image, price, originalPrice, unit, quantity: 1 };

    // Corrected functional update signature with explicit type annotation
    setCart((prevCart: CartItem[]) => [...prevCart, newItem]);
  }, [isAddedToCart, setCart, title, image, price, originalPrice, unit]);

  return (
    <div className={cn("group relative bg-white rounded-lg p-4 border transition-shadow hover:shadow-lg", className)}>
      <div className="aspect-square mb-4 overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">{title}</h3>
      <div className="text-sm text-gray-500 mb-2">{unit}</div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl font-bold">${price}</span>
        <span className="text-gray-500 line-through">${originalPrice}</span>
      </div>

      <Button
        className={cn(
          "w-full border-2",
          isAddedToCart
            ? "bg-pink-500 text-white border-pink-500 cursor-not-allowed"
            : "bg-white text-pink-500 border-pink-500 hover:bg-pink-50"
        )}
        disabled={isAddedToCart}
        onClick={handleAddToCart}
      >
        {isAddedToCart ? "Added" : "Add"}
      </Button>
    </div>
  );
};
