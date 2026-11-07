import React from 'react';
import { Product } from '../../data/productService';

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
  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={product.imagen}
        className="card-img-top"
        alt={product.nombre}
        style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
        onClick={() => onViewDetail && onViewDetail(product)}
      />
      <div className="card-body d-flex flex-column">
        <span className="badge bg-secondary mb-2 align-self-start">
          {product.categoria}
        </span>
        <h5
          className="card-title"
          style={{ cursor: 'pointer' }}
          onClick={() => onViewDetail && onViewDetail(product)}
        >
          {product.nombre}
        </h5>
        <p className="card-text text-muted small flex-grow-1">
          {product.descripcion}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="fs-5 fw-bold text-price">
            ${product.precio.toLocaleString('es-CL')}
          </span>
          <button
            className="btn btn-custom btn-sm"
            onClick={() => onAddToCart(product)}
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? 'Añadir al carrito' : 'Agotado'}
          </button>
        </div>
      </div>
    </div>
  );
};