import React, { useState } from 'react';
import { productService, type Product } from '../data/productService';
import type { OrderData } from './CheckoutView';

interface AdminViewProps {
  products: Product[];
  orders: OrderData[];
  onUpdateOrderStatus: (orderNumber: string, newStatus: string) => void;
  onRefresh: () => void;
  onBackToStore: () => void;
}

type AdminTab = 'dashboard' | 'productos' | 'ordenes' | 'reportes' | 'usuarios' | 'perfil';

interface UserRecord {
  correo: string;
  nombre: string;
  rol: 'Admin' | 'Cliente';
  telefono: string;
}

export const AdminView: React.FC<AdminViewProps> = ({
  products,
  orders,
  onUpdateOrderStatus,
  onRefresh,
  onBackToStore,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const [categoriesList, setCategoriesList] = useState<string[]>(() => {
    const fromProds = Array.from(new Set(products.map((p) => p.categoria)));
    return fromProds.length > 0
      ? fromProds
      : ['Tortas Cuadradas', 'Tortas Circulares', 'Sin Azúcar', 'Sin Gluten', 'Productos Veganos'];
  });
  const [newCategoryName, setNewCategoryName] = useState('');

  const [usersList, setUsersList] = useState<UserRecord[]>(() => {
    const saved = localStorage.getItem('PASTELERIA_USERS_LIST');
    if (saved) return JSON.parse(saved);
    return [
      {
        correo: 'admin@pasteleria.cl',
        nombre: 'Administrador Principal',
        rol: 'Admin',
        telefono: '+56 9 1234 5678',
      },
      {
        correo: 'cliente@duoc.cl',
        nombre: 'Estudiante Duoc UC',
        rol: 'Cliente',
        telefono: '+56 9 8765 4321',
      },
      {
        correo: 'profesor@profesor.duoc.cl',
        nombre: 'Docente Gastronomía',
        rol: 'Cliente',
        telefono: '+56 9 9988 7766',
      },
    ];
  });

  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<OrderData | null>(null);

  const [newProd, setNewProd] = useState({
    codigo: '',
    nombre: '',
    categoria: categoriesList[0] || 'Tortas Cuadradas',
    precio: 0,
    stock: 0,
    descripcion: '',
    imagen: '',
  });

  const saveUsers = (updated: UserRecord[]) => {
    setUsersList(updated);
    localStorage.setItem('PASTELERIA_USERS_LIST', JSON.stringify(updated));
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newCategoryName.trim();
    if (!clean) return;
    if (!categoriesList.includes(clean)) {
      setCategoriesList([...categoriesList, clean]);
      setNewProd({ ...newProd, categoria: clean });
    }
    setNewCategoryName('');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.codigo || !newProd.nombre || newProd.precio <= 0) {
      alert('Por favor ingrese código, nombre y precio válido.');
      return;
    }
    productService.create({
      ...newProd,
      imagen:
        newProd.imagen ||
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    });
    onRefresh();
    setNewProd({
      codigo: '',
      nombre: '',
      categoria: categoriesList[0] || 'Tortas Cuadradas',
      precio: 0,
      stock: 0,
      descripcion: '',
      imagen: '',
    });
  };

  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    productService.update(editingProduct.codigo, editingProduct);
    setEditingProduct(null);
    onRefresh();
  };

  const handleDeleteProduct = (codigo: string) => {
    if (confirm(`¿Seguro que deseas eliminar el producto ${codigo}?`)) {
      productService.delete(codigo);
      onRefresh();
    }
  };

  const handleResetCatalog = () => {
    if (confirm('¿Restaurar el catálogo a los productos originales de fábrica?')) {
      productService.resetToDefault();
      onRefresh();
    }
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    const updated = usersList.map((u) => (u.correo === editingUser.correo ? editingUser : u));
    saveUsers(updated);
    setEditingUser(null);
  };

  const handleDeleteUser = (correo: string) => {
    if (correo === 'admin@pasteleria.cl') {
      alert('No puedes eliminar al administrador principal.');
      return;
    }
    if (confirm(`¿Eliminar al usuario ${correo}?`)) {
      saveUsers(usersList.filter((u) => u.correo !== correo));
    }
  };

  const totalVentas = orders.reduce((acc, o) => acc + o.total, 0);
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const stockCritico = products.filter((p) => p.stock <= 3);

  return (
    <div className="admin-layout my-3 shadow-sm rounded-3 overflow-hidden bg-white border">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h1
            className="h4 m-0"
            style={{ color: 'var(--color-chocolate)', fontFamily: 'Pacifico, cursive' }}
          >
            Mil Sabores
          </h1>
          <span className="small text-muted">Panel Administrativo</span>
        </div>

        <nav className="admin-nav">
          <p className="nav-titulo">GESTIÓN GENERAL</p>
          <button
            type="button"
            className={`nav-item border-0 w-100 text-start ${activeTab === 'dashboard' ? 'activo' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Dashboard
          </button>

          <button
            type="button"
            className={`nav-item border-0 w-100 text-start ${activeTab === 'productos' ? 'activo' : ''}`}
            onClick={() => setActiveTab('productos')}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            Productos &amp; Categorías
          </button>

          <button
            type="button"
            className={`nav-item border-0 w-100 text-start ${activeTab === 'ordenes' ? 'activo' : ''}`}
            onClick={() => setActiveTab('ordenes')}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Órdenes &amp; Boletas
          </button>

          <button
            type="button"
            className={`nav-item border-0 w-100 text-start ${activeTab === 'reportes' ? 'activo' : ''}`}
            onClick={() => setActiveTab('reportes')}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
            Reportes &amp; Métricas
          </button>

          <p className="nav-titulo secundaria">CONFIGURACIÓN</p>
          <button
            type="button"
            className={`nav-item border-0 w-100 text-start ${activeTab === 'usuarios' ? 'activo' : ''}`}
            onClick={() => setActiveTab('usuarios')}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Usuarios Registrados
          </button>

          <button
            type="button"
            className={`nav-item border-0 w-100 text-start ${activeTab === 'perfil' ? 'activo' : ''}`}
            onClick={() => setActiveTab('perfil')}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Mi Perfil Admin
          </button>
        </nav>

        <div className="sidebar-perfil mt-auto p-3 border-top">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm w-100 mb-2 d-flex align-items-center justify-content-center gap-1"
            onClick={onBackToStore}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Ir a la Tienda
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm w-100 d-flex align-items-center justify-content-center gap-1"
            onClick={handleResetCatalog}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
            Restaurar Catálogo
          </button>
        </div>
      </aside>

      <main className="admin-main p-4" style={{ backgroundColor: 'var(--color-fondo)' }}>
        {activeTab === 'dashboard' && (
          <div>
            <div className="admin-header mb-4">
              <div className="bienvenida">
                <span>Panel administrativo</span>
                <h2>Resumen Operativo</h2>
              </div>
            </div>

            <div className="dashboard-resumen mb-4">
              <article className="resumen-card">
                <div className="resumen-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div>
                  <span>Ventas Totales</span>
                  <strong>${totalVentas.toLocaleString('es-CL')}</strong>
                </div>
              </article>

              <article className="resumen-card">
                <div className="resumen-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <div>
                  <span>Pedidos Realizados</span>
                  <strong>{orders.length}</strong>
                </div>
              </article>

              <article className="resumen-card">
                <div className="resumen-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  </svg>
                </div>
                <div>
                  <span>Unidades en Stock</span>
                  <strong>{totalStock}</strong>
                </div>
              </article>

              <article className="resumen-card">
                <div className="resumen-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <span>Clientes Registrados</span>
                  <strong>{usersList.length}</strong>
                </div>
              </article>
            </div>

            <div className="row g-4">
              <div className="col-lg-6">
                <div className="dashboard-seccion p-3 bg-white rounded-3 border">
                  <h4
                    className="h6 fw-bold mb-3 d-flex align-items-center gap-2"
                    style={{ color: 'var(--color-chocolate)' }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    Últimas Órdenes Registradas
                  </h4>
                  {orders.length === 0 ? (
                    <p className="text-muted small">No hay pedidos registrados todavía.</p>
                  ) : (
                    <div className="list-group list-group-flush">
                      {orders.slice(0, 4).map((ord) => (
                        <div
                          key={ord.orderNumber}
                          className="list-group-item d-flex justify-content-between align-items-center px-0"
                        >
                          <div>
                            <strong className="d-block small">{ord.orderNumber}</strong>
                            <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                              {ord.cliente} - {ord.correo}
                            </span>
                          </div>
                          <span className="badge bg-warning text-dark">{ord.estado}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="dashboard-seccion p-3 bg-white rounded-3 border">
                  <h4 className="h6 fw-bold mb-3 text-danger d-flex align-items-center gap-2">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    Alerta de Stock Crítico (≤ 3 unidades)
                  </h4>
                  {stockCritico.length === 0 ? (
                    <p className="text-success small">
                      Todo el inventario se encuentra en niveles óptimos.
                    </p>
                  ) : (
                    <ul className="list-group list-group-flush">
                      {stockCritico.map((p) => (
                        <li
                          key={p.codigo}
                          className="list-group-item d-flex justify-content-between align-items-center px-0"
                        >
                          <span className="small">
                            {p.nombre} ({p.codigo})
                          </span>
                          <span className="badge bg-danger rounded-pill">{p.stock} unid.</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'productos' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="h5 fw-bold" style={{ color: 'var(--color-chocolate)' }}>
                Gestión de Catálogo &amp; Categorías
              </h3>
            </div>

            <div className="card p-3 mb-4 bg-white border">
              <h5 className="h6 fw-bold mb-2">Crear Nueva Categoría</h5>
              <form onSubmit={handleAddCategory} className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Nombre de la nueva categoría (Ej: Tortas Especiales)"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-custom btn-sm px-3 d-flex align-items-center gap-1"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Crear
                </button>
              </form>
              <div className="d-flex gap-1 flex-wrap mt-2">
                {categoriesList.map((c) => (
                  <span key={c} className="badge bg-light text-dark border">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="card p-3 mb-4 bg-white border">
              <h5 className="h6 fw-bold mb-3">Añadir Nuevo Producto</h5>
              <form onSubmit={handleAddProduct} className="row g-2">
                <div className="col-md-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Código (Ej: TC005)"
                    value={newProd.codigo}
                    onChange={(e) =>
                      setNewProd({ ...newProd, codigo: e.target.value.toUpperCase() })
                    }
                    required
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Nombre"
                    value={newProd.nombre}
                    onChange={(e) => setNewProd({ ...newProd, nombre: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select form-select-sm"
                    value={newProd.categoria}
                    onChange={(e) => setNewProd({ ...newProd, categoria: e.target.value })}
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Precio CLP"
                    value={newProd.precio || ''}
                    onChange={(e) => setNewProd({ ...newProd, precio: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Stock"
                    value={newProd.stock || ''}
                    onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Descripción"
                    value={newProd.descripcion}
                    onChange={(e) => setNewProd({ ...newProd, descripcion: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="URL Imagen (opcional)"
                    value={newProd.imagen}
                    onChange={(e) => setNewProd({ ...newProd, imagen: e.target.value })}
                  />
                </div>
                <div className="col-12 text-end">
                  <button
                    type="submit"
                    className="btn btn-custom btn-sm px-4 d-inline-flex align-items-center gap-1"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Guardar Producto
                  </button>
                </div>
              </form>
            </div>

            <div className="table-responsive bg-white rounded-3 border">
              <table className="table table-hover align-middle mb-0 small">
                <thead className="table-light">
                  <tr>
                    <th>Código</th>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.codigo}>
                      <td className="fw-bold">{p.codigo}</td>
                      <td>
                        <img
                          src={p.imagen}
                          alt=""
                          style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                          }}
                        />
                      </td>
                      <td>{p.nombre}</td>
                      <td>
                        <span className="badge bg-light text-dark border">{p.categoria}</span>
                      </td>
                      <td className="fw-bold">${p.precio.toLocaleString('es-CL')}</td>
                      <td>
                        <span className={`badge ${p.stock <= 3 ? 'bg-danger' : 'bg-success'}`}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm me-1"
                          onClick={() => setEditingProduct(p)}
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDeleteProduct(p.codigo)}
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {editingProduct && (
              <div
                className="modal fade show d-block"
                tabIndex={-1}
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <form onSubmit={handleSaveEditProduct}>
                      <div className="modal-header">
                        <h5 className="modal-title h6 fw-bold">
                          Editar Producto: {editingProduct.codigo}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setEditingProduct(null)}
                        ></button>
                      </div>
                      <div className="modal-body small">
                        <div className="mb-2">
                          <label className="form-label">Nombre</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={editingProduct.nombre}
                            onChange={(e) =>
                              setEditingProduct({ ...editingProduct, nombre: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="mb-2">
                          <label className="form-label">Categoría</label>
                          <select
                            className="form-select form-select-sm"
                            value={editingProduct.categoria}
                            onChange={(e) =>
                              setEditingProduct({ ...editingProduct, categoria: e.target.value })
                            }
                          >
                            {categoriesList.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="row g-2 mb-2">
                          <div className="col-6">
                            <label className="form-label">Precio CLP</label>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={editingProduct.precio}
                              onChange={(e) =>
                                setEditingProduct({
                                  ...editingProduct,
                                  precio: Number(e.target.value),
                                })
                              }
                              required
                            />
                          </div>
                          <div className="col-6">
                            <label className="form-label">Stock</label>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={editingProduct.stock}
                              onChange={(e) =>
                                setEditingProduct({
                                  ...editingProduct,
                                  stock: Number(e.target.value),
                                })
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-2">
                          <label className="form-label">Descripción</label>
                          <textarea
                            className="form-control form-control-sm"
                            rows={2}
                            value={editingProduct.descripcion}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                descripcion: e.target.value,
                              })
                            }
                          ></textarea>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditingProduct(null)}
                        >
                          Cancelar
                        </button>
                        <button type="submit" className="btn btn-custom btn-sm">
                          Guardar Cambios
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ordenes' && (
          <div>
            <h3 className="h5 fw-bold mb-3" style={{ color: 'var(--color-chocolate)' }}>
              Órdenes &amp; Emisión de Boletas
            </h3>
            {orders.length === 0 ? (
              <div className="p-4 bg-white rounded-3 border text-center text-muted">
                No hay órdenes de compra registradas todavía.
              </div>
            ) : (
              <div className="table-responsive bg-white rounded-3 border">
                <table className="table table-hover align-middle mb-0 small">
                  <thead className="table-light">
                    <tr>
                      <th>N° Orden</th>
                      <th>Fecha</th>
                      <th>Cliente</th>
                      <th>Correo</th>
                      <th>Total</th>
                      <th>Estado</th>
                      <th className="text-end">Boleta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((ord) => (
                      <tr key={ord.orderNumber}>
                        <td className="fw-bold">{ord.orderNumber}</td>
                        <td>{ord.fecha}</td>
                        <td>{ord.cliente}</td>
                        <td>{ord.correo}</td>
                        <td className="fw-bold">${ord.total.toLocaleString('es-CL')}</td>
                        <td>
                          <select
                            className="form-select form-select-sm"
                            style={{ width: '130px' }}
                            value={ord.estado}
                            onChange={(e) =>
                              onUpdateOrderStatus(ord.orderNumber, e.target.value)
                            }
                          >
                            <option value="Pendiente">Pendiente</option>
                            <option value="En Preparación">En Preparación</option>
                            <option value="Enviado">Enviado</option>
                            <option value="Entregado">Entregado</option>
                          </select>
                        </td>
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-outline-dark btn-sm d-inline-flex align-items-center gap-1"
                            onClick={() => setSelectedReceiptOrder(ord)}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                            </svg>
                            Ver Boleta
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedReceiptOrder && (
              <div
                className="modal fade show d-block"
                tabIndex={-1}
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content p-3 border-0 shadow">
                    <div className="modal-header border-0 pb-0">
                      <h5
                        className="modal-title fw-bold"
                        style={{
                          color: 'var(--color-chocolate)',
                          fontFamily: 'Pacifico, cursive',
                        }}
                      >
                        Boleta Electrónica
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setSelectedReceiptOrder(null)}
                      ></button>
                    </div>
                    <div className="modal-body small">
                      <div className="text-center mb-3">
                        <strong className="d-block fs-6">PASTELERÍA MIL SABORES S.A.</strong>
                        <span className="text-muted">R.U.T.: 76.543.210-K</span>
                        <br />
                        <span className="text-muted">Giro: Fabricación y venta de repostería</span>
                        <br />
                        <span className="text-muted">Av. Concha y Toro 1340, Puente Alto</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between mb-1">
                        <span>
                          <strong>N° Boleta:</strong> {selectedReceiptOrder.orderNumber}
                        </span>
                        <span>
                          <strong>Fecha:</strong> {selectedReceiptOrder.fecha}
                        </span>
                      </div>
                      <div className="mb-2">
                        <span>
                          <strong>Cliente:</strong> {selectedReceiptOrder.cliente}
                        </span>
                        <br />
                        <span>
                          <strong>Dirección:</strong> {selectedReceiptOrder.direccion},{' '}
                          {selectedReceiptOrder.comuna}
                        </span>
                      </div>
                      <table className="table table-sm table-bordered mt-2">
                        <thead className="table-light">
                          <tr>
                            <th>Detalle</th>
                            <th className="text-center">Cant.</th>
                            <th className="text-end">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedReceiptOrder.items.map((it) => (
                            <tr key={it.codigo}>
                              <td>{it.nombre}</td>
                              <td className="text-center">{it.cantidad}</td>
                              <td className="text-end">
                                ${(it.precio * it.cantidad).toLocaleString('es-CL')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="text-end">
                        <div className="text-muted">
                          Subtotal: ${selectedReceiptOrder.subtotal.toLocaleString('es-CL')}
                        </div>
                        {selectedReceiptOrder.descuento > 0 && (
                          <div className="text-success">
                            Descuento: -${selectedReceiptOrder.descuento.toLocaleString('es-CL')}
                          </div>
                        )}
                        <h5
                          className="fw-bold mt-1"
                          style={{ color: 'var(--color-chocolate)' }}
                        >
                          Total Pagado: ${selectedReceiptOrder.total.toLocaleString('es-CL')}
                        </h5>
                      </div>
                    </div>
                    <div className="modal-footer border-0 pt-0">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => window.print()}
                      >
                        Imprimir
                      </button>
                      <button
                        type="button"
                        className="btn btn-custom btn-sm"
                        onClick={() => setSelectedReceiptOrder(null)}
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reportes' && (
          <div>
            <h3 className="h5 fw-bold mb-3" style={{ color: 'var(--color-chocolate)' }}>
              Reportes &amp; Estadísticas
            </h3>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="card p-3 bg-white border">
                  <span className="text-muted small">Ingresos Brutos</span>
                  <strong className="fs-4" style={{ color: 'var(--color-chocolate)' }}>
                    ${totalVentas.toLocaleString('es-CL')}
                  </strong>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 bg-white border">
                  <span className="text-muted small">Ticket Promedio por Venta</span>
                  <strong className="fs-4">
                    $
                    {orders.length > 0
                      ? Math.round(totalVentas / orders.length).toLocaleString('es-CL')
                      : '0'}
                  </strong>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 bg-white border">
                  <span className="text-muted small">Productos en Alerta de Stock</span>
                  <strong className="fs-4 text-danger">{stockCritico.length}</strong>
                </div>
              </div>
            </div>

            <div className="card p-3 bg-white border">
              <h5 className="h6 fw-bold mb-3">Distribución de Inventario por Categoría</h5>
              <div className="table-responsive">
                <table className="table table-sm align-middle mb-0 small">
                  <thead className="table-light">
                    <tr>
                      <th>Categoría</th>
                      <th>Variedad de Productos</th>
                      <th>Stock Total Acumulado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriesList.map((cat) => {
                      const prods = products.filter((p) => p.categoria === cat);
                      const cant = prods.reduce((acc, p) => acc + p.stock, 0);
                      return (
                        <tr key={cat}>
                          <td className="fw-bold">{cat}</td>
                          <td>{prods.length} tipos</td>
                          <td>{cant} unidades</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'usuarios' && (
          <div>
            <h3 className="h5 fw-bold mb-3" style={{ color: 'var(--color-chocolate)' }}>
              Usuarios Registrados
            </h3>
            <div className="table-responsive bg-white rounded-3 border">
              <table className="table table-hover align-middle mb-0 small">
                <thead className="table-light">
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Rol</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((u) => (
                    <tr key={u.correo}>
                      <td className="fw-bold">{u.nombre}</td>
                      <td>{u.correo}</td>
                      <td>{u.telefono}</td>
                      <td>
                        <span
                          className={`badge ${u.rol === 'Admin' ? 'bg-primary' : 'bg-secondary'}`}
                        >
                          {u.rol}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm me-1"
                          onClick={() => setEditingUser(u)}
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDeleteUser(u.correo)}
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {editingUser && (
              <div
                className="modal fade show d-block"
                tabIndex={-1}
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <form onSubmit={handleSaveUser}>
                      <div className="modal-header">
                        <h5 className="modal-title h6 fw-bold">Editar Usuario</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setEditingUser(null)}
                        ></button>
                      </div>
                      <div className="modal-body small">
                        <div className="mb-2">
                          <label className="form-label">Correo (identificador)</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={editingUser.correo}
                            disabled
                          />
                        </div>
                        <div className="mb-2">
                          <label className="form-label">Nombre</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={editingUser.nombre}
                            onChange={(e) =>
                              setEditingUser({ ...editingUser, nombre: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="mb-2">
                          <label className="form-label">Teléfono</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={editingUser.telefono}
                            onChange={(e) =>
                              setEditingUser({ ...editingUser, telefono: e.target.value })
                            }
                          />
                        </div>
                        <div className="mb-2">
                          <label className="form-label">Rol del Sistema</label>
                          <select
                            className="form-select form-select-sm"
                            value={editingUser.rol}
                            onChange={(e) =>
                              setEditingUser({
                                ...editingUser,
                                rol: e.target.value as 'Admin' | 'Cliente',
                              })
                            }
                          >
                            <option value="Cliente">Cliente</option>
                            <option value="Admin">Admin</option>
                          </select>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditingUser(null)}
                        >
                          Cancelar
                        </button>
                        <button type="submit" className="btn btn-custom btn-sm">
                          Guardar Cambios
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'perfil' && (
          <div>
            <h3 className="h5 fw-bold mb-3" style={{ color: 'var(--color-chocolate)' }}>
              Perfil del Administrador
            </h3>
            <div className="card p-4 bg-white border" style={{ maxWidth: '600px' }}>
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="rounded-circle p-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: 'var(--color-rosa)',
                    color: 'var(--color-chocolate)',
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <h4 className="h6 fw-bold mb-0">Administrador de Sistemas</h4>
                  <span className="badge bg-primary">Rol: Administrador Total</span>
                </div>
              </div>

              <div className="list-group list-group-flush small">
                <div className="list-group-item d-flex justify-content-between px-0">
                  <span className="text-muted">Correo institucional:</span>
                  <strong>admin@pasteleria.cl</strong>
                </div>
                <div className="list-group-item d-flex justify-content-between px-0">
                  <span className="text-muted">Nivel de permisos:</span>
                  <strong>CRUD completo, reportes y finanzas</strong>
                </div>
                <div className="list-group-item d-flex justify-content-between px-0">
                  <span className="text-muted">Empresa:</span>
                  <strong>Pastelería Mil Sabores SpA</strong>
                </div>
                <div className="list-group-item d-flex justify-content-between px-0">
                  <span className="text-muted">Sede:</span>
                  <strong>Puente Alto, Santiago de Chile</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};