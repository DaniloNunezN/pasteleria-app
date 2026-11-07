import React, { useState } from 'react';
import type { CartItem } from '../data/productService';

interface CheckoutViewProps {
  cart: CartItem[];
  onBackToCart: () => void;
  onPaymentSuccess: (orderData: OrderData) => void;
  onPaymentError: () => void;
}

export interface OrderData {
  nombre: string;
  apellidos: string;
  correo: string;
  calle: string;
  depto: string;
  region: string;
  comuna: string;
  indicaciones: string;
  items: CartItem[];
  total: number;
  orderNumber: string;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  onBackToCart,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    depto: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Santiago',
    indicaciones: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.apellidos || !formData.correo || !formData.calle) {
      setErrorMsg('Por favor completa todos los campos obligatorios (*).');
      return;
    }

    const orderNumber = Math.floor(100000 + Math.random() * 900000).toString();

    const order: OrderData = {
      ...formData,
      items: cart,
      total,
      orderNumber,
    };

    if (formData.correo.toLowerCase().includes('error')) {
      onPaymentError();
    } else {
      onPaymentSuccess(order);
    }
  };

  return (
    <div className="my-4">
      <div className="d-flex align-items-center mb-4">
        <button className="btn btn-outline-secondary me-3" onClick={onBackToCart}>
          <i className="bi bi-arrow-left"></i>
        </button>
        <h2 className="fw-bold mb-0" style={{ color: 'var(--dark-color)' }}>
          Finalizar Compra
        </h2>
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 p-4">
            <h4 className="fw-bold mb-3" style={{ color: 'var(--dark-color)' }}>
              1. Información del Cliente
            </h4>

            {errorMsg && (
              <div className="alert alert-danger py-2 small" role="alert">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label className="form-label small fw-semibold">Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-sm-6">
                  <label className="form-label small fw-semibold">Apellidos *</label>
                  <input
                    type="text"
                    name="apellidos"
                    className="form-control"
                    value={formData.apellidos}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-semibold">Correo Electrónico *</label>
                  <input
                    type="email"
                    name="correo"
                    className="form-control"
                    value={formData.correo}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mt-4">
                  <h4 className="fw-bold mb-3" style={{ color: 'var(--dark-color)' }}>
                    2. Dirección de Entrega
                  </h4>
                </div>

                <div className="col-sm-8">
                  <label className="form-label small fw-semibold">Calle y Número *</label>
                  <input
                    type="text"
                    name="calle"
                    className="form-control"
                    value={formData.calle}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-sm-4">
                  <label className="form-label small fw-semibold">Depto / Casa (Opcional)</label>
                  <input
                    type="text"
                    name="depto"
                    className="form-control"
                    value={formData.depto}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-sm-6">
                  <label className="form-label small fw-semibold">Región</label>
                  <select
                    name="region"
                    className="form-select"
                    value={formData.region}
                    onChange={handleChange}
                  >
                    <option value="Región Metropolitana de Santiago">
                      Región Metropolitana de Santiago
                    </option>
                    <option value="Región de Valparaíso">Región de Valparaíso</option>
                  </select>
                </div>

                <div className="col-sm-6">
                  <label className="form-label small fw-semibold">Comuna</label>
                  <select
                    name="comuna"
                    className="form-select"
                    value={formData.comuna}
                    onChange={handleChange}
                  >
                    <option value="Santiago">Santiago</option>
                    <option value="Providencia">Providencia</option>
                    <option value="Las Condes">Las Condes</option>
                    <option value="San Bernardo">San Bernardo</option>
                    <option value="Cerrillos">Cerrillos</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label small fw-semibold">
                    Indicaciones para la entrega (Opcional)
                  </label>
                  <textarea
                    name="indicaciones"
                    className="form-control"
                    rows={2}
                    value={formData.indicaciones}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="btn btn-custom w-100 py-3 mt-4 fs-5">
                Pagar ahora ${total.toLocaleString('es-CL')}
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card shadow-sm border-0 p-4">
            <h4 className="fw-bold mb-3" style={{ color: 'var(--dark-color)' }}>
              Resumen del Pedido
            </h4>

            <ul className="list-group list-group-flush mb-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center px-0 py-3"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="rounded me-3"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="my-0 fw-semibold">{item.nombre}</h6>
                      <small className="text-muted">Cantidad: {item.cantidad}</small>
                    </div>
                  </div>
                  <span className="fw-bold text-price">
                    ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                  </span>
                </li>
              ))}
            </ul>

            <div className="d-flex justify-content-between fs-5 fw-bold pt-2 border-top">
              <span>Total:</span>
              <span className="text-price">${total.toLocaleString('es-CL')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};