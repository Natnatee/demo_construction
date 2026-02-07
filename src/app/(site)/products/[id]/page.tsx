'use client';

import React, { useEffect, useState, use } from 'react';
import { productStorage, categoryStorage, brandStorage } from '@/lib/storage';
import { Product, Category, Brand } from '@/lib/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const router = useRouter();

  useEffect(() => {
    const products = productStorage.get();
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setCategory(categoryStorage.get().find(c => c.id === found.categoryId) || null);
      if (found.brandId) {
        setBrand(brandStorage.get().find(b => b.id === found.brandId) || null);
      }
    }
  }, [id]);

  if (!product) {
    return (
       <div className="container py-20 text-center">
        <h2 className="text-2xl mb-4">ไม่พบสินค้า</h2>
        <button onClick={() => router.back()} className="text-primary hover:underline">
          ย้อนกลับ
        </button>
      </div>
    );
  }

  return (
    <div className="section min-h-[600px]">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="card aspect-square overflow-hidden bg-white">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">หน้าแรก</Link>
                <span>/</span>
                <Link href="/products" className="hover:text-primary">สินค้า</Link>
                <span>/</span>
                <span className="text-foreground font-medium">{product.name}</span>
              </div>
              <h1 className="text-4xl font-bold">{product.name}</h1>
              {brand && <p className="text-lg text-primary font-medium">แบรนด์: {brand.name}</p>}
            </div>

            <div className="text-4xl font-black text-primary">
              {product.price ? `฿${product.price.toLocaleString()}` : 'ติดต่อเพื่อสอบถามราคา'}
            </div>

            <div className="py-6 border-y">
              <h3 className="font-bold text-lg mb-4">รายละเอียดสินค้า</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            <div className="bg-muted p-6 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">สถานะ</span>
                <span className="text-green-600 font-bold">มีสินค้าพร้อมจำหน่าย</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">หมวดหมู่</span>
                <span className="font-medium">{category?.name}</span>
              </div>
              <button 
                onClick={() => alert('ติดต่อเราที่เบอร์ 02-xxx-xxxx เพื่อสั่งสินค้า')}
                className="btn btn-primary w-full py-4 text-lg font-bold"
              >
                สนใจสั่งซื้อสินค้า / สอบถามราคา
              </button>
            </div>

            <div className="text-sm text-muted-foreground flex gap-4 mt-4">
              <span className="flex items-center gap-1">✅ ออกใบกำกับภาษีได้</span>
              <span className="flex items-center gap-1">✅ ต่อรองราคาปริมาณมากได้</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
