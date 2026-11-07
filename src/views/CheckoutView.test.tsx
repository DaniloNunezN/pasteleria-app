import { describe, it, expect } from 'vitest';

describe('CheckoutView Reglas de Negocio', () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

  it('valida dominios de correo permitidos por la institucion', () => {
    expect(emailRegex.test('alumno@duoc.cl')).toBe(true);
    expect(emailRegex.test('docente@profesor.duoc.cl')).toBe(true);
    expect(emailRegex.test('cliente@gmail.com')).toBe(true);
  });

  it('rechaza dominios no autorizados', () => {
    expect(emailRegex.test('usuario@hotmail.com')).toBe(false);
    expect(emailRegex.test('usuario@yahoo.com')).toBe(false);
    expect(emailRegex.test('usuario@outlook.com')).toBe(false);
  });
});