import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from './ProductCard';
import type { Product } from '../../data/productService';

const mockProduct: Product = {
  codigo: 'TC001',
  nombre: 'Torta Cuadrada de Chocolate',
  categoria: 'Tortas Cuadradas',
  precio: 45000,
  descripcion: 'Deliciosa torta artesanal con ganache',
  imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
  stock: 5,
  stockCritico: 2,
};

describe('ProductCard Component', () => {
  it('renderiza correctamente el codigo, nombre, precio y categoria del pastel', () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);

    expect(screen.getByText('TC001')).toBeInTheDocument();
    expect(screen.getByText('Torta Cuadrada de Chocolate')).toBeInTheDocument();
    expect(screen.getByText('Tortas Cuadradas')).toBeInTheDocument();
    expect(screen.getByText('$45.000')).toBeInTheDocument();
  });

  it('llama a la funcion onAddToCart al presionar el boton Añadir', () => {
    const handleAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);

    const addButton = screen.getByRole('button', { name: /añadir/i });
    fireEvent.click(addButton);

    expect(handleAddToCart).toHaveBeenCalledTimes(1);
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});