import React from 'react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cartCount,
}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        <span
          className="navbar-brand fw-bold"
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('home')}
        >
          <i className="bi bi-cake2-fill me-2"></i>
          Mil Sabores
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link nav-link-custom ${
                  currentView === 'home' ? 'active' : ''
                }`}
                onClick={() => onNavigate('home')}
              >
                Inicio
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link nav-link-custom ${
                  currentView === 'products' ? 'active' : ''
                }`}
                onClick={() => onNavigate('products')}
              >
                Catálogo
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link nav-link-custom ${
                  currentView === 'admin' ? 'active' : ''
                }`}
                onClick={() => onNavigate('admin')}
              >
                Administración
              </button>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-light position-relative"
              onClick={() => onNavigate('cart')}
            >
              <i className="bi bi-cart3 me-1"></i>
              Carrito
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};