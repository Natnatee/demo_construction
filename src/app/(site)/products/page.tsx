'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { productStorage, categoryStorage } from '@/lib/storage';
import { Product, Category } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const searchParams = useSearchParams();
  const catFilter = searchParams.get('category');

  useEffect(() => {
    setProducts(productStorage.get());
    setCategories(categoryStorage.get());
  }, []);

  const filteredProducts = catFilter 
    ? products.filter(p => p.categoryId === catFilter)
    : products;

  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar / Filters */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <h2 className="text-xl font-bold mb-6">หมวดหมู่สินค้า</h2>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/products"
                  className={`block px-4 py-2 rounded transition-colors ${!catFilter ? 'bg-primary text-white font-bold' : 'hover:bg-muted'}`}
                >
                  ทั้งหมด
                </Link>
              </li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link 
                    href={`/products?category=${cat.id}`}
                    className={`block px-4 py-2 rounded transition-colors ${catFilter === cat.id ? 'bg-primary text-white font-bold' : 'hover:bg-muted'}`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main List */}
          <div className="flex-grow">
            <div className="mb-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold">
                {catFilter ? categories.find(c => c.id === catFilter)?.name : 'สินค้าทั้งหมด'}
              </h1>
              <p className="text-muted-foreground">{filteredProducts.length} รายการ</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="card flex flex-col h-full">
                  <div className="aspect-square relative flex-shrink-0">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
                      {product.description}
                    </p>
                    <div className="mt-auto pt-4 flex flex-col gap-2">
                       <span className="text-primary font-bold text-xl mb-2">
                        {product.price ? `฿${product.price.toLocaleString()}` : 'ติดต่อเจ้าหน้าที่'}
                      </span>
                      <Link href={`/products/${product.id}`} className="btn btn-primary w-full">
                        ดูรายละเอียด
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center text-muted-foreground">
                ไม่พบสินค้าในหมวดหมู่นี้
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container py-20 text-center">กำลังโหลด...</div>}>
      <ProductsList />
    </Suspense>
  )
}
