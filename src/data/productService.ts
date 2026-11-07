export interface Product {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string;
  imagen: string;
  stock: number;
}

export interface CartItem extends Product {
  cantidad: number;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    nombre: 'Torta Cuatro Leches',
    categoria: 'Tortas Tradicionales',
    precio: 18500,
    descripcion: 'Bizcocho húmedo bañado en mezcla de cuatro leches con merengue dorado.',
    imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
    stock: 10,
  },
  {
    id: 2,
    nombre: 'Torta Selva Negra',
    categoria: 'Tortas Tradicionales',
    precio: 21000,
    descripcion: 'Capas de chocolate, crema chantilly y guindas seleccionadas.',
    imagen: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500',
    stock: 8,
  },
  {
    id: 3,
    nombre: 'Pie de Limón',
    categoria: 'Tartas y Pies',
    precio: 12000,
    descripcion: 'Masa sablee crocante rellena de crema de limón y merengue suizo.',
    imagen: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=500',
    stock: 15,
  },
  {
    id: 4,
    nombre: 'Cheesecake Frutos Rojos',
    categoria: 'Postres Especiales',
    precio: 19500,
    descripcion: 'Cremoso cheesecake con base de galleta y coulis de frambuesa y mora.',
    imagen: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500',
    stock: 5,
  },
  {
    id: 5,
    nombre: 'Torta Amor Sin Azúcar',
    categoria: 'Línea Sin Azúcar',
    precio: 23000,
    descripcion: 'Hojarasca, crema pastelera dietética, mermelada de frambuesa y manjar sin azúcar.',
    imagen: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=500',
    stock: 6,
  },
  {
    id: 6,
    nombre: 'Brazo de Reina',
    categoria: 'Pastelería Clásica',
    precio: 9500,
    descripcion: 'Esponjoso pionono relleno de abundante manjar artesanal.',
    imagen: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500',
    stock: 12,
  },
];

const STORAGE_KEY = 'PASTELERIA_PRODUCTOS';

export const productService = {
  getAll: (): Product[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(data);
  },

  getById: (id: number): Product | undefined => {
    const products = productService.getAll();
    return products.find((p) => p.id === id);
  },

  create: (newProduct: Omit<Product, 'id'>): Product => {
    const products = productService.getAll();
    const created: Product = {
      ...newProduct,
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    };
    products.push(created);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return created;
  },

  update: (id: number, updatedData: Partial<Product>): Product | null => {
    const products = productService.getAll();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updatedData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return products[index];
  },

  delete: (id: number): boolean => {
    const products = productService.getAll();
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },
};