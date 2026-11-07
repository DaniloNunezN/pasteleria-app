export interface Product {
  codigo: string;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string;
  imagen: string;
  stock: number;
  stockCritico?: number;
}

export interface CartItem extends Product {
  cantidad: number;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    codigo: 'TC001',
    nombre: 'Torta Cuadrada de Chocolate',
    categoria: 'Tortas Cuadradas',
    precio: 45000,
    descripcion: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.',
    imagen: 'https://images.unsplash.com/photo-1761637597044-d2eb3b989c78?w=500',
    stock: 10,
    stockCritico: 2,
  },
  {
    codigo: 'TC002',
    nombre: 'Torta Cuadrada de Frutas',
    categoria: 'Tortas Cuadradas',
    precio: 50000,
    descripcion: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.',
    imagen: 'https://cdn.pixabay.com/photo/2022/06/24/15/41/delicious-7281894_1280.jpg',
    stock: 8,
    stockCritico: 2,
  },
  {
    codigo: 'TT001',
    nombre: 'Torta Circular de Vainilla',
    categoria: 'Tortas Circulares',
    precio: 40000,
    descripcion: 'Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.',
    imagen: 'https://images.unsplash.com/photo-1692640848099-325af9b3f75f?w=500',
    stock: 12,
    stockCritico: 3,
  },
  {
    codigo: 'TT002',
    nombre: 'Torta Circular de Manjar',
    categoria: 'Tortas Circulares',
    precio: 42000,
    descripcion: 'Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.',
    imagen: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=500',
    stock: 7,
    stockCritico: 2,
  },
  {
    codigo: 'PI001',
    nombre: 'Mousse de Chocolate',
    categoria: 'Postres Individuales',
    precio: 5000,
    descripcion: 'Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.',
    imagen: 'https://images.unsplash.com/photo-1673551494277-92204546b504?w=500',
    stock: 20,
    stockCritico: 5,
  },
  {
    codigo: 'PI002',
    nombre: 'Tiramisú Clásico',
    categoria: 'Postres Individuales',
    precio: 5500,
    descripcion: 'Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.',
    imagen: 'https://plus.unsplash.com/premium_photo-1695028378225-97fbe39df62a?w=500',
    stock: 15,
    stockCritico: 4,
  },
  {
    codigo: 'PSA001',
    nombre: 'Torta Sin Azúcar de Naranja',
    categoria: 'Productos Sin Azúcar',
    precio: 48000,
    descripcion: 'Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.',
    imagen: 'https://images.unsplash.com/photo-1668887461930-44237b5eb558?w=500',
    stock: 6,
    stockCritico: 2,
  },
  {
    codigo: 'PSA002',
    nombre: 'Cheesecake Sin Azúcar',
    categoria: 'Productos Sin Azúcar',
    precio: 47000,
    descripcion: 'Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.',
    imagen: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500',
    stock: 5,
    stockCritico: 1,
  },
  {
    codigo: 'PT001',
    nombre: 'Empanada de Manzana',
    categoria: 'Pastelería Tradicional',
    precio: 3000,
    descripcion: 'Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJs3__ovLHyOIO10JTwr07sTyiQjkSTfU20laVGrqp8lCdMZBLQoHg-30&s=10',
    stock: 25,
    stockCritico: 5,
  },
  {
    codigo: 'PT002',
    nombre: 'Tarta de Santiago',
    categoria: 'Pastelería Tradicional',
    precio: 6000,
    descripcion: 'Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.',
    imagen: 'https://cdn.pixabay.com/photo/2021/12/28/22/28/tarta-6900298_1280.jpg',
    stock: 10,
    stockCritico: 2,
  },
  {
    codigo: 'PG001',
    nombre: 'Brownie Sin Gluten',
    categoria: 'Productos Sin Gluten',
    precio: 4000,
    descripcion: 'Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.',
    imagen: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500',
    stock: 14,
    stockCritico: 3,
  },
  {
    codigo: 'PG002',
    nombre: 'Pan Sin Gluten',
    categoria: 'Productos Sin Gluten',
    precio: 3500,
    descripcion: 'Suave y esponjoso, ideal para sandwiches o para acompañar cualquier comida.',
    imagen: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=500',
    stock: 18,
    stockCritico: 4,
  },
  {
    codigo: 'PV001',
    nombre: 'Torta Vegana de Chocolate',
    categoria: 'Productos Vegana',
    precio: 50000,
    descripcion: 'Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.',
    imagen: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=500',
    stock: 8,
    stockCritico: 2,
  },
  {
    codigo: 'PV002',
    nombre: 'Galletas Veganas de Avena',
    categoria: 'Productos Vegana',
    precio: 4500,
    descripcion: 'Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.',
    imagen: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500',
    stock: 30,
    stockCritico: 6,
  },
  {
    codigo: 'TE001',
    nombre: 'Torta Especial de Cumpleaños',
    categoria: 'Tortas Especiales',
    precio: 55000,
    descripcion: 'Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.',
    imagen: 'https://cdn.pixabay.com/photo/2023/04/24/16/50/cake-7948556_1280.jpg',
    stock: 5,
    stockCritico: 1,
  },
  {
    codigo: 'TE002',
    nombre: 'Torta Especial de Boda',
    categoria: 'Tortas Especiales',
    precio: 60000,
    descripcion: 'Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.',
    imagen: 'https://images.unsplash.com/photo-1604702433171-33756f3f3825?w=500',
    stock: 3,
    stockCritico: 1,
  },
];

const STORAGE_KEY = 'PASTELERIA_MIL_SABORES_PRODS';

export const productService = {
  getAll: (): Product[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(data);
  },

  getByCodigo: (codigo: string): Product | undefined => {
    const products = productService.getAll();
    return products.find((p) => p.codigo === codigo);
  },

  create: (newProduct: Product): Product => {
    const products = productService.getAll();
    products.push(newProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return newProduct;
  },

  update: (codigo: string, updatedData: Partial<Product>): Product | null => {
    const products = productService.getAll();
    const index = products.findIndex((p) => p.codigo === codigo);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updatedData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return products[index];
  },

  delete: (codigo: string): boolean => {
    const products = productService.getAll();
    const filtered = products.filter((p) => p.codigo !== codigo);
    if (filtered.length === products.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  resetDefaults: (): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
  },
};