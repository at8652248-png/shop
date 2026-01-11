import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Cashmere Blend Sweater",
    price: 189,
    category: "Knitwear",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=750&fit=crop",
  },
  {
    id: 2,
    name: "Tailored Wool Coat",
    price: 349,
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=750&fit=crop",
  },
  {
    id: 3,
    name: "Silk Midi Dress",
    price: 275,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=750&fit=crop",
  },
  {
    id: 4,
    name: "Premium Denim Jeans",
    price: 145,
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=750&fit=crop",
  },
  {
    id: 5,
    name: "Linen Relaxed Shirt",
    price: 125,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop",
  },
  {
    id: 6,
    name: "Leather Crossbody Bag",
    price: 225,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop",
  },
  {
    id: 7,
    name: "Merino Wool Scarf",
    price: 89,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=750&fit=crop",
  },
];

interface CartItem extends Product {
  quantity: number;
}

export default function Shop() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    setAddedItems((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/">
              <span className="text-xl md:text-2xl font-serif font-medium tracking-wide cursor-pointer">
                Ranveer's Shop
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/">
                <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-home">
                  Home
                </span>
              </Link>
              <Link href="/shop">
                <span className="text-foreground font-medium cursor-pointer" data-testid="link-shop">
                  Shop
                </span>
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              data-testid="button-signin"
            >
              Sign In
            </Button>
            <Button
              variant="ghost"
              size="sm"
              data-testid="button-login"
            >
              Log In
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32">
        <section className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 tracking-tight">
              Our Collection
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Discover our curated selection of premium clothing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group product-card"
                data-testid={`card-product-${product.id}`}
              >
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    data-testid={`img-product-${product.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {product.category}
                  </p>
                  <h3 className="font-serif text-lg font-medium" data-testid={`text-name-${product.id}`}>
                    {product.name}
                  </h3>
                  <p className="text-foreground font-medium" data-testid={`text-price-${product.id}`}>
                    ${product.price}
                  </p>
                  
                  <Button
                    onClick={() => addToCart(product)}
                    className="w-full mt-3 gap-2 transition-all duration-300"
                    variant={addedItems.has(product.id) ? "secondary" : "default"}
                    data-testid={`button-addtocart-${product.id}`}
                  >
                    {addedItems.has(product.id) ? (
                      <>
                        <Check className="w-4 h-4" />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <motion.button
        onClick={() => setShowCart(!showCart)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-testid="button-cart"
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="font-medium">Cart</span>
        {totalItems > 0 && (
          <span className="bg-accent text-accent-foreground text-sm font-semibold px-2 py-0.5 rounded-full min-w-[24px] text-center">
            {totalItems}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setShowCart(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border z-50 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-2xl font-serif font-medium">Your Cart</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowCart(false)}
                    data-testid="button-closecart"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mb-4" />
                      <p className="text-muted-foreground">Your cart is empty</p>
                      <p className="text-sm text-muted-foreground/70 mt-1">
                        Add some beautiful pieces to get started
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          className="flex gap-4 p-4 bg-muted/50 rounded-lg"
                          data-testid={`cart-item-${item.id}`}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-24 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium font-serif">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                            <p className="font-medium mt-1">
                              ${item.price * item.quantity}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeFromCart(item.id)}
                            data-testid={`button-remove-${item.id}`}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-6 border-t border-border bg-card">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-xl font-serif font-medium" data-testid="text-total">
                        ${totalPrice}
                      </span>
                    </div>
                    <Button className="w-full" size="lg" data-testid="button-checkout">
                      Proceed to Checkout
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
