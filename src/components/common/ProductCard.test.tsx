import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from './ProductCard';
import type { Product } from '../../data/productService';

const mockProduct: Product = {
  id: 1,
  nombre: 'Torta Cuatro Leches',
  categoria: 'Tortas Tradicionales',
  precio: 18500,
  descripcion: 'Bizcocho húmedo bañado en mezcla de cuatro leches.',
  imagen: 'https://via.placeholder.com/150',
  stock: 5,
};

describe('ProductCard Component', () => {
  it('debe renderizar el nombre, categoria y precio formateado', () => {
    const handleAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);

    expect(screen.getByText('Torta Cuatro Leches')).toBeInTheDocument();
    expect(screen.getByText('Tortas Tradicionales')).toBeInTheDocument();
    expect(screen.getByText('$18.500')).toBeInTheDocument();
  });

  it('debe llamar a la funcion onAddToCart al hacer clic en el boton', () => {
    const handleAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);

    const button = screen.getByRole('button', { name: /añadir al carrito/i });
    fireEvent.click(button);

    expect(handleAddToCart).toHaveBeenCalledTimes(1);
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});