'use client';

import React, { useEffect, useState } from 'react';
import { brandStorage } from '@/lib/storage';
import { Brand } from '@/lib/types';
import Link from 'next/link';

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    setBrands(brandStorage.get());
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">แบรนด์สินค้าที่เราจำหน่าย</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            เรารวบรวมวัสดุก่อสร้างจากแบรนด์ชั้นนำที่ได้รับความไว้วางใจในระดับสากล เพื่อให้ท่านมั่นใจในคุณภาพและความคุ้มค่า
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {brands.map(brand => (
            <div key={brand.id} className="card p-6 flex flex-col items-center justify-center hover:border-primary transition-all">
              <div className="h-20 w-full relative mb-4">
                <img 
                  src={brand.imageUrl} 
                  alt={brand.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-bold text-center">{brand.name}</h3>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-muted rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">สนใจเป็นพาร์ทเนอร์หรือสั่งสินค้าแบรนด์อื่น?</h2>
          <p className="text-muted-foreground mb-8">
            เราสามารถจัดหาวัสดุตามสเปกและแบรนด์ที่ท่านต้องการได้ แม้จะไม่มีแสดงในหน้านี้
          </p>
          <Link href="/contact" className="btn btn-primary px-10 py-3 text-lg">
            ติดต่อสอบถามข้อมูลเพิ่มเติม
          </Link>
        </div>
      </div>
    </div>
  );
}
