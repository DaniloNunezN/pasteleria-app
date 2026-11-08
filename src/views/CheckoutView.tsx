import React, { useState } from 'react';
import type { CartItem } from '../data/productService';

export interface OrderData {
  orderNumber: string;
  cliente: string;
  correo: string;
  telefono: string;
  direccion: string;
  comuna: string;
  region: string;
  fecha: string;
  items: CartItem[];
  subtotal: number;
  descuento: number;
  total: number;
  estado: string;
  metodoPago: string;
}

interface CheckoutViewProps {
  cart: CartItem[];
  discountPercent: number;
  onBackToCart: () => void;
  onPaymentSuccess: (order: OrderData) => void;
  onPaymentError: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  discountPercent,
  onBackToCart,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState(() => localStorage.getItem('pasteleria_user') || '');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [comuna, setComuna] = useState('San Bernardo');
  const [region, setRegion] = useState('Metropolitana');
  const [metodoPago, setMetodoPago] = useState('WebPay Plus');
  const [simularFallo, setSimularFallo] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const descuento = Math.round(subtotal * (discountPercent / 100));
  const total = subtotal - descuento;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim() || !direccion.trim()) {
      alert('Por favor complete los campos obligatorios de despacho.');
      return;
    }

    if (simularFallo) {
      onPaymentError();
      return;
    }

    const orderNumber = `MS-${Date.now().toString().slice(-6)}`;
    const fecha = new Date().toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const newOrder: OrderData = {
      orderNumber,
      cliente: nombre,
      correo,
      telefono,
      direccion,
      comuna,
      region,
      fecha,
      items: [...cart],
      subtotal,
      descuento,
      total,
      estado: 'Pendiente',
      metodoPago,
    };

    onPaymentSuccess(newOrder);
  };

  return (
    <div className="my-4">
      <div className="mb-4">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1"
          onClick={onBackToCart}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Volver al carrito
        </button>
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card p-4 border-0 shadow-sm bg-white" style={{ border: '1px solid var(--color-rosa)' }}>
            <h4 className="fw-bold mb-3" style={{ color: 'var(--color-chocolate)' }}>
              Datos de Despacho y Facturación
            </h4>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label small fw-bold">Nombre Completo *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Juan Pérez"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-bold">Correo Electrónico *</label>
                  <input
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="ejemplo@duoc.cl"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-bold">Teléfono de Contacto</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+56 9 1234 5678"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold">Dirección de Entrega *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Calle, número, depto o casa"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-bold">Comuna</label>
                  <select
                    className="form-select"
                    value={comuna}
                    onChange={(e) => setComuna(e.target.value)}
                  >
                    <option value="San Bernardo">San Bernardo</option>
                    <option value="Santiago Centro">Santiago Centro</option>
                    <option value="Providencia">Providencia</option>
                    <option value="Las Condes">Las Condes</option>
                    <option value="Ñuñoa">Ñuñoa</option>
                    <option value="Puente Alto">Puente Alto</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-bold">Región</label>
                  <select
                    className="form-select"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option value="Metropolitana">Región Metropolitana</option>
                    <option value="Valparaíso">Región de Valparaíso</option>
                    <option value="Biobío">Región del Biobío</option>
                  </select>
                </div>

                <div className="col-12 mt-4">
                  <h5 className="fw-bold h6 mb-3" style={{ color: 'var(--color-chocolate)' }}>
                    Método de Pago
                  </h5>
                  <div className="d-flex flex-column gap-2">
                    <label className="d-flex align-items-center gap-2 border rounded p-2" style={{ cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="metodoPago"
                        value="WebPay Plus"
                        checked={metodoPago === 'WebPay Plus'}
                        onChange={(e) => setMetodoPago(e.target.value)}
                      />
                      <span>💳 Tarjeta de Débito / Crédito (WebPay Plus)</span>
                    </label>
                    <label className="d-flex align-items-center gap-2 border rounded p-2" style={{ cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="metodoPago"
                        value="Transferencia Bancaria"
                        checked={metodoPago === 'Transferencia Bancaria'}
                        onChange={(e) => setMetodoPago(e.target.value)}
                      />
                      <span>🏦 Transferencia Electrónica Directa</span>
                    </label>
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="simularFalloCheck"
                      checked={simularFallo}
                      onChange={(e) => setSimularFallo(e.target.checked)}
                    />
                    <label className="form-check-label small text-danger" htmlFor="simularFalloCheck">
                      Simular rechazo de pasarela de pago (para probar vista de pago fallido)
                    </label>
                  </div>
                </div>

                <div className="col-12 mt-4">
                  <button
                    type="submit"
                    className="btn btn-custom w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Confirmar y Pagar ${total.toLocaleString('es-CL')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card p-4 border-0 shadow-sm bg-white" style={{ border: '1px solid var(--color-rosa)' }}>
            <h5 className="fw-bold mb-3" style={{ color: 'var(--color-chocolate)' }}>
              Detalle de tu Compra
            </h5>

            <div className="list-group list-group-flush mb-3">
              {cart.map((item) => (
                <div key={item.codigo} className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <div>
                    <strong className="d-block small">{item.nombre}</strong>
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                      {item.cantidad} x ${item.precio.toLocaleString('es-CL')}
                    </span>
                  </div>
                  <span className="fw-bold small">
                    ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-top pt-3 small">
              <div className="d-flex justify-content-between mb-1">
                <span>Subtotal:</span>
                <span>${subtotal.toLocaleString('es-CL')}</span>
              </div>
              {descuento > 0 && (
                <div className="d-flex justify-content-between mb-1 text-success">
                  <span>Descuento aplicado:</span>
                  <span>-${descuento.toLocaleString('es-CL')}</span>
                </div>
              )}
              <div className="d-flex justify-content-between fs-5 fw-bold mt-2 pt-2 border-top" style={{ color: 'var(--color-chocolate)' }}>
                <span>Total a Pagar:</span>
                <span>${total.toLocaleString('es-CL')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};