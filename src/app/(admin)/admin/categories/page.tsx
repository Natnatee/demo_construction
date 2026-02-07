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
    if (confirm('ลบหมวดหมู่จะทำให้สินค้าในหมวดหมู่นี้มีปัญหา ยืนยันการลบ?')) {
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
      <div className="min-h-screen bg-muted pb-20">
        <header className="bg-background border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-bold text-xl text-primary">ADMIN PANEL</Link>
            <span className="text-muted-foreground">/</span>
            <span>จัดการหมวดหมู่</span>
          </div>
          <button onClick={handleOpenAdd} className="btn btn-primary px-4 py-2">+ เพิ่มหมวดหมู่</button>
        </header>
        <main className="container py-12">
          <div className="card bg-background overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-muted text-xs uppercase">
                <tr>
                  <th className="px-6 py-4">รูปภาพ</th>
                  <th className="px-6 py-4">ชื่อหมวดหมู่</th>
                  <th className="px-6 py-4 text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y tracking-tight">
                {categories.map(cat => (
                  <tr key={cat.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <img src={cat.imageUrl} className="w-10 h-10 object-cover rounded border" />
                    </td>
                    <td className="px-6 py-4 font-bold">{cat.name}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenEdit(cat)} className="p-2 hover:bg-blue-100 text-blue-600 rounded">✏️</button>
                        <button onClick={() => handleDelete(cat.id)} className="p-2 hover:bg-red-100 text-red-600 rounded">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-6">{editingItem ? 'แก้ไขหมวดหมู่' : 'เพิ่มหมวดหมู่'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">ชื่อหมวดหมู่</label>
                  <input className="w-full border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm mb-1">รูปภาพ URL</label>
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
