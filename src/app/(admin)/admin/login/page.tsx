'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified Mock Login
    if (username === 'admin' && password === 'admin123') {
      sessionStorage.setItem('admin_authed', 'true');
      router.push('/admin');
    } else {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="card w-full max-w-md p-8 bg-background">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
          <p className="text-muted-foreground mt-2">โปรดเข้าสู่ระบบเพื่อจัดการข้อมูล</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-6 text-sm border border-red-200 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary outline-none transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full py-3">
            เข้าสู่ระบบ
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t text-center">
          <button 
            onClick={() => router.push('/')}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            ← กลับหน้าหลัก
          </button>
        </div>
      </div>
    </div>
  );
}
