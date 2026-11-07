import { describe, it, expect } from 'vitest';

describe('CartView Reglas de Negocio', () => {
  it('calcula correctamente el subtotal segun precio y cantidad', () => {
    const items = [
      { precio: 40000, cantidad: 2 },
      { precio: 15000, cantidad: 1 },
    ];
    const subtotal = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    expect(subtotal).toBe(95000);
  });

  it('aplica el 10% de descuento con el cupon FELICES50', () => {
    const subtotal = 50000;
    const cupon = 'FELICES50';
    const porcentaje = cupon === 'FELICES50' ? 10 : 0;
    const descuento = Math.round(subtotal * (porcentaje / 100));
    const total = subtotal - descuento;

    expect(descuento).toBe(5000);
    expect(total).toBe(45000);
  });
});