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
      <div className="my-5 text-center p-5 card border-0 shadow-sm bg-white" style={{ border: '1px solid var(--color-rosa)' }}>
        <h3 className="fw-bold mb-2" style={{ color: 'var(--color-chocolate)' }}>No se encontró información del pedido</h3>
        <p className="text-muted mb-4">Parece que accediste a esta pantalla sin completar una transacción.</p>
        <div>
          <button className="btn-principal" onClick={onGoHome}>
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-5 d-flex justify-content-center">
      <div className="card p-4 p-md-5 border-0 shadow-sm bg-white text-center" style={{ maxWidth: '650px', width: '100%', border: '1px solid var(--color-rosa)' }}>
        <div className="mb-3 text-success d-flex justify-content-center">
          <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#e8f5e9', width: '72px', height: '72px' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        </div>

        <h2 className="fw-bold mb-2" style={{ color: 'var(--color-chocolate)', fontFamily: 'Pacifico, cursive' }}>
          ¡Pago Realizado con Éxito!
        </h2>
        <p className="text-muted mb-4">
          Muchas gracias por tu compra. Tu pedido ha sido confirmado y ya comenzó su preparación en nuestra pastelería.
        </p>

        <div className="bg-light p-3 rounded-3 text-start small mb-4 border">
          <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
            <span className="text-muted">Número de Pedido:</span>
            <span className="fw-bold text-dark">{orderData.orderNumber}</span>
          </div>
          <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
            <span className="text-muted">Cliente:</span>
            <span className="fw-bold text-dark">{orderData.cliente}</span>
          </div>
          <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
            <span className="text-muted">Correo:</span>
            <span className="fw-bold text-dark">{orderData.correo}</span>
          </div>
          <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
            <span className="text-muted">Dirección de Entrega:</span>
            <span className="fw-bold text-dark">{orderData.direccion}, {orderData.comuna}</span>
          </div>
          <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
            <span className="text-muted">Método de Pago:</span>
            <span className="fw-bold text-dark">{orderData.metodoPago}</span>
          </div>
          <div className="d-flex justify-content-between pt-1 fs-6">
            <span className="fw-bold" style={{ color: 'var(--color-chocolate)' }}>Total Cancelado:</span>
            <span className="fw-bold text-success">${orderData.total.toLocaleString('es-CL')} CLP</span>
          </div>
        </div>

        <div className="d-flex justify-content-center gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm px-3"
            onClick={() => window.print()}
          >
            Imprimir Comprobante
          </button>
          <button
            type="button"
            className="btn btn-custom btn-sm px-4"
            onClick={onGoHome}
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};