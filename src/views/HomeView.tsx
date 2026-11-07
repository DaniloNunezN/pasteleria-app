import React from 'react';
import type { Product } from '../data/productService';

interface HomeViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onGoToCatalog: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  onSelectProduct,
  onGoToCatalog,
}) => {
  const featured = products.slice(0, 3);

  return (
    <div className="my-4">
      <div
        className="p-5 mb-5 rounded-4 text-white position-relative overflow-hidden shadow"
        style={{
          background: 'linear-gradient(135deg, rgba(62, 39, 35, 0.95), rgba(93, 64, 55, 0.85)), url(https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200) center/cover',
        }}
      >
        <div className="container py-4">
          <span className="badge bg-warning text-dark px-3 py-2 text-uppercase fw-bold mb-3">
            50 Años de Tradición
          </span>
          <h1 className="display-4 fw-bold mb-3">Pastelería Mil Sabores</h1>
          <p className="lead col-md-8 mb-4">
            Endulzando los momentos más memorables de las familias chilenas desde 1976. 
            Recetas tradicionales, ingredientes de primera selección y repostería personalizada.
          </p>
          <div className="d-flex flex-wrap gap-2">
            <button className="btn btn-custom btn-lg px-4" onClick={onGoToCatalog}>
              Ver Catálogo Completo
            </button>
            <div className="badge bg-light text-dark d-flex align-items-center px-3 fs-6">
              Usa el cupón <strong className="ms-1 text-danger">FELICES50</strong> para 10% OFF
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5 text-center">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-4">
            <div className="display-5 text-custom mb-3">
              <i className="bi bi-award"></i>
            </div>
            <h5 className="fw-bold">Calidad Artesanal</h5>
            <p className="text-muted small mb-0">
              Elaboración diaria con materias primas frescas y recetas familiares transmitidas por generaciones.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-4">
            <div className="display-5 text-custom mb-3">
              <i className="bi bi-heart-pulse"></i>
            </div>
            <h5 className="fw-bold">Línea Saludable</h5>
            <p className="text-muted small mb-0">
              Opciones sin azúcar, libres de gluten y alternativas 100% veganas para que todos disfruten.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-4">
            <div className="display-5 text-custom mb-3">
              <i className="bi bi-truck"></i>
            </div>
            <h5 className="fw-bold">Despacho Seguro</h5>
            <p className="text-muted small mb-0">
              Entregas cuidadosas en la Región Metropolitana, Valparaíso y Biobío para que tu torta llegue impecable.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h3 className="fw-bold mb-1">Pasteles Destacados</h3>
            <p className="text-muted small mb-0">Nuestras creaciones favoritas para esta semana</p>
          </div>
          <button className="btn btn-outline-secondary btn-sm" onClick={onGoToCatalog}>
            Ver Todos <i className="bi bi-arrow-right ms-1"></i>
          </button>
        </div>

        <div className="row g-4">
          {featured.map((product) => (
            <div key={product.codigo} className="col-md-4">
              <div className="card h-100 border-0 shadow-sm overflow-hidden">
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="card-img-top"
                  style={{ height: '230px', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => onSelectProduct(product)}
                />
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-secondary-subtle text-dark" style={{ fontSize: '0.75rem' }}>
                      {product.categoria}
                    </span>
                    <span className="badge bg-light text-muted border">{product.codigo}</span>
                  </div>
                  <h5
                    className="card-title fw-bold mb-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSelectProduct(product)}
                  >
                    {product.nombre}
                  </h5>
                  <p className="card-text text-muted small flex-grow-1">
                    {product.descripcion.length > 85
                      ? `${product.descripcion.substring(0, 85)}...`
                      : product.descripcion}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                    <span className="fs-5 fw-bold text-price">
                      ${product.precio.toLocaleString('es-CL')}
                    </span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => onSelectProduct(product)}
                    >
                      Ver Detalle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};