import React from 'react';

export type CurrentView =
  | 'home'
  | 'catalog'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'payment-success'
  | 'payment-error'
  | 'contact'
  | 'login'
  | 'admin';

interface NavbarProps {
  currentView: CurrentView;
  onNavigate: (view: CurrentView) => void;
  cartCount: number;
  userEmail: string | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cartCount,
  userEmail,
  onLogout,
}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top" style={{ backgroundColor: 'var(--color-chocolate)' }}>
      <div className="container">
        <a
          className="navbar-brand fw-bold d-flex align-items-center"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
        >
          <i className="bi bi-cake2-fill me-2 fs-4" style={{ color: 'var(--color-rosa)' }}></i>
          <span>Mil Sabores</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`nav-link ${currentView === 'home' ? 'active fw-bold' : ''}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home');
                }}
              >
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${currentView === 'catalog' ? 'active fw-bold' : ''}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('catalog');
                }}
              >
                Catálogo
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${currentView === 'contact' ? 'active fw-bold' : ''}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                }}
              >
                Contacto
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${currentView === 'admin' ? 'active fw-bold' : ''}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('admin');
                }}
              >
                Administración
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            {userEmail ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  <span className="d-inline-block text-truncate" style={{ maxWidth: '140px' }}>
                    {userEmail}
                  </span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow">
                  <li>
                    <button className="dropdown-item small text-danger" onClick={onLogout}>
                      <i className="bi bi-box-arrow-right me-1"></i> Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                className={`btn btn-sm ${currentView === 'login' ? 'btn-light' : 'btn-outline-light'}`}
                onClick={() => onNavigate('login')}
              >
                <i className="bi bi-person me-1"></i> Iniciar Sesión
              </button>
            )}

            <button
              className="btn btn-custom btn-sm position-relative ms-2"
              onClick={() => onNavigate('cart')}
            >
              <i className="bi bi-cart3 me-1"></i> Carrito
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