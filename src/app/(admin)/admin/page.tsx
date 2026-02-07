'use client';

import { AdminGuard } from '@/components/AdminGuard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { bannerStorage, categoryStorage, brandStorage, productStorage } from '@/lib/storage';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    banners: 0,
    categories: 0,
    brands: 0,
    products: 0,
  });

  useEffect(() => {
    // โหลดข้อมูลจำนวนรายการจาก storage
    setStats({
      banners: bannerStorage.get().length,
      categories: categoryStorage.get().length,
      brands: brandStorage.get().length,
      products: productStorage.get().length,
    });
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authed');
    router.push('/admin/login');
  };

  const adminModules = [
    { title: 'จัดการแบนเนอร์', icon: '🖼️', link: '/admin/banners', color: 'bg-blue-500', count: stats.banners, desc: 'รูปสไลด์หน้าแรก' },
    { title: 'จัดการหมวดหมู่', icon: '📁', link: '/admin/categories', color: 'bg-green-500', count: stats.categories, desc: 'โครงสร้างสินค้า' },
    { title: 'จัดการแบรนด์', icon: '🏷️', link: '/admin/brands', color: 'bg-amber-500', count: stats.brands, desc: 'ยี่ห้อสินค้า' },
    { title: 'จัดการสินค้า', icon: '📦', link: '/admin/products', color: 'bg-orange-500', count: stats.products, desc: 'รายการสินค้าทั้งหมด' },
  ];

  // ข้อมูลกราฟจำลอง (Mock chart data)
  const chartPoints = [35, 60, 45, 90, 65, 110, 85];
  const maxPoint = 120; // ค่าสูงสุดสำหรับสเกลกราฟ
  
  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-50/50">
        {/* Admin Header */}
        <header className="bg-white/80 backdrop-blur-md border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-orange-200">A</div>
            <span className="font-bold text-xl tracking-tight text-slate-800">ADMIN PANEL</span>
            <div className="h-4 w-[1px] bg-slate-200 mx-2" />
            <span className="text-slate-500 text-sm font-medium">ภาพรวมระบบ</span>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => {
                if (confirm('คุณต้องการรีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้น (Mock Data) ใช่หรือไม่?')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-wider"
            >
              Reset Mock Data
            </button>
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors">ดูหน้าเว็บ</Link>
            <button 
              onClick={handleLogout}
              className="px-5 py-2 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm active:scale-95"
            >
              ออกจากระบบ
            </button>
          </div>
        </header>

        <main className="container max-w-7xl mx-auto py-10 px-6">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">ยินดีต้อนรับ, Admin</h1>
              <p className="text-slate-500">นี่คือสรุปความเคลื่อนไหวล่าสุดของเว็บไซต์คุณ</p>
            </div>
            <div className="flex gap-2 text-xs font-bold text-slate-400">
              <span className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
                อัปเดตอัตโนมัติ: เปิด
              </span>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {adminModules.map((module, idx) => (
              <Link 
                key={idx} 
                href={module.link}
                className="group relative overflow-hidden bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 ${module.color} bg-opacity-10 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {module.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-slate-900">{module.count}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">รายการ</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-orange-600 transition-colors">{module.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{module.desc}</p>
                <div className="mt-4 flex items-center text-xs font-medium text-slate-400 group-hover:text-slate-600">
                  <span>แก้ไขข้อมูล</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                {/* Decorative background circle */}
                <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${module.color} opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500`} />
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Section */}
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">สถิติผู้เข้าชมเว็บไซต์</h3>
                  <p className="text-sm text-slate-400">ข้อมูลย้อนหลัง 7 วัน (จำลองสถานการณ์)</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1.5 rounded-lg border border-green-100">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    +24% สัปดาห์นี้
                  </span>
                </div>
              </div>
              
              <div className="relative h-64 w-full mt-auto mb-6">
                {/* Grid Lines */}
                <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between py-2 overflow-hidden pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full h-[1px] bg-slate-50" />
                  ))}
                </div>

                {/* SVG Chart */}
                <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Area Area */}
                  <path
                    d={`M 0,${256 - (chartPoints[0] / maxPoint) * 200} 
                        ${chartPoints.map((p, i) => `L ${(i / (chartPoints.length - 1)) * 100}%,${256 - (p / maxPoint) * 200}`).join(' ')} 
                        L 100%,256 L 0,256 Z`}
                    fill="url(#chartGradient)"
                    className="transition-all duration-1000 ease-in-out"
                  />
                  
                  {/* Line Chart */}
                  <path
                    d={`M 0,${256 - (chartPoints[0] / maxPoint) * 200} 
                        ${chartPoints.map((p, i) => `L ${(i / (chartPoints.length - 1)) * 100}%,${256 - (p / maxPoint) * 200}`).join(' ')}`}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-1000 ease-in-out"
                  />

                  {/* Points on Hover */}
                  {chartPoints.map((p, i) => (
                    <g key={i} className="group/point">
                      <circle
                        cx={`${(i / (chartPoints.length - 1)) * 100}%`}
                        cy={256 - (p / maxPoint) * 200}
                        r="5"
                        fill="white"
                        stroke="#f97316"
                        strokeWidth="2.5"
                        className="transition-all duration-300"
                      />
                      <rect 
                        x={`${(i / (chartPoints.length - 1)) * 100 - 15}%`}
                        y={256 - (p / maxPoint) * 200 - 35}
                        width="30"
                        height="20"
                        rx="4"
                        className="opacity-0 group-hover/point:opacity-100 fill-slate-800 transition-opacity duration-200"
                      />
                      <text
                        x={`${(i / (chartPoints.length - 1)) * 100}%`}
                        y={256 - (p / maxPoint) * 200 - 21}
                        textAnchor="middle"
                        className="opacity-0 group-hover/point:opacity-100 fill-white text-[10px] font-bold transition-opacity duration-200"
                      >
                        {p}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Labels */}
                <div className="absolute -bottom-8 inset-x-0 flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                  {['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'].map((day) => (
                    <span key={day} className="w-10 text-center">{day}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Side Info */}
            <div className="space-y-6">
              <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden group shadow-xl">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <h4 className="text-orange-400 font-bold uppercase tracking-widest text-xs">เซิร์ฟเวอร์ออนไลน์</h4>
                  </div>
                  <div className="text-2xl font-bold mb-6">ระบบทำงานปกติ</div>
                  <div className="space-y-4 border-t border-white/10 pt-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">อัปเดตล่าสุด</span>
                      <span className="font-mono text-orange-200">{new Date().toLocaleTimeString('th-TH')}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">เวอร์ชัน</span>
                      <span className="font-mono text-slate-400">v1.2.4</span>
                    </div>
                  </div>
                  <button className="w-full mt-8 py-3.5 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold transition-all border border-white/5 hover:border-white/10 active:scale-[0.98]">
                    ตรวจสอบ Log ระบบ
                  </button>
                </div>
                {/* Abstract background shape */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-orange-600 opacity-20 blur-[80px] -mr-20 -mt-20 rounded-full group-hover:scale-150 transition-transform duration-1000" />
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg">💡</div>
                  <h4 className="text-slate-900 font-bold">แจ้งเตือน / แนะนำ</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group cursor-default">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 shrink-0" />
                    <p className="text-sm text-slate-600 leading-relaxed">
                      อย่าลืมตรวจสอบ <span className="font-bold text-slate-900">แบนเนอร์กิจกรรม</span> ใหม่เพื่อให้หน้าเว็บดูทันสมัยอยู่เสมอ
                    </p>
                  </div>
                  <div className="flex gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group cursor-default">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                    <p className="text-sm text-slate-600 leading-relaxed">
                      มี <span className="font-bold text-slate-900">แบรนด์ใหม่</span> เพิ่มเข้ามา (SCG, TOA) พร้อมจัดหมวดหมู่แล้ว
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
