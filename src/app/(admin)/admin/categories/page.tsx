'use client';

import React, { useState, useEffect } from 'react';
import { AdminGuard } from '@/components/AdminGuard';
import { categoryStorage } from '@/lib/storage';
import { Category } from '@/lib/types';
import Link from 'next/link';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Category | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: ''
  });

  useEffect(() => {
    setCategories(categoryStorage.get());
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', imageUrl: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Category) => {
    setEditingItem(item);
    setFormData({ name: item.name, imageUrl: item.imageUrl || '' });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('การลบหมวดหมู่จะทำให้สินค้าในหมวดหมู่นี้มองหาหมวดหมู่ไม่เจอ ยืนยันการลบ?')) {
      const updated = categories.filter(c => c.id !== id);
      setCategories(updated);
      categoryStorage.save(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: Category[];
    if (editingItem) {
      updated = categories.map(c => c.id === editingItem.id ? { ...c, ...formData } : c);
    } else {
      updated = [...categories, { id: `cat-${Date.now()}`, ...formData }];
    }
    setCategories(updated);
    categoryStorage.save(updated);
    setIsModalOpen(false);
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-50 pb-20">
        <header className="bg-white/80 backdrop-blur-md border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-bold text-xl tracking-tight text-slate-800 hover:text-orange-600 transition-colors text-[0.9rem] sm:text-[1.2rem]">ADMIN PANEL</Link>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-600">จัดการหมวดหมู่</span>
          </div>
          <button 
            onClick={handleOpenAdd} 
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-orange-100 transition-all active:scale-95"
          >
            + เพิ่มหมวดหมู่
          </button>
        </header>

        <main className="container max-w-6xl mx-auto py-12 px-6">
          <div className="mb-8 block sm:flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">หมวดหมู่สินค้า</h1>
              <p className="text-slate-500 text-sm">จัดการประเภทของวัสดุก่อสร้างทั้งหมด</p>
            </div>
            <div className="mt-4 sm:mt-0 text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-lg border border-slate-200">
              ทั้งหมด {categories.length} รายการ
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">รูปภาพ</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">ชื่อหมวดหมู่</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">ดำเนินการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {categories.map(cat => (
                    <tr key={cat.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="w-14 h-14 rounded-2xl border border-slate-100 overflow-hidden bg-slate-50">
                          <img src={cat.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={cat.name} />
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="font-bold text-slate-800 text-lg">{cat.name}</div>
                        <div className="text-xs font-mono text-slate-400 mt-1">ID: {cat.id}</div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleOpenEdit(cat)} 
                            className="p-2.5 hover:bg-orange-50 text-orange-600 rounded-xl transition-colors border border-transparent hover:border-orange-100"
                            title="แก้ไข"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M18.364 5.636l-3.536 3.536m0 0L10.243 13.757m4.585-4.585L18.364 5.636z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(cat.id)} 
                            className="p-2.5 hover:bg-red-50 text-red-600 rounded-xl transition-colors border border-transparent hover:border-red-100"
                            title="ลบ"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {categories.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-8 py-20 text-center text-slate-400 font-medium">
                        ยังไม่มีข้อมูลหมวดหมู่
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
            <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{editingItem ? 'แก้ไขหมวดหมู่' : 'เพิ่มหมวดหมู่'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 ml-1">ชื่อหมวดหมู่</label>
                  <input 
                    className="w-full border border-slate-200 bg-slate-50/50 p-4 rounded-2xl focus:ring-4 ring-orange-50 focus:bg-white border-none outline-none transition-all text-slate-800 font-bold placeholder:text-slate-300" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    placeholder="เช่น ปูนซีเมนต์, เหล็กเส้น"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 ml-1">รูปภาพ URL</label>
                  <input 
                    className="w-full border border-slate-200 bg-slate-50/50 p-4 rounded-2xl focus:ring-4 ring-orange-50 focus:bg-white border-none outline-none transition-all text-slate-800 font-mono text-sm placeholder:text-slate-300" 
                    value={formData.imageUrl} 
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                    placeholder="https://example.com/image.jpg"
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
                    className="flex-1 py-4 bg-orange-600 text-white rounded-2xl font-bold shadow-xl shadow-orange-100 hover:bg-orange-700 transition-all active:scale-95 translate-y-[-2px] hover:translate-y-[-4px]"
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
