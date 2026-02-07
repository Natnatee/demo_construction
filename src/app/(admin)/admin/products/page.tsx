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
      <div className="min-h-screen bg-slate-50 pb-20">
        <header className="bg-white/80 backdrop-blur-md border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-bold text-xl tracking-tight text-slate-800 hover:text-orange-600 transition-colors">ADMIN PANEL</Link>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-600">จัดการสินค้า</span>
          </div>
          <button 
            onClick={handleOpenAdd} 
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-orange-100 transition-all active:scale-95"
          >
            + เพิ่มสินค้าใหม่
          </button>
        </header>

        <main className="container max-w-7xl mx-auto py-12 px-6">
          <div className="mb-10 block sm:flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">รายการสินค้า</h1>
              <p className="text-slate-500 text-sm mt-1">จัดการข้อมูล รายราคา และสถานะสินค้าทั้งหมด</p>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">สินค้า</th>
                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">หมวดหมู่</th>
                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">ราคา</th>
                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">สถานะ</th>
                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">ดำเนินการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl border border-slate-100 overflow-hidden bg-slate-50 shrink-0">
                            <img src={product.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 leading-snug">{product.name}</div>
                            <div className="text-xs text-slate-400 mt-1 line-clamp-1 max-w-[200px]">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                          {categories.find(c => c.id === product.categoryId)?.name || 'ไม่ระบุ'}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="font-black text-slate-900 text-lg">฿{product.price?.toLocaleString()}</div>
                      </td>
                      <td className="px-8 py-5">
                        {product.isFeatured ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-orange-100 shadow-sm shadow-orange-50">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                            สินค้าแนะนำ
                          </span>
                        ) : (
                          <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">- ทั่วไป -</span>
                        )}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleOpenEdit(product)} 
                            className="p-3 bg-slate-50 hover:bg-orange-50 text-slate-400 hover:text-orange-600 rounded-2xl transition-all border border-transparent hover:border-orange-100"
                            title="แก้ไข"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M18.364 5.636l-3.536 3.536m0 0L10.243 13.757m4.585-4.585L18.364 5.636z" /></svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)} 
                            className="p-3 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-2xl transition-all border border-transparent hover:border-red-100"
                            title="ลบ"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-8 py-32 text-center">
                        <div className="text-slate-300 text-4xl mb-4">📦</div>
                        <div className="text-slate-400 font-bold">ไม่พบข้อมูลสินค้า</div>
                        <button onClick={handleOpenAdd} className="mt-4 text-orange-600 font-bold hover:underline">คลิกเพื่อเริ่มเพิ่มสินค้า</button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-300">
              <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                  {editingProduct ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white text-slate-400 hover:text-slate-600 transition-all font-bold"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-10">
                <div className="grid grid-cols-2 gap-8">
                  <div className="col-span-2">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">ชื่อสินค้า *</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50/50 p-4 rounded-2xl focus:ring-4 ring-orange-50 focus:bg-white border-none outline-none transition-all font-bold text-slate-800"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">หมวดหมู่ *</label>
                    <select 
                      className="w-full bg-slate-50/50 p-4 rounded-2xl focus:ring-4 ring-orange-50 focus:bg-white border-none outline-none transition-all font-bold text-slate-800 appearance-none"
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
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">ราคา (บาท) *</label>
                    <input 
                      type="number"
                      className="w-full bg-slate-50/50 p-4 rounded-2xl focus:ring-4 ring-orange-50 focus:bg-white border-none outline-none transition-all font-bold text-slate-800"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">รูปภาพ URL *</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50/50 p-4 rounded-2xl focus:ring-4 ring-orange-50 focus:bg-white border-none outline-none transition-all font-mono text-xs text-slate-500"
                      value={formData.imageUrl}
                      onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                      placeholder="https://images.unsplash.com/..."
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">คำอธิบายสรุป</label>
                    <textarea 
                      className="w-full bg-slate-50/50 p-4 rounded-2xl focus:ring-4 ring-orange-50 focus:bg-white border-none outline-none transition-all h-28 resize-none text-slate-600"
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <input 
                      type="checkbox"
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onChange={e => setFormData({...formData, isFeatured: e.target.checked})}
                      className="w-6 h-6 rounded-lg accent-orange-600 border-none outline-none"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-black text-slate-700 uppercase tracking-widest cursor-pointer">ตั้งเป็นสินค้าแนะนำบนหน้าหลัก</label>
                  </div>
                </div>
                <div className="mt-10 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 bg-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-200 transition-all active:scale-[0.98]"
                  >
                    ยกเลิก
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
                  >
                    บันทึกข้อมูลสินค้า
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
