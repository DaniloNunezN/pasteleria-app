import React, { useState } from 'react';
import type { CartItem } from '../data/productService';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQuantity: (codigo: string, delta: number) => void;
  onRemoveItem: (codigo: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: (discountPercent: number) => void;
  onContinueShopping: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const total = subtotal - discountAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'FELICES50') {
      setDiscountPercent(10);
      setCouponMessage({ text: '¡Cupón FELICES50 aplicado! 10% de descuento.', isError: false });
    } else {
      setDiscountPercent(0);
      setCouponMessage({ text: 'Cupón inválido.', isError: true });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="my-5 text-center p-5 card border-0 shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-rosa)' }}>
        <div className="mb-3 text-muted">
          <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-texto-sec)' }}>
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
        <h3 className="fw-bold mb-2" style={{ color: 'var(--color-chocolate)' }}>Tu carrito está vacío</h3>
        <p className="text-muted mb-4">¿Aún no decides qué delicia probar hoy? Revisa nuestras opciones recién horneadas.</p>
        <div>
          <button className="btn-principal d-inline-flex align-items-center gap-2" onClick={onContinueShopping}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Ir a la tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-main my-4">
      <div className="titulo-pagina mb-4">
        <h1>Tu Carrito de Compras</h1>
      </div>

      <div className="contenedor-carrito">
        <div className="lista-productos">
          {cart.map((item) => (
            <div key={item.codigo} className="tarjeta-producto d-flex align-items-center gap-3">
              <img
                src={item.imagen}
                alt={item.nombre}
                style={{ width: '90px', height: '80px', objectFit: 'cover', borderRadius: '6px' }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <div className="info-producto flex-grow-1">
                <span className="badge bg-light text-dark border mb-1" style={{ fontSize: '0.75rem' }}>{item.categoria}</span>
                <h4 className="h6 fw-bold mb-1" style={{ color: 'var(--color-chocolate)' }}>{item.nombre}</h4>
                <p className="small text-muted mb-0">Código: {item.codigo}</p>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  className="btn-cant"
                  onClick={() => onUpdateQuantity(item.codigo, -1)}
                >
                  -
                </button>
                <span className="fw-bold px-2">{item.cantidad}</span>
                <button
                  type="button"
                  className="btn-cant"
                  onClick={() => onUpdateQuantity(item.codigo, 1)}
                  disabled={item.cantidad >= item.stock}
                >
                  +
                </button>
              </div>

              <div className="text-end" style={{ minWidth: '110px' }}>
                <div className="fw-bold" style={{ color: 'var(--color-chocolate)' }}>
                  ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                </div>
                <button
                  type="button"
                  className="btn btn-link text-danger p-0 small text-decoration-none d-inline-flex align-items-center gap-1 mt-1"
                  onClick={() => onRemoveItem(item.codigo)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  Quitar
                </button>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1" onClick={onContinueShopping}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Seguir comprando
            </button>
            <button className="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-1" onClick={onClearCart}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Vaciar carrito
            </button>
          </div>
        </div>

        <div className="panel-resumen">
          <h4 className="fw-bold mb-3" style={{ color: 'var(--color-chocolate)' }}>Resumen del Pedido</h4>

          <div className="d-flex justify-content-between small mb-2">
            <span>Subtotal:</span>
            <span className="fw-bold">${subtotal.toLocaleString('es-CL')}</span>
          </div>

          {discountAmount > 0 && (
            <div className="d-flex justify-content-between small text-success mb-2">
              <span>Descuento (10%):</span>
              <span className="fw-bold">-${discountAmount.toLocaleString('es-CL')}</span>
            </div>
          )}

          <div className="fila-total my-2">
            <span>Total:</span>
            <span className="monto-total">${total.toLocaleString('es-CL')}</span>
          </div>

          <form onSubmit={handleApplyCoupon} className="cupon-seccion my-2">
            <label>¿Tienes cupón de descuento?</label>
            <div className="cupon-box">
              <input
                type="text"
                placeholder="Ej: FELICES50"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button type="submit" className="btn-aplicar">Aplicar</button>
            </div>
            {couponMessage && (
              <span className={`small d-block mt-1 ${couponMessage.isError ? 'text-danger' : 'text-success'}`}>
                {couponMessage.text}
              </span>
            )}
          </form>

          <button
            type="button"
            className="btn-pagar mt-3 d-flex align-items-center justify-content-center gap-2"
            onClick={() => onProceedToCheckout(discountPercent)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  );
};