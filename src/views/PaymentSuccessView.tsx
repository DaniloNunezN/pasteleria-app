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
        <h3 className="fw-bold mb-3">No hay orden reciente</h3>
        <button className="btn btn-custom px-4 py-2" onClick={onGoHome}>
          Volver a la Tienda
        </button>
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0 p-4 p-md-5 my-4 text-center mx-auto" style={{ maxWidth: '650px' }}>
      <div className="mb-3">
        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
      </div>
      <h2 className="fw-bold text-success mb-2">¡Pago Confirmado con Éxito!</h2>
      <p className="text-muted mb-4">
        Gracias por tu compra en Pastelería Mil Sabores. Tu pedido está en preparación.
      </p>

      <div className="card bg-light border-0 p-3 mb-4 text-start">
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted small">Número de Orden:</span>
          <span className="fw-bold">#{orderData.orderNumber}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted small">Cliente:</span>
          <span className="fw-bold">{orderData.nombre} {orderData.apellidos}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted small">Correo de confirmación:</span>
          <span className="fw-bold">{orderData.correo}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted small">Dirección de entrega:</span>
          <span className="fw-bold">{orderData.calle}, {orderData.comuna}</span>
        </div>
        <hr className="my-2" />
        <div className="d-flex justify-content-between">
          <span className="fw-bold">Total Pagado:</span>
          <span className="fw-bold text-price fs-5">${orderData.total.toLocaleString('es-CL')}</span>
        </div>
      </div>

      <button className="btn btn-custom px-4 py-2" onClick={onGoHome}>
        <i className="bi bi-house-door me-1"></i> Volver a la Tienda
      </button>
    </div>
  );
};