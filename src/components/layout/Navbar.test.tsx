import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar Component', () => {
  it('renderiza la marca Mil Sabores y los enlaces principales', () => {
    render(
      <Navbar
        currentView="home"
        onNavigate={vi.fn()}
        cartCount={0}
        userEmail={null}
        onLogout={vi.fn()}
      />
    );

    expect(screen.getByText('Mil Sabores')).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Catálogo')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
    expect(screen.getByText('Administración')).toBeInTheDocument();
  });

  it('muestra el contador de productos en el carrito cuando es mayor a cero', () => {
    render(
      <Navbar
        currentView="home"
        onNavigate={vi.fn()}
        cartCount={3}
        userEmail={null}
        onLogout={vi.fn()}
      />
    );

    expect(screen.getByText('3')).toBeInTheDocument();
  });
});