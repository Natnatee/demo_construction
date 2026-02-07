'use client';

import React, { useState, useEffect } from 'react';
import { AdminGuard } from '@/components/AdminGuard';
import { bannerStorage } from '@/lib/storage';
import { Banner } from '@/lib/types';
import Link from 'next/link';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Banner | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    description: '',
    link: ''
  });

  useEffect(() => {
    setBanners(bannerStorage.get());
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', imageUrl: '', description: '', link: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Banner) => {
    setEditingItem(item);
    setFormData({ 
      title: item.title, 
      imageUrl: item.imageUrl, 
      description: item.description || '', 
      link: item.link || '' 
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('ยืนยันการลบแบนเนอร์?')) {
      const updated = banners.filter(b => b.id !== id);
      setBanners(updated);
      bannerStorage.save(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: Banner[];
    if (editingItem) {
      updated = banners.map(b => b.id === editingItem.id ? { ...b, ...formData } : b);
    } else {
      updated = [...banners, { id: `banner-${Date.now()}`, ...formData }];
    }
    setBanners(updated);
    bannerStorage.save(updated);
    setIsModalOpen(false);
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-50 pb-20">
        <header className="bg-white/80 backdrop-blur-md border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-bold text-xl tracking-tight text-slate-800 hover:text-orange-600 transition-colors">ADMIN PANEL</Link>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-600">จัดการแบนเนอร์</span>
          </div>
          <button 
            onClick={handleOpenAdd} 
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-orange-100 transition-all active:scale-95"
          >
            + เพิ่มแบนเนอร์
          </button>
        </header>

        <main className="container max-w-6xl mx-auto py-12 px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">รายการแบนเนอร์</h1>
            <p className="text-slate-500 text-sm">จัดการรูปสไลด์ที่แสดงในหน้าแรกของเว็บไซต์</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[0.8rem] text-slate-800">
            {banners.map(banner => (
              <div key={banner.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="aspect-[21/9] relative overflow-hidden bg-slate-100">
                  <img src={banner.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={banner.title} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-1">{banner.title}</h4>
                  <p className="text-slate-500 line-clamp-2 mb-4 h-10">{banner.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="text-xs font-mono text-slate-400">ID: {banner.id}</div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleOpenEdit(banner)} 
                        className="px-4 py-2 hover:bg-orange-50 text-orange-600 rounded-xl text-xs font-bold border border-orange-100 transition-colors"
                      >
                        แก้ไข
                      </button>
                      <button 
                        onClick={() => handleDelete(banner.id)} 
                        className="px-4 py-2 hover:bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 transition-colors"
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {banners.length === 0 && (
              <div className="col-span-full py-20 bg-white border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400">
                <span className="text-4xl mb-4">🖼️</span>
                <p className="font-medium">ยังไม่มีข้อมูลแบนเนอร์</p>
                <button onClick={handleOpenAdd} className="mt-4 text-orange-600 font-bold hover:underline">เพิ่มรายการแรก</button>
              </div>
            )}
          </div>
        </main>

        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">{editingItem ? 'แก้ไขแบนเนอร์' : 'เพิ่มแบนเนอร์'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">×</button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">หัวข้อแบนเนอร์</label>
                  <input 
                    className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 ring-orange-100 border-orange-200 outline-none transition-all" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})} 
                    placeholder="เช่น วัสดุก่อสร้างคุณภาพ"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">รูปภาพ URL</label>
                  <input 
                    className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 ring-orange-100 border-orange-200 outline-none transition-all font-mono text-sm" 
                    value={formData.imageUrl} 
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                    placeholder="/images/banner1.jpg"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">คำอธิบาย</label>
                  <textarea 
                    className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 ring-orange-100 border-orange-200 outline-none transition-all h-24 resize-none" 
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                    placeholder="รายละเอียดเพิ่มเติม..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">ลิงก์ปลายทาง</label>
                  <input 
                    className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 ring-orange-100 border-orange-200 outline-none transition-all font-mono text-sm" 
                    value={formData.link} 
                    onChange={e => setFormData({...formData, link: e.target.value})} 
                    placeholder="/products"
                  />
                </div>
                
                <div className="flex gap-3 mt-8">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="flex-1 py-3 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    ยกเลิก
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 bg-orange-600 text-white rounded-2xl font-bold shadow-lg shadow-orange-100 hover:bg-orange-700 transition-all active:scale-95"
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
