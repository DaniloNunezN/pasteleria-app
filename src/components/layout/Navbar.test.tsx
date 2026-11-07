import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar Component', () => {
  it('debe mostrar el contador del carrito cuando hay productos', () => {
    const handleNavigate = vi.fn();
    render(
      <Navbar currentView="home" onNavigate={handleNavigate} cartCount={3} />
    );

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('debe llamar a onNavigate con la vista correspondiente al hacer clic', () => {
    const handleNavigate = vi.fn();
    render(
      <Navbar currentView="home" onNavigate={handleNavigate} cartCount={0} />
    );

    const catalogButton = screen.getByRole('button', { name: /catálogo/i });
    fireEvent.click(catalogButton);

    expect(handleNavigate).toHaveBeenCalledWith('products');
  });
});