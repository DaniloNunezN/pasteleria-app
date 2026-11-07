import React from 'react';
import type { OrderData } from './CheckoutView';

interface PaymentSuccessViewProps {
  orderData: OrderData | null;
  onGoHome: () => void;
}

export const PaymentSuccessView: React.FC<PaymentSuccessViewProps> = ({
  orderData,
  onGoHome,
}) => {
  if (!orderData) {
    return (
      <div className="card shadow-sm border-0 p-5 text-center my-4">
        <h4 className="fw-bold" style={{ color: 'var(--dark-color)' }}>
          No se encontró información del pedido.
        </h4>
        <div>
          <button className="btn btn-custom mt-3" onClick={onGoHome}>
            Ir al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center my-4">
      <div className="col-lg-8">
        <div className="card shadow-sm border-0 p-4 text-center">
          <div className="mb-3">
            <i
              className="bi bi-check-circle-fill text-success"
              style={{ fontSize: '4.5rem' }}
            ></i>
          </div>
          <h2 className="fw-bold" style={{ color: 'var(--dark-color)' }}>
            ¡Pago Realizado con Éxito!
          </h2>
          <p className="text-muted">
            Gracias por tu compra en Pastelería Mil Sabores. Tu pedido está en
            preparación.
          </p>

          <div
            className="p-3 my-3 rounded text-start"
            style={{ backgroundColor: 'var(--light-bg)' }}
          >
            <div className="row g-2">
              <div className="col-sm-6">
                <span className="text-muted small">Número de Orden:</span>
                <p className="fw-bold mb-0">#{orderData.orderNumber}</p>
              </div>
              <div className="col-sm-6">
                <span className="text-muted small">Cliente:</span>
                <p className="fw-bold mb-0">
                  {orderData.nombre} {orderData.apellidos}
                </p>
              </div>
              <div className="col-sm-6">
                <span className="text-muted small">Correo de Confirmación:</span>
                <p className="fw-bold mb-0">{orderData.correo}</p>
              </div>
              <div className="col-sm-6">
                <span className="text-muted small">Dirección de Entrega:</span>
                <p className="fw-bold mb-0">
                  {orderData.calle}
                  {orderData.depto ? `, Depto ${orderData.depto}` : ''},{' '}
                  {orderData.comuna}
                </p>
              </div>
            </div>
          </div>

          <h5 className="fw-bold text-start mt-3 mb-2" style={{ color: 'var(--dark-color)' }}>
            Detalle de Productos
          </h5>
          <ul className="list-group list-group-flush text-start mb-4">
            {orderData.items.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center px-0"
              >
                <div>
                  <span className="fw-semibold">{item.nombre}</span>
                  <small className="text-muted d-block">
                    {item.cantidad} x ${item.precio.toLocaleString('es-CL')}
                  </small>
                </div>
                <span className="fw-bold text-price">
                  ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                </span>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center border-top pt-3 mb-4">
            <span className="fs-5 fw-bold">Total Pagado:</span>
            <span className="fs-4 fw-bold text-price">
              ${orderData.total.toLocaleString('es-CL')}
            </span>
          </div>

          <div>
            <button className="btn btn-custom px-4 py-2" onClick={onGoHome}>
              Volver a la Tienda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};