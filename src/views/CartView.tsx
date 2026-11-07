import React from 'react';
import type { CartItem } from '../data/productService';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
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
  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  if (cart.length === 0) {
    return (
      <div className="card shadow-sm border-0 p-5 text-center my-4">
        <i className="bi bi-cart-x text-muted" style={{ fontSize: '4rem' }}></i>
        <h3 className="mt-3 fw-bold" style={{ color: 'var(--dark-color)' }}>
          Tu carrito está vacío
        </h3>
        <p className="text-muted">Aún no has agregado ningún pastel a tu pedido.</p>
        <div>
          <button className="btn btn-custom px-4 py-2" onClick={onContinueShopping}>
            Ver Catálogo de Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: 'var(--dark-color)' }}>
          Carrito de Compras
        </h2>
        <button className="btn btn-outline-danger btn-sm" onClick={onClearCart}>
          <i className="bi bi-trash3 me-1"></i>
          Vaciar Carrito
        </button>
      </div>

      <div className="card shadow-sm border-0 mb-4">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col" style={{ width: '100px' }}>Imagen</th>
                <th scope="col">Producto</th>
                <th scope="col">Precio Unitario</th>
                <th scope="col" className="text-center" style={{ width: '160px' }}>Cantidad</th>
                <th scope="col">Subtotal</th>
                <th scope="col" className="text-end">Acción</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="rounded"
                      style={{ width: '70px', height: '60px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>
                    <div className="fw-bold text-dark">{item.nombre}</div>
                    <small className="text-muted">{item.categoria}</small>
                  </td>
                  <td>${item.precio.toLocaleString('es-CL')}</td>
                  <td>
                    <div className="input-group input-group-sm justify-content-center">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        disabled={item.cantidad <= 1}
                      >
                        -
                      </button>
                      <span className="input-group-text px-3 bg-white">
                        {item.cantidad}
                      </span>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        disabled={item.cantidad >= item.stock}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="fw-bold text-price">
                    ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onRemoveItem(item.id)}
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

      <div className="row g-4 align-items-center">
        <div className="col-md-6">
          <button className="btn btn-outline-secondary" onClick={onContinueShopping}>
            <i className="bi bi-arrow-left me-1"></i>
            Seguir comprando
          </button>
        </div>
        <div className="col-md-6 text-md-end">
          <div
            className="card shadow-sm border-0 p-3 d-inline-block text-start w-100"
            style={{ maxWidth: '350px' }}
          >
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Total a pagar:</span>
              <span className="fs-4 fw-bold text-price">
                ${total.toLocaleString('es-CL')}
              </span>
            </div>
            <button
              className="btn btn-custom w-100 py-2 mt-2"
              onClick={onProceedToCheckout}
            >
              Proceder al Pago
              <i className="bi bi-credit-card ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};