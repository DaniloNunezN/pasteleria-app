import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CheckoutView } from './CheckoutView';
import type { CartItem } from '../data/productService';

const mockCart: CartItem[] = [
  {
    id: 1,
    nombre: 'Torta Cuatro Leches',
    categoria: 'Tortas Tradicionales',
    precio: 18500,
    descripcion: 'Bizcocho húmedo',
    imagen: '',
    stock: 5,
    cantidad: 1,
  },
];

describe('CheckoutView Component', () => {
  it('debe permitir escribir en el campo nombre y actualizar su valor', () => {
    render(
      <CheckoutView
        cart={mockCart}
        onBackToCart={vi.fn()}
        onPaymentSuccess={vi.fn()}
        onPaymentError={vi.fn()}
      />
    );

    const inputNombre = screen.getByLabelText(/nombre \*/i) as HTMLInputElement;
    fireEvent.change(inputNombre, { target: { value: 'Danilo' } });

    expect(inputNombre.value).toBe('Danilo');
  });

  it('debe mostrar mensaje de error si se intenta enviar el formulario vacio', () => {
    render(
      <CheckoutView
        cart={mockCart}
        onBackToCart={vi.fn()}
        onPaymentSuccess={vi.fn()}
        onPaymentError={vi.fn()}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /pagar ahora/i });
    fireEvent.click(submitBtn);

    expect(
      screen.getByText(/por favor completa todos los campos obligatorios/i)
    ).toBeInTheDocument();
  });
});