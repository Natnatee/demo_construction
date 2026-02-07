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
      <div className="min-h-screen bg-muted pb-20">
        <header className="bg-background border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-bold text-xl text-primary">ADMIN PANEL</Link>
            <span className="text-muted-foreground">/</span>
            <span>จัดการแบรนด์</span>
          </div>
          <button onClick={handleOpenAdd} className="btn btn-primary px-4 py-2">+ เพิ่มแบรนด์</button>
        </header>
        <main className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {brands.map(brand => (
              <div key={brand.id} className="card bg-background p-4 flex flex-col items-center">
                <div className="h-20 w-full relative mb-4 flex items-center justify-center">
                  <img src={brand.imageUrl} className="max-h-full max-w-full object-contain" />
                </div>
                <h4 className="font-bold text-sm mb-4">{brand.name}</h4>
                <div className="flex gap-2 w-full">
                  <button onClick={() => handleOpenEdit(brand)} className="flex-1 p-1 hover:bg-blue-100 text-blue-600 rounded text-xs border">แก้ไข</button>
                  <button onClick={() => handleDelete(brand.id)} className="flex-1 p-1 hover:bg-red-100 text-red-600 rounded text-xs border">ลบ</button>
                </div>
              </div>
            ))}
          </div>
        </main>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg p-6 w-full max-w-sm">
              <h3 className="text-xl font-bold mb-6">{editingItem ? 'แก้ไขแบรนด์' : 'เพิ่มแบรนด์'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">ชื่อแบรนด์</label>
                  <input className="w-full border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm mb-1">รูปภาพ LOGO URL</label>
                  <input className="w-full border p-2 rounded" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} required />
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">ยกเลิก</button>
                  <button type="submit" className="btn btn-primary px-4 py-2">บันทึก</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
