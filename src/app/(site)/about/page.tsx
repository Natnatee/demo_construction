export default function AboutPage() {
  return (
    <div>
      <section className="section bg-slate-100">
        <div className="container text-center max-w-3xl">
          <h1 className="text-4xl font-bold mb-6">เกี่ยวกับเรา</h1>
          <p className="text-muted-foreground text-lg">
            เราคือผู้นำเข้าและจัดจำหน่ายวัสดุก่อสร้างคุณภาพสูง ประสบการณ์กว่า 20 ปีในวงการ 
            เรามุ่งเน้นการให้บริการที่เป็นเลิศและสินค้าที่เป็นมาตรฐานสากล
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">ความเชื่อมั่นและคุณภาพ</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span> ประสบการณ์ที่ไว้วางใจได้
                  </h3>
                  <p className="text-muted-foreground">
                    เราผ่านงานจัดส่งวัสดุให้กับโครงการระดับประเทศมาแล้วมากมาย ไม่ว่าจะเป็นงานสร้างถนน สะพาน หรืออาคารสูง
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span> ออกใบกำกับภาษีได้ทุกรายการ
                  </h3>
                  <p className="text-muted-foreground">
                    รองรับลูกค้าองค์กรเต็มรูปแบบ มั่นใจได้ในระบบเอกสารและความถูกต้องตามกฎหมาย
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span> การเจรจาราคาที่เป็นธรรม
                  </h3>
                  <p className="text-muted-foreground">
                    เราเข้าใจดีว่าในงานก่อสร้าง ต้นทุนคือหัวใจสำคัญ เรายินดีพิจารณาราคาลดพิเศษตามปริมาณการสั่งซื้อ
                  </p>
                </div>
              </div>
            </div>
            <div className="card aspect-video relative overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=1000" 
                alt="Construction Workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-8">
              <div className="text-4xl font-black text-primary mb-2">20+</div>
              <div className="text-sm font-bold opacity-70">ปีของประสบการณ์</div>
            </div>
            <div className="p-8">
              <div className="text-4xl font-black text-primary mb-2">5,000+</div>
              <div className="text-sm font-bold opacity-70">ลูกค้าที่พึงพอใจ</div>
            </div>
            <div className="p-8">
              <div className="text-4xl font-black text-primary mb-2">10,000+</div>
              <div className="text-sm font-bold opacity-70">รายการสินค้าปลีก-ส่ง</div>
            </div>
            <div className="p-8">
              <div className="text-4xl font-black text-primary mb-2">77</div>
              <div className="text-sm font-bold opacity-70">จังหวัดที่จัดส่งถึง</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
