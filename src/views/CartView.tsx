import React, { useState } from 'react';
import type { CartItem } from '../data/productService';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQuantity: (codigo: string, delta: number) => void;
  onRemoveItem: (codigo: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: (appliedDiscount: number) => void;
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
  const finalTotal = subtotal - discountAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();

    if (cleanCode === 'FELICES50') {
      setDiscountPercent(10);
      setCouponMessage({
        text: '¡Cupón FELICES50 aplicado con éxito! (10% de descuento)',
        isError: false,
      });
    } else {
      setDiscountPercent(0);
      setCouponMessage({
        text: 'Cupón no válido. Intenta con FELICES50.',
        isError: true,
      });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="card shadow-sm border-0 p-5 text-center my-4">
        <i
          className="bi bi-cart-x display-1 mb-3"
          style={{ color: 'var(--color-chocolate)' }}
        ></i>
        <h3 className="fw-bold mb-2">Tu carrito está vacío</h3>
        <p className="text-muted mb-4">
          Descubre nuestras tortas y postres tradicionales y añade tus preferidos.
        </p>
        <div>
          <button className="btn btn-custom px-4 py-2" onClick={onContinueShopping}>
            <i className="bi bi-arrow-left me-2"></i>
            Ir al Catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Mi Carrito de Compras</h2>
        <button className="btn btn-outline-danger btn-sm" onClick={onClearCart}>
          <i className="bi bi-trash me-1"></i> Vaciar Carrito
        </button>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col" className="text-center">Cantidad</th>
                    <th scope="col" className="text-end">Subtotal</th>
                    <th scope="col" className="text-end"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.codigo}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.imagen}
                            alt={item.nombre}
                            className="rounded me-3"
                            style={{ width: '55px', height: '55px', objectFit: 'cover' }}
                          />
                          <div>
                            <div className="fw-bold small">{item.nombre}</div>
                            <span className="badge bg-secondary" style={{ fontSize: '0.7rem' }}>
                              {item.codigo}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-price fw-semibold">
                        ${item.precio.toLocaleString('es-CL')}
                      </td>
                      <td className="text-center">
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => onUpdateQuantity(item.codigo, -1)}
                            disabled={item.cantidad <= 1}
                          >
                            -
                          </button>
                          <span className="btn btn-light disabled px-3 fw-bold">
                            {item.cantidad}
                          </span>
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => onUpdateQuantity(item.codigo, 1)}
                            disabled={item.cantidad >= item.stock}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-end fw-bold text-price">
                        ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                      </td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => onRemoveItem(item.codigo)}
                          title="Eliminar producto"
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="fw-bold mb-3">Resumen del Pedido</h5>

            <form onSubmit={handleApplyCoupon} className="mb-3">
              <label className="form-label small fw-semibold text-muted">
                ¿Tienes un cupón de descuento?
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-sm text-uppercase"
                  placeholder="Ej: FELICES50"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button type="submit" className="btn btn-outline-secondary btn-sm">
                  Aplicar
                </button>
              </div>
              {couponMessage && (
                <div
                  className={`small mt-2 ${
                    couponMessage.isError ? 'text-danger' : 'text-success fw-bold'
                  }`}
                >
                  {couponMessage.text}
                </div>
              )}
            </form>

            <hr />

            <div className="d-flex justify-content-between mb-2 small">
              <span className="text-muted">Subtotal:</span>
              <span className="fw-bold">${subtotal.toLocaleString('es-CL')}</span>
            </div>

            {discountPercent > 0 && (
              <div className="d-flex justify-content-between mb-2 small text-success">
                <span>Descuento ({discountPercent}%):</span>
                <span>-${discountAmount.toLocaleString('es-CL')}</span>
              </div>
            )}

            <div className="d-flex justify-content-between my-3 pt-2 border-top">
              <span className="fs-5 fw-bold">Total:</span>
              <span className="fs-5 fw-bold text-price">
                ${finalTotal.toLocaleString('es-CL')}
              </span>
            </div>

            <button
              type="button"
              className="btn btn-custom w-100 py-2 mb-2"
              onClick={() => onProceedToCheckout(discountPercent)}
            >
              Continuar al Pago
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary w-100 btn-sm"
              onClick={onContinueShopping}
            >
              Seguir Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};