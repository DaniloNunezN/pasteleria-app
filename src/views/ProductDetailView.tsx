import React, { useState } from 'react';
import type { Product } from '../data/productService';

interface ProductDetailViewProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBack: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onAddToCart,
  onBack,
}) => {
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = product.stock <= 0;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleAdd = () => {
    if (!isOutOfStock) {
      onAddToCart(product, quantity);
    }
  };

  return (
    <div className="my-5">
      <button className="btn btn-outline-secondary btn-sm mb-4" onClick={onBack}>
        <i className="bi bi-arrow-left me-1"></i> Volver al Catálogo
      </button>

      <div className="card shadow-sm border-0 p-4">
        <div className="row g-4">
          <div className="col-md-6 text-center">
            <img
              src={product.imagen}
              alt={product.nombre}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: '420px', width: '100%', objectFit: 'cover' }}
            />
          </div>

          <div className="col-md-6 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span
                className="badge px-3 py-2"
                style={{ backgroundColor: 'var(--color-rosa)', color: 'var(--texto-oscuro)' }}
              >
                {product.categoria}
              </span>
              <span className="badge bg-secondary">{product.codigo}</span>
            </div>

            <h2 className="fw-bold mb-2">{product.nombre}</h2>
            <h3 className="text-price fw-bold mb-3">
              ${product.precio.toLocaleString('es-CL')}
            </h3>

            <p className="text-muted mb-4">{product.descripcion}</p>

            <div className="mb-4">
              <span className="fw-semibold small d-block mb-1">Disponibilidad:</span>
              <span className={`badge ${isOutOfStock ? 'bg-danger' : 'bg-success'}`}>
                {isOutOfStock ? 'Sin Stock' : `${product.stock} unidades disponibles`}
              </span>
            </div>

            {!isOutOfStock && (
              <div className="d-flex align-items-center gap-3 mb-4">
                <span className="fw-semibold small">Cantidad:</span>
                <div className="btn-group btn-group-sm" role="group">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="btn btn-light disabled px-3 fw-bold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleIncrease}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="mt-auto">
              <button
                type="button"
                className="btn btn-custom w-100 py-2 fw-bold"
                onClick={handleAdd}
                disabled={isOutOfStock}
              >
                <i className="bi bi-cart-plus me-2"></i>
                {isOutOfStock ? 'Producto Agotado' : `Añadir al Carrito ($${(product.precio * quantity).toLocaleString('es-CL')})`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};