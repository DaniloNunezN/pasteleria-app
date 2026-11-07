import React from 'react';
import type { Product } from '../../data/productService';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetail?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetail,
}) => {
  const isOutOfStock = product.stock <= 0;
  const isCriticalStock =
    product.stockCritico !== undefined &&
    product.stock > 0 &&
    product.stock <= product.stockCritico;

  return (
    <div className="card h-100 shadow-sm border-0 d-flex flex-column">
      <div className="position-relative">
        <img
          src={product.imagen}
          alt={product.nombre}
          className="card-img-top"
          style={{ height: '220px', objectFit: 'cover' }}
        />
        <span
          className="badge position-absolute top-0 start-0 m-2 px-2 py-1 text-white"
          style={{ backgroundColor: 'var(--color-chocolate)', fontSize: '0.75rem' }}
        >
          {product.codigo}
        </span>
        {isCriticalStock && (
          <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">
            ¡Últimas unidades!
          </span>
        )}
      </div>

      <div className="card-body d-flex flex-column p-3">
        <span
          className="badge align-self-start mb-2"
          style={{ backgroundColor: 'var(--color-rosa)', color: 'var(--texto-oscuro)' }}
        >
          {product.categoria}
        </span>
        <h5 className="card-title fs-6 fw-bold mb-1">{product.nombre}</h5>
        <p className="card-text text-muted small flex-grow-1 mb-3">
          {product.descripcion}
        </p>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fs-5 fw-bold text-price">
            ${product.precio.toLocaleString('es-CL')}
          </span>
          <span className={`badge ${isOutOfStock ? 'bg-danger' : 'bg-success'}`}>
            {isOutOfStock ? 'Sin stock' : `${product.stock} disp.`}
          </span>
        </div>

        <div className="d-flex gap-2">
          {onViewDetail && (
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary flex-grow-1"
              onClick={() => onViewDetail(product)}
            >
              Detalle
            </button>
          )}
          <button
            type="button"
            className="btn btn-custom btn-sm flex-grow-1"
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
          >
            <i className="bi bi-cart-plus me-1"></i>
            {isOutOfStock ? 'Agotado' : 'Añadir'}
          </button>
        </div>
      </div>
    </div>
  );
};