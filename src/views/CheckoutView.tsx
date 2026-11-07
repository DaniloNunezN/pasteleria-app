import React, { useState } from 'react';
import type { CartItem } from '../data/productService';

export interface OrderData {
  nombre: string;
  apellidos: string;
  correo: string;
  calle: string;
  depto?: string;
  region: string;
  comuna: string;
  indicaciones?: string;
  items: CartItem[];
  total: number;
  orderNumber: string;
  estado?: string;
}

interface CheckoutViewProps {
  cart: CartItem[];
  discountPercent?: number;
  onBackToCart: () => void;
  onPaymentSuccess: (order: OrderData) => void;
  onPaymentError: () => void;
  initialErrors?: Record<string, string>;
}

const REGIONES_Y_COMUNAS: Record<string, string[]> = {
  'Región Metropolitana': ['Santiago', 'Providencia', 'Las Condes', 'Ñuñoa', 'San Bernardo', 'Maipú'],
  'Región de Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Concón'],
  'Región del Biobío': ['Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Chiguayante'],
};

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  discountPercent = 0,
  onBackToCart,
  onPaymentSuccess,
  onPaymentError,
  initialErrors = {},
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    depto: '',
    region: 'Región Metropolitana',
    comuna: 'Santiago',
    indicaciones: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>(initialErrors);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const totalConDescuento = subtotal - discountAmount;

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevaRegion = e.target.value;
    const primeraComuna = REGIONES_Y_COMUNAS[nuevaRegion]?.[0] || '';
    setFormData({
      ...formData,
      region: nuevaRegion,
      comuna: primeraComuna,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido.';
    } else if (formData.nombre.length > 50) {
      newErrors.nombre = 'Máximo 50 caracteres.';
    }

    if (!formData.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son requeridos.';
    } else if (formData.apellidos.length > 100) {
      newErrors.apellidos = 'Máximo 100 caracteres.';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido.';
    } else if (!emailRegex.test(formData.correo.trim())) {
      newErrors.correo = 'Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    }

    if (!formData.calle.trim()) {
      newErrors.calle = 'La dirección / calle es requerida.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      if (formData.nombre.toLowerCase().includes('error')) {
        onPaymentError();
      } else {
        const orderNumber = Math.floor(100000 + Math.random() * 900000).toString();
        onPaymentSuccess({
          ...formData,
          items: cart,
          total: totalConDescuento,
          orderNumber,
          estado: 'Pendiente',
        });
      }
    }, 800);
  };

  return (
    <div className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Finalizar Compra</h2>
        <button className="btn btn-outline-secondary btn-sm" onClick={onBackToCart}>
          <i className="bi bi-arrow-left me-1"></i> Volver al Carrito
        </button>
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="fw-bold mb-3">Datos de Envío y Contacto</h5>

            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3 mb-3">
                <div className="col-sm-6">
                  <label className="form-label small fw-semibold">Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    className={`form-control form-control-sm ${errors.nombre ? 'is-invalid' : ''}`}
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                </div>

                <div className="col-sm-6">
                  <label className="form-label small fw-semibold">Apellidos *</label>
                  <input
                    type="text"
                    name="apellidos"
                    className={`form-control form-control-sm ${errors.apellidos ? 'is-invalid' : ''}`}
                    value={formData.apellidos}
                    onChange={handleChange}
                  />
                  {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Correo Electrónico *</label>
                <input
                  type="email"
                  name="correo"
                  placeholder="ejemplo@duoc.cl o @gmail.com"
                  className={`form-control form-control-sm ${errors.correo ? 'is-invalid' : ''}`}
                  value={formData.correo}
                  onChange={handleChange}
                />
                {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
                <div className="form-text small">
                  Permitidos: @duoc.cl, @profesor.duoc.cl y @gmail.com
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-sm-6">
                  <label className="form-label small fw-semibold">Región *</label>
                  <select
                    name="region"
                    className="form-select form-select-sm"
                    value={formData.region}
                    onChange={handleRegionChange}
                  >
                    {Object.keys(REGIONES_Y_COMUNAS).map((reg) => (
                      <option key={reg} value={reg}>
                        {reg}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-sm-6">
                  <label className="form-label small fw-semibold">Comuna *</label>
                  <select
                    name="comuna"
                    className="form-select form-select-sm"
                    value={formData.comuna}
                    onChange={handleChange}
                  >
                    {REGIONES_Y_COMUNAS[formData.region]?.map((com) => (
                      <option key={com} value={com}>
                        {com}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-sm-8">
                  <label className="form-label small fw-semibold">Calle y Número *</label>
                  <input
                    type="text"
                    name="calle"
                    placeholder="Av. Providencia 1234"
                    className={`form-control form-control-sm ${errors.calle ? 'is-invalid' : ''}`}
                    value={formData.calle}
                    onChange={handleChange}
                  />
                  {errors.calle && <div className="invalid-feedback">{errors.calle}</div>}
                </div>

                <div className="col-sm-4">
                  <label className="form-label small fw-semibold">Depto / Casa (Opcional)</label>
                  <input
                    type="text"
                    name="depto"
                    placeholder="Depto 302"
                    className="form-control form-control-sm"
                    value={formData.depto}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold">Indicaciones de Entrega (Opcional)</label>
                <textarea
                  name="indicaciones"
                  rows={2}
                  className="form-control form-control-sm"
                  placeholder="Dejar en conserjería, llamar al timbre..."
                  value={formData.indicaciones}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-custom w-100 py-2 fw-bold"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Procesando Pago Seguro...
                  </>
                ) : (
                  `Pagar $${totalConDescuento.toLocaleString('es-CL')}`
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="fw-bold mb-3">Detalle del Pedido</h5>

            <div className="list-group list-group-flush mb-3">
              {cart.map((item) => (
                <div key={item.codigo} className="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                  <div>
                    <div className="small fw-semibold">{item.nombre}</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                      {item.cantidad} x ${item.precio.toLocaleString('es-CL')}
                    </div>
                  </div>
                  <span className="small fw-bold text-price">
                    ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                  </span>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between mb-2 small">
              <span className="text-muted">Subtotal:</span>
              <span className="fw-bold">${subtotal.toLocaleString('es-CL')}</span>
            </div>

            {discountPercent > 0 && (
              <div className="d-flex justify-content-between mb-2 small text-success">
                <span>Descuento aplicado ({discountPercent}%):</span>
                <span>-${discountAmount.toLocaleString('es-CL')}</span>
              </div>
            )}

            <div className="d-flex justify-content-between my-3 pt-2 border-top">
              <span className="fs-5 fw-bold">Total a Pagar:</span>
              <span className="fs-5 fw-bold text-price">
                ${totalConDescuento.toLocaleString('es-CL')}
              </span>
            </div>

            <div className="alert alert-light border small text-muted mb-0">
              <i className="bi bi-shield-check me-1 text-success"></i> Transacción cifrada y protegida por Webpay Plus.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};