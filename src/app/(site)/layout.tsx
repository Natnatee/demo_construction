import Link from 'next/link';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-2xl text-primary">
            DEMO CONSTRUCTION
          </Link>
          <nav className="hidden md:flex gap-8 font-medium">
            <Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link>
            <Link href="/about" className="hover:text-primary transition-colors">เกี่ยวกับเรา</Link>
            <Link href="/products" className="hover:text-primary transition-colors">สินค้า</Link>
            <Link href="/brands" className="hover:text-primary transition-colors">แบรนด์สินค้า</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">ติดต่อเรา</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="btn btn-primary text-sm">ส่วนผู้ดูแล</Link>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="border-t py-12 bg-muted">
        <div className="container grid md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">DEMO CONSTRUCTION</h3>
            <p className="text-muted-foreground text-sm">
              วัสดุก่อสร้างครบวงจร ราคาต่อรองได้ตามขอบเขตงาน ออกใบกำกับภาษีได้
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">ลิงก์ด่วน</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/">หน้าแรก</Link></li>
              <li><Link href="/about">เกี่ยวกับเรา</Link></li>
              <li><Link href="/products">สินค้า</Link></li>
              <li><Link href="/contact">ติดต่อเรา</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">บริการของเรา</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>จำหน่ายวัสดุก่อสร้าง</li>
              <li>ปรึกษาประเมินหน้างาน</li>
              <li>จัดหาวัสดุตามสเปก</li>
              <li>จัดส่งทั่วประเทศ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">ติดต่อเรา</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>โทร: 02-xxx-xxxx</li>
              <li>อีเมล: info@demo-con.com</li>
              <li>ที่อยู่: กรุงเทพมหานคร</li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Demo Construction Project. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
