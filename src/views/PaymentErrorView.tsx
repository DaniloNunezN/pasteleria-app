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
    <div className="row justify-content-center my-4">
      <div className="col-md-6">
        <div className="card shadow-sm border-0 p-5 text-center">
          <div className="mb-3">
            <i
              className="bi bi-x-circle-fill text-danger"
              style={{ fontSize: '4.5rem' }}
            ></i>
          </div>
          <h2 className="fw-bold" style={{ color: 'var(--dark-color)' }}>
            Pago No Procesado
          </h2>
          <p className="text-muted">
            Ocurrió un inconveniente al procesar la transacción bancaria. No se
            ha realizado ningún cobro en tu cuenta.
          </p>

          <div
            className="p-3 my-3 rounded"
            style={{ backgroundColor: 'var(--light-bg)' }}
          >
            <p className="small mb-0 text-muted">
              Verifica los fondos disponibles o intenta nuevamente con otro medio
              de pago.
            </p>
          </div>

          <div className="d-flex gap-2 justify-content-center mt-3">
            <button className="btn btn-outline-secondary px-3" onClick={onGoHome}>
              Volver al Inicio
            </button>
            <button className="btn btn-custom px-4" onClick={onRetry}>
              Reintentar Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};