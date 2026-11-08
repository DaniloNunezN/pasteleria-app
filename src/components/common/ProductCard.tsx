import React from 'react';
import type { Product } from '../../data/productService';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
}) => {
  return (
    <article className="producto-card h-100 d-flex flex-column justify-content-between">
      <div>
        <div
          className="producto-imagen"
          style={{ cursor: onSelectProduct ? 'pointer' : 'default' }}
          onClick={() => onSelectProduct && onSelectProduct(product)}
        >
          <img
            src={product.imagen}
            alt={product.nombre}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80';
            }}
          />
        </div>
        <div className="producto-info text-center mt-2">
          <div className="d-flex justify-content-center align-items-center gap-2 mb-1">
            <span className="badge bg-light text-secondary border" style={{ fontSize: '0.7rem' }}>
              {product.codigo}
            </span>
            <span className="producto-categoria mb-0">{product.categoria}</span>
          </div>
          <h3
            className="h6 fw-bold my-2"
            style={{ cursor: onSelectProduct ? 'pointer' : 'default' }}
            onClick={() => onSelectProduct && onSelectProduct(product)}
          >
            {product.nombre}
          </h3>
          <p className="producto-precio mb-2">
            ${product.precio.toLocaleString('es-CL')}
          </p>
        </div>
      </div>

      <div className="producto-acciones mt-3">
        {onSelectProduct && (
          <button
            type="button"
            className="btn-detalle"
            onClick={() => onSelectProduct(product)}
          >
            Ver detalle
          </button>
        )}
        <button
          type="button"
          className="btn-carrito d-inline-flex align-items-center justify-content-center gap-1"
          onClick={() => onAddToCart(product)}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Añadir
        </button>
      </div>
    </article>
  );
};