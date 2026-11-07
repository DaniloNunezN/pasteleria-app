import React from 'react';

export type CurrentView =
  | 'home'
  | 'catalog'
  | 'product-detail'
  | 'about'
  | 'blogs'
  | 'cart'
  | 'checkout'
  | 'payment-success'
  | 'payment-error'
  | 'contact'
  | 'login'
  | 'profile'
  | 'admin';

interface NavbarProps {
  currentView: CurrentView;
  onNavigate: (view: CurrentView) => void;
  cartCount: number;
  userEmail: string | null;
  isAdmin: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cartCount,
  userEmail,
  isAdmin,
  onLogout,
}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top">
      <div className="container">
        <a
          className="navbar-brand fw-bold d-flex align-items-center text-dark"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
        >
          <img
            src="/Logo_pasteleria_mil_sabores.png"
            alt="Mil Sabores"
            width="38"
            height="38"
            className="me-2 rounded-circle object-fit-cover border"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          <span style={{ color: 'var(--color-chocolate, #4A2E18)', fontFamily: 'Pacifico, cursive, sans-serif' }}>
            Mil Sabores
          </span>
        </a>

        <button
          className="navbar-toggler border-0"
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
                className={`nav-link px-3 ${currentView === 'home' ? 'fw-bold active text-danger' : 'text-dark'}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home');
                }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link px-3 ${currentView === 'catalog' ? 'fw-bold active text-danger' : 'text-dark'}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('catalog');
                }}
              >
                Productos
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link px-3 ${currentView === 'about' ? 'fw-bold active text-danger' : 'text-dark'}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('about');
                }}
              >
                Nosotros
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link px-3 ${currentView === 'blogs' ? 'fw-bold active text-danger' : 'text-dark'}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('blogs');
                }}
              >
                Blogs
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link px-3 ${currentView === 'contact' ? 'fw-bold active text-danger' : 'text-dark'}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                }}
              >
                Contacto
              </a>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <a
                  className={`nav-link px-3 fw-bold ${currentView === 'admin' ? 'text-primary' : 'text-warning'}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('admin');
                  }}
                >
                  <span className="me-1">⚙️</span> Administración
                </a>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {userEmail ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary btn-sm dropdown-toggle d-flex align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <span className="me-1">👤</span>
                  <span className="d-inline-block text-truncate" style={{ maxWidth: '140px' }}>
                    {userEmail}
                  </span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow">
                  <li>
                    <button className="dropdown-item small" onClick={() => onNavigate('profile')}>
                      <span className="me-1">📋</span> Mi Perfil
                    </button>
                  </li>
                  {isAdmin && (
                    <li>
                      <button className="dropdown-item small" onClick={() => onNavigate('admin')}>
                        <span className="me-1">🛠️</span> Panel Admin
                      </button>
                    </li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item small text-danger" onClick={onLogout}>
                      <span className="me-1">🚪</span> Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                className={`btn btn-sm ${currentView === 'login' ? 'btn-secondary' : 'btn-outline-dark'}`}
                onClick={() => onNavigate('login')}
              >
                <span className="me-1">👤</span> Iniciar sesión
              </button>
            )}

            <button
              className="btn btn-danger btn-sm position-relative ms-2 fw-semibold"
              onClick={() => onNavigate('cart')}
              style={{ backgroundColor: 'var(--color-rosa, #D96B43)', borderColor: 'var(--color-rosa, #D96B43)' }}
            >
              <span className="me-1">🛒</span> Carrito
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
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