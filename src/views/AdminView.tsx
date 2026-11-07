import React, { useState } from 'react';
import { productService, type Product } from '../data/productService';

interface AdminViewProps {
  products: Product[];
  onRefresh: () => void;
  onBackToStore: () => void;
}

const CATEGORIAS = [
  'Tortas Cuadradas',
  'Tortas Circulares',
  'Postres Individuales',
  'Productos Sin Azúcar',
  'Pastelería Tradicional',
  'Productos Sin Gluten',
  'Productos Vegana',
  'Tortas Especiales',
];

interface FormState {
  codigo: string;
  nombre: string;
  categoria: string;
  precio: string;
  descripcion: string;
  imagen: string;
  stock: string;
  stockCritico: string;
}

export const AdminView: React.FC<AdminViewProps> = ({
  products,
  onRefresh,
  onBackToStore,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingCodigo, setEditingCodigo] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormState>({
    codigo: '',
    nombre: '',
    categoria: CATEGORIAS[0],
    precio: '',
    descripcion: '',
    imagen: '',
    stock: '',
    stockCritico: '2',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.codigo.trim()) {
      newErrors.codigo = 'El código es requerido.';
    }

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido.';
    }

    const precioNum = Number(formData.precio);
    if (!formData.precio || isNaN(precioNum) || precioNum <= 0) {
      newErrors.precio = 'El precio debe ser un número mayor a 0.';
    }

    const stockNum = Number(formData.stock);
    if (formData.stock === '' || isNaN(stockNum) || stockNum < 0) {
      newErrors.stock = 'El stock debe ser un número mayor o igual a 0.';
    }

    if (!formData.imagen.trim()) {
      newErrors.imagen = 'La URL de la imagen es requerida.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStartCreate = () => {
    setIsEditing(false);
    setEditingCodigo(null);
    setFormData({
      codigo: '',
      nombre: '',
      categoria: CATEGORIAS[0],
      precio: '',
      descripcion: '',
      imagen: '',
      stock: '',
      stockCritico: '2',
    });
    setErrors({});
  };

  const handleStartEdit = (product: Product) => {
    setIsEditing(true);
    setEditingCodigo(product.codigo);
    setFormData({
      codigo: product.codigo,
      nombre: product.nombre,
      categoria: product.categoria,
      precio: product.precio.toString(),
      descripcion: product.descripcion,
      imagen: product.imagen,
      stock: product.stock.toString(),
      stockCritico: (product.stockCritico ?? 2).toString(),
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: Product = {
      codigo: formData.codigo.trim().toUpperCase(),
      nombre: formData.nombre.trim(),
      categoria: formData.categoria,
      precio: Number(formData.precio),
      descripcion: formData.descripcion.trim(),
      imagen: formData.imagen.trim(),
      stock: Number(formData.stock),
      stockCritico: Number(formData.stockCritico) || 2,
    };

    if (isEditing && editingCodigo) {
      productService.update(editingCodigo, payload);
      setAlertMessage('Producto actualizado exitosamente.');
    } else {
      if (productService.getByCodigo(payload.codigo)) {
        setErrors({ codigo: 'Ya existe un producto con este código.' });
        return;
      }
      productService.create(payload);
      setAlertMessage('Producto creado exitosamente.');
    }

    handleStartCreate();
    onRefresh();

    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  const handleDelete = (codigo: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el producto ${codigo}?`)) {
      productService.delete(codigo);
      onRefresh();
      setAlertMessage('Producto eliminado exitosamente.');
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
    }
  };

  const handleResetCatalog = () => {
    if (window.confirm('¿Deseas restaurar el catálogo predeterminado de 16 productos?')) {
      productService.resetDefaults();
      onRefresh();
      setAlertMessage('Catálogo restaurado a valores por defecto.');
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1">Panel de Administración</h2>
          <p className="text-muted small mb-0">Gestión de inventario y catálogo de pastelería</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-danger btn-sm" onClick={handleResetCatalog}>
            <i className="bi bi-arrow-counterclockwise me-1"></i> Restaurar Catálogo
          </button>
          <button className="btn btn-outline-secondary btn-sm" onClick={onBackToStore}>
            <i className="bi bi-arrow-left me-1"></i> Volver a la Tienda
          </button>
        </div>
      </div>

      {alertMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {alertMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlertMessage(null)}
          ></button>
        </div>
      )}

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="fw-bold mb-3">
              {isEditing ? `Editar Producto (${editingCodigo})` : 'Nuevo Producto'}
            </h5>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Código Alfanumérico *</label>
                <input
                  type="text"
                  name="codigo"
                  placeholder="Ej: TC003"
                  className={`form-control form-control-sm text-uppercase ${errors.codigo ? 'is-invalid' : ''}`}
                  value={formData.codigo}
                  onChange={handleChange}
                  disabled={isEditing}
                />
                {errors.codigo && <div className="invalid-feedback">{errors.codigo}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Nombre del Pastel *</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre representativo"
                  className={`form-control form-control-sm ${errors.nombre ? 'is-invalid' : ''}`}
                  value={formData.nombre}
                  onChange={handleChange}
                />
                {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Categoría *</label>
                <select
                  name="categoria"
                  className="form-select form-select-sm"
                  value={formData.categoria}
                  onChange={handleChange}
                >
                  {CATEGORIAS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label small fw-semibold">Precio ($CLP) *</label>
                  <input
                    type="number"
                    name="precio"
                    min="1"
                    className={`form-control form-control-sm ${errors.precio ? 'is-invalid' : ''}`}
                    value={formData.precio}
                    onChange={handleChange}
                  />
                  {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}
                </div>

                <div className="col-6">
                  <label className="form-label small fw-semibold">Stock Actual *</label>
                  <input
                    type="number"
                    name="stock"
                    min="0"
                    className={`form-control form-control-sm ${errors.stock ? 'is-invalid' : ''}`}
                    value={formData.stock}
                    onChange={handleChange}
                  />
                  {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Stock Crítico</label>
                <input
                  type="number"
                  name="stockCritico"
                  min="1"
                  className="form-control form-control-sm"
                  value={formData.stockCritico}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">URL de la Imagen *</label>
                <input
                  type="url"
                  name="imagen"
                  placeholder="https://..."
                  className={`form-control form-control-sm ${errors.imagen ? 'is-invalid' : ''}`}
                  value={formData.imagen}
                  onChange={handleChange}
                />
                {errors.imagen && <div className="invalid-feedback">{errors.imagen}</div>}
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold">Descripción</label>
                <textarea
                  name="descripcion"
                  rows={3}
                  className="form-control form-control-sm"
                  placeholder="Detalle de ingredientes o elaboración..."
                  value={formData.descripcion}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-custom w-100 py-2 fw-bold">
                  {isEditing ? 'Guardar Cambios' : 'Registrar Producto'}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={handleStartCreate}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Stock</th>
                    <th scope="col" className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => {
                    const isLowStock = p.stock <= (p.stockCritico ?? 2);
                    return (
                      <tr key={p.codigo}>
                        <td className="fw-bold">{p.codigo}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={p.imagen}
                              alt={p.nombre}
                              className="rounded me-2"
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                            <span className="small fw-semibold">{p.nombre}</span>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-secondary-subtle text-dark small">
                            {p.categoria}
                          </span>
                        </td>
                        <td className="fw-bold text-price">${p.precio.toLocaleString('es-CL')}</td>
                        <td>
                          <span className={`badge ${isLowStock ? 'bg-danger' : 'bg-success'}`}>
                            {p.stock} unid.
                          </span>
                        </td>
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm me-1"
                            onClick={() => handleStartEdit(p)}
                            title="Editar"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(p.codigo)}
                            title="Eliminar"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};