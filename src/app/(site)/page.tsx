'use client';

import React, { useEffect, useState } from 'react';
import { bannerStorage, categoryStorage, productStorage } from '@/lib/storage';
import { Banner, Category, Product } from '@/lib/types';
import Link from 'next/link';

export default function HomePage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setBanners(bannerStorage.get());
    setCategories(categoryStorage.get());
    setFeaturedProducts(productStorage.get().filter(p => p.isFeatured));
  }, []);

  return (
    <div>
      {/* Hero Banner Section */}
      <section className="relative h-[500px] overflow-hidden">
        {banners.length > 0 && (
          <div className="absolute inset-0">
            <img 
              src={banners[0].imageUrl} 
              alt={banners[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center">
              <div className="container">
                <div className="max-w-2xl text-white">
                  <h1 className="text-5xl font-bold mb-6">{banners[0].title}</h1>
                  <p className="text-xl mb-8">{banners[0].description}</p>
                  <Link href="/products" className="btn btn-primary px-8 py-3 text-lg">
                    ดูสินค้าทั้งหมด
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="section bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">หมวดหมู่สินค้า</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(cat => (
              <Link key={cat.id} href={`/products?category=${cat.id}`} className="card group">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={cat.imageUrl} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                    <h3 className="text-white font-bold">{cat.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">สินค้าแนะนำ</h2>
              <div className="w-20 h-1 bg-primary"></div>
            </div>
            <Link href="/products" className="text-primary font-medium hover:underline">
              ดูทั้งหมด &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="card flex flex-col">
                <div className="aspect-square relative">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-primary font-bold text-lg">
                      {product.price ? `฿${product.price.toLocaleString()}` : 'ติดต่อเจ้าหน้าที่'}
                    </span>
                    <Link href={`/products/${product.id}`} className="btn btn-primary text-xs">
                      รายละเอียด
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Why Us Section */}
      <section className="section bg-slate-900 text-white">
        <div className="container grid md:grid-cols-3 gap-12 text-center">
          <div className="p-6">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary text-3xl">🏗️</div>
            <h3 className="text-xl font-bold mb-4">ประสบการณ์สูง</h3>
            <p className="text-slate-400">เรามีประสบการณ์ในธุรกิจวัสดุก่อสร้างมาอย่างยาวนาน เข้าใจทุกความต้องการ</p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary text-3xl">📄</div>
            <h3 className="text-xl font-bold mb-4">ออกใบกำกับภาษีได้</h3>
            <p className="text-slate-400">รองรับลูกค้าองค์กรและผู้รับเหมา สามารถออกใบกำกับภาษีเต็มรูปแบบได้ทันที</p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary text-3xl">🤝</div>
            <h3 className="text-xl font-bold mb-4">ต่อรองราคาได้</h3>
            <p className="text-slate-400">ยินดีพิจารณาราคาลดพิเศษตามขอบเขตและปริมาณการสั่งซื้อของท่าน</p>
          </div>
        </div>
      </section>
    </div>
  );
}
