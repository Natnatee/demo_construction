export interface Banner {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  link?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface Brand {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  imageUrl: string;
  categoryId: string;
  brandId?: string;
  isFeatured?: boolean;
}
