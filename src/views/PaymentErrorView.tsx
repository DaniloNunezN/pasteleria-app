import React from 'react';

interface PaymentErrorViewProps {
  onRetry: () => void;
  onGoHome: () => void;
}

export const PaymentErrorView: React.FC<PaymentErrorViewProps> = ({
  onRetry,
  onGoHome,
}) => {
  return (
    <div className="card shadow-sm border-0 p-4 p-md-5 my-4 text-center mx-auto" style={{ maxWidth: '550px' }}>
      <div className="mb-3">
        <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: '4rem' }}></i>
      </div>
      <h2 className="fw-bold text-danger mb-2">Error en la Transacción</h2>
      <p className="text-muted mb-4">
        No pudimos procesar tu pago. Puede deberse a fondos insuficientes o un problema momentáneo con la pasarela.
      </p>

      <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
        <button className="btn btn-custom px-4 py-2" onClick={onRetry}>
          <i className="bi bi-arrow-repeat me-1"></i> Reintentar Pago
        </button>
        <button className="btn btn-outline-secondary px-4 py-2" onClick={onGoHome}>
          Volver a la Tienda
        </button>
      </div>
    </div>
  );
};