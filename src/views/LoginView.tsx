import React, { useState } from 'react';

interface LoginViewProps {
  onLoginSuccess: (userEmail: string) => void;
  onGoHome: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onGoHome,
}) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    if (isRegistering && !formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido.';
    }

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido.';
    } else if (!emailRegex.test(formData.correo.trim())) {
      newErrors.correo = 'Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres.';
    }

    if (isRegistering && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    localStorage.setItem('pasteleria_user', formData.correo);
    onLoginSuccess(formData.correo);
  };

  return (
    <div className="my-5 d-flex justify-content-center">
      <div className="card shadow-sm border-0 p-4 p-md-5" style={{ maxWidth: '450px', width: '100%' }}>
        <h3 className="fw-bold text-center mb-1">
          {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </h3>
        <p className="text-muted text-center small mb-4">
          {isRegistering
            ? 'Regístrate para gestionar tus pedidos'
            : 'Ingresa a tu cuenta de Mil Sabores'}
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {isRegistering && (
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
          )}

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
            <label className="form-label small fw-semibold">Contraseña *</label>
            <input
              type="password"
              name="password"
              className={`form-control form-control-sm ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {isRegistering && (
            <div className="mb-4">
              <label className="form-label small fw-semibold">Confirmar Contraseña *</label>
              <input
                type="password"
                name="confirmPassword"
                className={`form-control form-control-sm ${errors.confirmPassword ? 'is-invalid' : ''}`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>
          )}

          <button type="submit" className="btn btn-custom w-100 py-2 fw-bold mb-3">
            {isRegistering ? 'Registrarse' : 'Ingresar'}
          </button>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-link btn-sm text-decoration-none"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setErrors({});
              }}
            >
              {isRegistering
                ? '¿Ya tienes cuenta? Inicia sesión aquí'
                : '¿No tienes cuenta? Regístrate aquí'}
            </button>
          </div>

          <div className="text-center mt-3">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={onGoHome}
            >
              Volver a la Tienda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};