import React from 'react';
import type { OrderData } from './CheckoutView';

interface ProfileViewProps {
  userEmail: string;
  userOrders: OrderData[];
  onGoToStore: () => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userEmail,
  userOrders,
  onGoToStore,
  onLogout,
}) => {
  return (
    <div className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1">Mi Cuenta</h2>
          <p className="text-muted small mb-0">Bienvenido, <strong>{userEmail}</strong></p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm" onClick={onGoToStore}>
            Ir a Comprar
          </button>
          <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="fw-bold mb-3">Datos del Usuario</h5>
            <div className="mb-3">
              <span className="text-muted small d-block">Correo Registrado:</span>
              <span className="fw-semibold">{userEmail}</span>
            </div>
            <div className="mb-3">
              <span className="text-muted small d-block">Tipo de Cuenta:</span>
              <span className="badge bg-primary">Cliente Institucional</span>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="fw-bold mb-3">Mis Pedidos Realizados</h5>
            {userOrders.length === 0 ? (
              <p className="text-muted small mb-0">Aún no has registrado pedidos con esta cuenta.</p>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Orden #</th>
                      <th>Total</th>
                      <th>Estado</th>
                      <th>Productos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userOrders.map((ord) => (
                      <tr key={ord.orderNumber}>
                        <td className="fw-bold">{ord.orderNumber}</td>
                        <td className="text-price fw-bold">${ord.total.toLocaleString('es-CL')}</td>
                        <td>
                          <span className="badge bg-info text-dark">{ord.estado || 'Pendiente'}</span>
                        </td>
                        <td className="small">
                          {ord.items.map((i) => `${i.cantidad}x ${i.nombre}`).join(', ')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};