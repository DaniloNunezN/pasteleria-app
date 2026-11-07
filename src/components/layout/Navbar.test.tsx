import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar Component', () => {
  it('renderiza la marca Mil Sabores y los enlaces principales de navegacion', () => {
    render(
      <Navbar
        currentView="home"
        onNavigate={vi.fn()}
        cartCount={0}
        userEmail={null}
        isAdmin={false}
        onLogout={vi.fn()}
      />
    );

    expect(screen.getByText('Mil Sabores')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Nosotros')).toBeInTheDocument();
    expect(screen.getByText('Blogs')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  it('muestra el enlace de administracion unicamente cuando isAdmin es verdadero', () => {
    const { rerender } = render(
      <Navbar
        currentView="home"
        onNavigate={vi.fn()}
        cartCount={0}
        userEmail="cliente@duoc.cl"
        isAdmin={false}
        onLogout={vi.fn()}
      />
    );

    expect(screen.queryByText(/Administración/i)).not.toBeInTheDocument();

    rerender(
      <Navbar
        currentView="home"
        onNavigate={vi.fn()}
        cartCount={0}
        userEmail="admin@pasteleria.cl"
        isAdmin={true}
        onLogout={vi.fn()}
      />
    );

    expect(screen.getByText(/Administración/i)).toBeInTheDocument();
  });
});