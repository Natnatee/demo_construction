'use client';

import React, { useState, useEffect } from 'react';
import { AdminGuard } from '@/components/AdminGuard';
import { productStorage, categoryStorage } from '@/lib/storage';
import { Product, Category } from '@/lib/types';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    categoryId: '',
    isFeatured: false
  });

  useEffect(() => {
    setProducts(productStorage.get());
    setCategories(categoryStorage.get());
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      categoryId: categories[0]?.id || '',
      isFeatured: false
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price || 0,
      imageUrl: product.imageUrl,
      categoryId: product.categoryId,
      isFeatured: product.isFeatured || false
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      productStorage.save(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedProducts: Product[];

    if (editingProduct) {
      updatedProducts = products.map(p => 
        p.id === editingProduct.id ? { ...p, ...formData } : p
      );
    } else {
      const newProduct: Product = {
        id: `p-${Date.now()}`,
        ...formData
      };
      updatedProducts = [newProduct, ...products];
    }

    setProducts(updatedProducts);
    productStorage.save(updatedProducts);
    setIsModalOpen(false);
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-muted pb-20">
        <header className="bg-background border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-bold text-xl text-primary hover:opacity-80 transition-opacity">
              ADMIN PANEL
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">จัดการสินค้า</span>
          </div>
          <button 
            onClick={handleOpenAdd}
            className="btn btn-primary px-4 py-2"
          >
            + เพิ่มสินค้าใหม่
          </button>
        </header>

        <main className="container py-12">
          <div className="card bg-background overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-muted text-muted-foreground text-sm uppercase">
                  <tr>
                    <th className="px-6 py-4 font-semibold">รูปภาพ</th>
                    <th className="px-6 py-4 font-semibold">ชื่อสินค้า</th>
                    <th className="px-6 py-4 font-semibold">หมวดหมู่</th>
                    <th className="px-6 py-4 font-semibold">ราคา</th>
                    <th className="px-6 py-4 font-semibold">แนะนำ</th>
                    <th className="px-6 py-4 font-semibold text-right">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <img 
                          src={product.imageUrl} 
                          alt="" 
                          className="w-12 h-12 object-cover rounded border"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold">{product.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
                          {product.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {categories.find(c => c.id === product.categoryId)?.name || 'ไม่ระบุ'}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        ฿{product.price?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {product.isFeatured ? (
                          <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-bold">
                            แนะนำ
                          </span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleOpenEdit(product)}
                            className="bg-blue-50 text-blue-600 p-2 rounded hover:bg-blue-100 transition-colors"
                            title="แก้ไข"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="bg-red-50 text-red-600 p-2 rounded hover:bg-red-100 transition-colors"
                            title="ลบ"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        ไม่พบข้อมูลสินค้า
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Modal-like Overlay for Adding/Editing */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-6 border-b flex justify-between items-center bg-muted/30">
                <h3 className="text-xl font-bold">
                  {editingProduct ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground p-1"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">ชื่อสินค้า *</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">หมวดหมู่ *</label>
                    <select 
                      className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary"
                      value={formData.categoryId}
                      onChange={e => setFormData({...formData, categoryId: e.target.value})}
                      required
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ราคา (บาท) *</label>
                    <input 
                      type="number"
                      className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">รูปภาพ URL *</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary"
                      value={formData.imageUrl}
                      onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                      placeholder="https://images.unsplash.com/..."
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">คำอธิบาย *</label>
                    <textarea 
                      className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary h-24 resize-none"
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <input 
                      type="checkbox"
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onChange={e => setFormData({...formData, isFeatured: e.target.checked})}
                      className="w-5 h-5 accent-primary"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium">ทำเป็นสินค้าแนะนำ</label>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t flex justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn px-6 py-2 border border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    ยกเลิก
                  </button>
                  <button 
                    type="submit"
                    className="btn btn-primary px-8 py-2"
                  >
                    บันทึกข้อมูล
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
