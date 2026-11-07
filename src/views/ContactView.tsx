import React, { useState } from 'react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sentSuccess, setSentSuccess] = useState(false);

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
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio.';
    } else if (!emailRegex.test(formData.correo.trim())) {
      newErrors.correo = 'Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    }
    if (!formData.asunto.trim()) newErrors.asunto = 'El asunto es obligatorio.';
    if (!formData.mensaje.trim()) newErrors.mensaje = 'El mensaje no puede ir vacío.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSentSuccess(true);
    setFormData({
      nombre: '',
      correo: '',
      asunto: '',
      mensaje: '',
    });
  };

  return (
    <div className="my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-2">Contáctanos</h2>
        <p className="text-muted">Estamos listos para endulzar tu próxima celebración especial</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 p-4 h-100">
            <h5 className="fw-bold mb-3">Envíanos un Mensaje</h5>

            {sentSuccess && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                ¡Gracias por escribirnos! Te responderemos a la brevedad.
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSentSuccess(false)}
                ></button>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Nombre Completo *</label>
                <input
                  type="text"
                  name="nombre"
                  className={`form-control form-control-sm ${errors.nombre ? 'is-invalid' : ''}`}
                  value={formData.nombre}
                  onChange={handleChange}
                />
                {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
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
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Asunto *</label>
                <input
                  type="text"
                  name="asunto"
                  className={`form-control form-control-sm ${errors.asunto ? 'is-invalid' : ''}`}
                  value={formData.asunto}
                  onChange={handleChange}
                />
                {errors.asunto && <div className="invalid-feedback">{errors.asunto}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Mensaje *</label>
                <textarea
                  name="mensaje"
                  rows={4}
                  className={`form-control form-control-sm ${errors.mensaje ? 'is-invalid' : ''}`}
                  value={formData.mensaje}
                  onChange={handleChange}
                ></textarea>
                {errors.mensaje && <div className="invalid-feedback">{errors.mensaje}</div>}
              </div>

              <button type="submit" className="btn btn-custom w-100 py-2 fw-bold">
                Enviar Consulta
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm border-0 p-4 h-100">
            <h5 className="fw-bold mb-3">Información de la Pastelería</h5>
            <p className="text-muted small mb-4">
              Visítanos en nuestro local principal o comunícate directamente con nuestro equipo de atención para pedidos especiales o pedidos corporativos.
            </p>

            <ul className="list-unstyled mb-4">
              <li className="mb-3 d-flex align-items-center">
                <i className="bi bi-geo-alt-fill me-3 fs-5 text-custom"></i>
                <div>
                  <strong>Casa Matriz:</strong>
                  <div className="small text-muted">Av. Providencia 1234, Santiago, Chile</div>
                </div>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <i className="bi bi-telephone-fill me-3 fs-5 text-custom"></i>
                <div>
                  <strong>Teléfono:</strong>
                  <div className="small text-muted">+56 2 2345 6789</div>
                </div>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <i className="bi bi-clock-fill me-3 fs-5 text-custom"></i>
                <div>
                  <strong>Horario de Atención:</strong>
                  <div className="small text-muted">Lunes a Sábado: 09:00 - 20:00 hrs</div>
                </div>
              </li>
            </ul>

            <div className="p-3 rounded bg-light border">
              <h6 className="fw-bold mb-1">Pedidos con Anticipación</h6>
              <p className="small text-muted mb-0">
                Las tortas personalizadas y de matrimonio requieren un mínimo de 48 horas de anticipación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};