import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { ProductCard } from './components/common/ProductCard';
import { CartView } from './views/CartView';
import { CheckoutView, type OrderData } from './views/CheckoutView';
import { PaymentSuccessView } from './views/PaymentSuccessView';
import { PaymentErrorView } from './views/PaymentErrorView';
import { productService, type Product, type CartItem } from './data/productService';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastOrder, setLastOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const data = productService.getAll();
    setProducts(data);
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, cantidad: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.cantidad + delta;
          return newQty > 0 ? { ...item, cantidad: newQty } : item;
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handlePaymentSuccess = (order: OrderData) => {
    setLastOrder(order);
    setCart([]);
    setCurrentView('payment-success');
  };

  const handlePaymentError = () => {
    setCurrentView('payment-error');
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className="min-vh-100 custom-bg d-flex flex-column">
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        cartCount={totalCartCount}
      />

      <main className="container my-5 flex-grow-1">
        {currentView === 'home' || currentView === 'products' ? (
          <>
            <div className="text-center mb-5">
              <h1 className="fw-bold" style={{ color: 'var(--dark-color)' }}>
                Nuestros Pasteles y Tortas
              </h1>
              <p className="text-muted">
                Selecciona tus favoritos y añádelos al carrito
              </p>
            </div>

            <div className="row g-4">
              {products.map((item) => (
                <div key={item.id} className="col-12 col-md-6 col-lg-4">
                  <ProductCard product={item} onAddToCart={handleAddToCart} />
                </div>
              ))}
            </div>
          </>
        ) : currentView === 'cart' ? (
          <CartView
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onProceedToCheckout={() => setCurrentView('checkout')}
            onContinueShopping={() => setCurrentView('home')}
          />
        ) : currentView === 'checkout' ? (
          <CheckoutView
            cart={cart}
            onBackToCart={() => setCurrentView('cart')}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        ) : currentView === 'payment-success' ? (
          <PaymentSuccessView
            orderData={lastOrder}
            onGoHome={() => setCurrentView('home')}
          />
        ) : currentView === 'payment-error' ? (
          <PaymentErrorView
            onRetry={() => setCurrentView('checkout')}
            onGoHome={() => setCurrentView('home')}
          />
        ) : null}
      </main>

      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p className="mb-0 small">
          Pastelería Mil Sabores - Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}