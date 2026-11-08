import React, { useState } from 'react';

export const ContactView: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !correo.trim() || !mensaje.trim()) {
      return;
    }

    const nuevoMensaje = {
      id: Date.now().toString(),
      nombre,
      correo,
      asunto: asunto || 'Consulta general',
      mensaje,
      fecha: new Date().toLocaleDateString('es-CL'),
    };

    const mensajesPrevios = JSON.parse(
      localStorage.getItem('PASTELERIA_MENSAJES_CONTACTO') || '[]'
    );
    localStorage.setItem(
      'PASTELERIA_MENSAJES_CONTACTO',
      JSON.stringify([nuevoMensaje, ...mensajesPrevios])
    );

    setEnviado(true);
    setNombre('');
    setCorreo('');
    setAsunto('');
    setMensaje('');
  };

  return (
    <div className="my-5">
      <div className="titulo-contacto mb-4 text-center">
        <h2>Contáctanos</h2>
        <p className="text-muted">¿Tienes alguna duda o pedido especial? Estamos para ayudarte.</p>
      </div>

      <div className="row g-4 justify-content-center">
        <div className="col-lg-5">
          <div className="card h-100 p-4 border-0 shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-rosa)' }}>
            <h4 className="fw-bold mb-4" style={{ color: 'var(--color-chocolate)' }}>Información de Contacto</h4>
            
            <div className="d-flex align-items-start mb-4 gap-3">
              <div className="p-2 rounded-circle" style={{ backgroundColor: 'var(--color-fondo)', color: 'var(--color-chocolate)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <strong className="d-block text-dark">Ubicación</strong>
                <span className="text-muted small">Av. Concha y Toro 1340, Puente Alto, Región Metropolitana</span>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4 gap-3">
              <div className="p-2 rounded-circle" style={{ backgroundColor: 'var(--color-fondo)', color: 'var(--color-chocolate)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <strong className="d-block text-dark">Teléfono / WhatsApp</strong>
                <span className="text-muted small">+56 9 1234 5678 / (2) 2890 0000</span>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4 gap-3">
              <div className="p-2 rounded-circle" style={{ backgroundColor: 'var(--color-fondo)', color: 'var(--color-chocolate)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <strong className="d-block text-dark">Correo Electrónico</strong>
                <span className="text-muted small">contacto@milsabores.cl</span>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3">
              <div className="p-2 rounded-circle" style={{ backgroundColor: 'var(--color-fondo)', color: 'var(--color-chocolate)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <strong className="d-block text-dark">Horario de Atención</strong>
                <span className="text-muted small">Lunes a Sábado: 09:00 - 20:00 hrs<br />Domingos: 10:00 - 15:00 hrs</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card p-4 border-0 shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-rosa)' }}>
            <h4 className="fw-bold mb-3" style={{ color: 'var(--color-chocolate)' }}>Envíanos un Mensaje</h4>
            {enviado && (
              <div className="alert alert-success d-flex align-items-center gap-2" role="alert">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>¡Mensaje enviado con éxito! Nos contactaremos a la brevedad.</span>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold">Nombre Completo</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Asunto</label>
                <input
                  type="text"
                  className="form-control"
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                  placeholder="Motivo de tu consulta"
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Mensaje</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Escribe aquí tu consulta o requerimiento especial..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-custom w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};