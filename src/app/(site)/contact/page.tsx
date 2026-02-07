'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In MVP, we just show a success message
  };

  return (
    <div className="section">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4">ติดต่อเรา</h1>
          <p className="text-muted-foreground">
            สนใจสินค้า หรือต้องการขอใบเสนอราคา สามารถติดต่อเราผ่านช่องทางต่าง ๆ ด้านล่างนี้ หรือกรอกฟอร์มเพื่อให้เราติดต่อกลับ
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card p-8 bg-background">
            {submitted ? (
              <div className="py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="text-2xl font-bold mb-2">ขอบคุณที่สนใจ!</h2>
                <p className="text-muted-foreground">เจ้าหน้าที่ของเราได้รับข้อมูลแล้ว และจะติดต่อกลับหาท่านโดยเร็วที่สุด</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn btn-primary mt-8 px-6"
                >
                  ส่งข้อความอื่น
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">ชื่อ-นามสกุล *</label>
                    <input type="text" className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">เบอร์โทรศัพท์ *</label>
                    <input type="tel" className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">อีเมล</label>
                  <input type="email" className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">หัวข้อที่ต้องการติดต่อ *</label>
                  <select className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary" required>
                    <option value="">เลือกหัวข้อ</option>
                    <option value="quote">ขอใบเสนอราคา</option>
                    <option value="product">สอบถามสเปกสินค้า</option>
                    <option value="partnership">ติดต่อเป็นพันธมิตร</option>
                    <option value="other">อื่น ๆ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ข้อความรายละเอียด *</label>
                  <textarea className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary h-32 resize-none" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full py-3 font-bold text-lg">
                  ส่งข้อความ
                </button>
              </form>
            )}
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl flex-shrink-0">📍</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">ที่ตั้งสำนักงาน</h3>
                  <p className="text-muted-foreground">123 ถนนสุขุมวิท เขตวัฒนา กรุงเทพมหานคร 10110</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl flex-shrink-0">📞</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">เบอร์โทรศัพท์</h3>
                  <p className="text-muted-foreground">สำนักงาน: 02-xxx-xxxx</p>
                  <p className="text-muted-foreground">ฝ่ายขาย: 08x-xxx-xxxx</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl flex-shrink-0">✉️</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">อีเมล</h3>
                  <p className="text-muted-foreground">sales@demo-con.com</p>
                  <p className="text-muted-foreground">info@demo-con.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl flex-shrink-0">⏰</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">เวลาทำการ</h3>
                  <p className="text-muted-foreground">จันทร์ - เสาร์: 08:30 น. - 17:30 น.</p>
                  <p className="text-muted-foreground">ปิดทำการวันอาทิตย์และวันหยุดนักขัตฤกษ์</p>
                </div>
              </div>
            </div>

            {/* Mock Map */}
            <div className="card h-64 bg-slate-200 flex items-center justify-center text-muted-foreground italic relative overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
                alt="Map Background"
               />
               <div className="relative z-10 font-bold text-slate-700 bg-white/80 px-4 py-2 rounded shadow">
                 แผนที่ตั้งร้าน (Mock Map)
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
