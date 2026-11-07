import React from 'react';
import type { Product } from '../data/productService';
import { ProductCard } from '../components/common/ProductCard';

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
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="my-4">
      <section className="banner mb-5">
        <div className="banner-texto">
          <h1>Pastelería Mil Sabores</h1>
          <p>
            ¡Celebra la dulzura de la vida con Pastelería Mil Sabores! 50 años de tradición y una torta récord Guinness en 1995 nos respaldan. Descubre nuestra nueva tienda online, elige tu postre favorito y saborea momentos inolvidables con nosotros.
          </p>
          <button className="btn-principal" onClick={onGoToCatalog}>
            Ver productos
          </button>
        </div>

        <div className="banner-imagen d-none d-md-block">
          <div className="placeholder-img">
            <img
              src="https://images.unsplash.com/photo-1511018556340-d16986a1c194?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
              alt="Pastelería Mil Sabores"
            />
          </div>
        </div>
      </section>

      <div className="row g-4 mb-5 text-center">
        <div className="col-md-4">
          <div className="card-beneficio h-100 p-4">
            <div className="display-5 mb-2">🧁</div>
            <h5 className="fw-bold mb-2">Calidad Artesanal</h5>
            <p className="small mb-0 text-muted">
              Elaboración diaria con materias primas frescas y recetas familiares transmitidas por generaciones.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card-beneficio h-100 p-4">
            <div className="display-5 mb-2">🌱</div>
            <h5 className="fw-bold mb-2">Línea Saludable</h5>
            <p className="small mb-0 text-muted">
              Opciones sin azúcar, libres de gluten y alternativas 100% veganas para que todos disfruten.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card-beneficio h-100 p-4">
            <div className="display-5 mb-2">🚚</div>
            <h5 className="fw-bold mb-2">Despacho Seguro</h5>
            <p className="small mb-0 text-muted">
              Transporte con refrigeración controlada para asegurar que tu pastel llegue fresco e intacto.
            </p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1" style={{ fontSize: '2rem' }}>
            Productos Destacados
          </h2>
          <p className="small mb-0" style={{ color: 'var(--color-texto-principal)' }}>
            Descubre nuestras opciones más populares
          </p>
        </div>
        <button className="btn btn-outline-secondary btn-sm" onClick={onGoToCatalog}>
          Ver Todo el Catálogo →
        </button>
      </div>

      <div className="row g-4">
        {featuredProducts.map((product) => (
          <div key={product.codigo} className="col-12 col-sm-6 col-lg-3">
            <div
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (!target.closest('button')) {
                  onSelectProduct(product);
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <ProductCard
                product={product}
                onAddToCart={() => onSelectProduct(product)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};