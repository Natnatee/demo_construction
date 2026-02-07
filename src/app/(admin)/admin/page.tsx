'use client';

import { AdminGuard } from '@/components/AdminGuard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authed');
    router.push('/admin/login');
  };

  const adminModules = [
    { title: 'จัดการแบนเนอร์', icon: '🖼️', link: '/admin/banners', color: 'bg-blue-500' },
    { title: 'จัดการหมวดหมู่', icon: '📁', link: '/admin/categories', color: 'bg-green-500' },
    { title: 'จัดการแบรนด์', icon: '🏷️', link: '/admin/brands', color: 'bg-amber-500' },
    { title: 'จัดการสินค้า', icon: '📦', link: '/admin/products', color: 'bg-orange-500' },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen bg-muted">
        {/* Admin Header */}
        <header className="bg-background border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <span className="font-bold text-xl text-primary">ADMIN PANEL</span>
            <span className="text-muted-foreground text-sm">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if (confirm('คุณต้องการรีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้น (Mock Data) ใช่หรือไม่?')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="text-sm text-muted-foreground hover:text-red-600 transition-colors"
            >
              รีเซ็ตข้อมูล (Reset Mock)
            </button>
            <Link href="/" className="text-sm hover:underline">ไปที่หน้าเว็บ</Link>
            <button 
              onClick={handleLogout}
              className="btn bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 border border-red-200"
            >
              ออกจากระบบ
            </button>
          </div>
        </header>

        <main className="container py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">ยินดีต้อนรับ, Admin</h1>
            <p className="text-muted-foreground">เลือกโมดูลที่คุณต้องการจัดการ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminModules.map((module, idx) => (
              <Link 
                key={idx} 
                href={module.link}
                className="card bg-background p-8 hover:border-primary group text-center"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {module.icon}
                </div>
                <h3 className="text-xl font-bold">{module.title}</h3>
                <p className="text-muted-foreground text-sm mt-2">คลิกเพื่อจัดการข้อมูล</p>
              </Link>
            ))}
          </div>

          {/* Quick Stats Placeholder */}
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="card bg-background p-6">
              <h4 className="text-muted-foreground text-sm font-medium mb-2">สินค้าทั้งหมด</h4>
              <p className="text-3xl font-bold text-primary">-- รายการ</p>
            </div>
            <div className="card bg-background p-6">
              <h4 className="text-muted-foreground text-sm font-medium mb-2">หมวดหมู่ทั้งหมด</h4>
              <p className="text-3xl font-bold text-primary">-- หมวดหมู่</p>
            </div>
            <div className="card bg-background p-6">
              <h4 className="text-muted-foreground text-sm font-medium mb-2">วันที่อัปเดตล่าสุด</h4>
              <p className="text-3xl font-bold text-primary">{new Date().toLocaleDateString('th-TH')}</p>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
