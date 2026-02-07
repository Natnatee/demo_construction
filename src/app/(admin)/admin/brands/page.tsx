'use client';

import React, { useState, useEffect } from 'react';
import { AdminGuard } from '@/components/AdminGuard';
import { brandStorage } from '@/lib/storage';
import { Brand } from '@/lib/types';
import Link from 'next/link';

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Brand | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: ''
  });

  useEffect(() => {
    setBrands(brandStorage.get());
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', imageUrl: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Brand) => {
    setEditingItem(item);
    setFormData({ name: item.name, imageUrl: item.imageUrl });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('ยืนยันการลบแบรนด์?')) {
      const updated = brands.filter(b => b.id !== id);
      setBrands(updated);
      brandStorage.save(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: Brand[];
    if (editingItem) {
      updated = brands.map(b => b.id === editingItem.id ? { ...b, ...formData } : b);
    } else {
      updated = [...brands, { id: `brand-${Date.now()}`, ...formData }];
    }
    setBrands(updated);
    brandStorage.save(updated);
    setIsModalOpen(false);
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-50 pb-20 text-[0.9rem] sm:text-[1rem]">
        <header className="bg-white/80 backdrop-blur-md border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-bold text-xl tracking-tight text-slate-800 hover:text-orange-600 transition-colors">ADMIN PANEL</Link>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-600">จัดการแบรนด์</span>
          </div>
          <button 
            onClick={handleOpenAdd} 
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-orange-100 transition-all active:scale-95"
          >
            + เพิ่มแบรนด์
          </button>
        </header>

        <main className="container max-w-6xl mx-auto py-12 px-6">
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">แบรนด์สินค้า</h1>
            <p className="text-slate-500 text-sm">จัดการยี่ห้อสินค้าที่จำหน่ายในเว็บไซต์</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {brands.map(brand => (
              <div key={brand.id} className="group bg-white rounded-3xl border border-slate-200 p-6 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className="h-24 w-full relative mb-6 flex items-center justify-center p-2">
                  <img src={brand.imageUrl} className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" alt={brand.name} />
                </div>
                <h4 className="font-bold text-slate-800 mb-6 text-center">{brand.name}</h4>
                <div className="flex gap-2 w-full pt-4 border-t border-slate-50">
                  <button 
                    onClick={() => handleOpenEdit(brand)} 
                    className="flex-1 p-2 hover:bg-orange-50 text-orange-600 rounded-xl text-xs font-bold border border-transparent hover:border-orange-100 transition-colors"
                  >
                    แก้ไข
                  </button>
                  <button 
                    onClick={() => handleDelete(brand.id)} 
                    className="flex-1 p-2 hover:bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-transparent hover:border-red-100 transition-colors"
                  >
                    ลบ
                  </button>
                </div>
                {/* Decorative glow on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
            
            {brands.length === 0 && (
              <div className="col-span-full py-20 bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-400">
                <span className="text-4xl mb-4">🏷️</span>
                <p className="font-medium">ยังไม่มีข้อมูลแบรนด์สินค้า</p>
                <button onClick={handleOpenAdd} className="mt-4 text-orange-600 font-bold hover:underline">เพิ่มแบรนด์แรก</button>
              </div>
            )}
          </div>
        </main>

        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{editingItem ? 'แก้ไขแบรนด์' : 'เพิ่มแบรนด์'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 ml-1">ชื่อแบรนด์</label>
                  <input 
                    className="w-full border border-slate-200 bg-slate-50/50 p-4 rounded-2xl focus:ring-4 ring-orange-50 focus:bg-white border-none outline-none transition-all text-slate-800 font-bold placeholder:text-slate-300" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    placeholder="เช่น SCG, TOA, จระเข้"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 ml-1">รูปโลโก้ URL</label>
                  <input 
                    className="w-full border border-slate-200 bg-slate-50/50 p-4 rounded-2xl focus:ring-4 ring-orange-50 focus:bg-white border-none outline-none transition-all text-slate-800 font-mono text-sm placeholder:text-slate-300" 
                    value={formData.imageUrl} 
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                    placeholder="https://example.com/logo.png"
                    required 
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="flex-1 py-4 bg-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-200 transition-all active:scale-95"
                  >
                    ยกเลิก
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-4 bg-orange-600 text-white rounded-2xl font-bold shadow-xl shadow-orange-100 hover:bg-orange-700 transition-all active:scale-95"
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
