---
trigger: always_on
---

# rules.md — demo_construction

## 0) ภาษาและสไตล์การทำงาน
- สื่อสารเป็นภาษาไทย
- ตอบสั้น กระชับ เน้นทำงานได้จริง
- หากข้อมูลไม่พอให้ “เดาแบบมีเหตุผล” แล้วบอกสมมติฐาน ไม่ถามวน

## 1) เป้าหมายโปรเจกต์ (MVP)
เว็บเดโมธุรกิจวัสดุก่อสร้าง รองรับ 1 ภาษา (ไทย) มี 2 ส่วน:
- Public: หน้าแรก / เกี่ยวกับเรา / สินค้า / แบรนด์สินค้า / ติดต่อเรา
- Admin: login + dashboard + จัดการ แบนเนอร์/หมวดหมู่/สินค้า/แบรนด์
MVP ใช้ **mock data (JSON/TS)** และ/หรือ **localStorage** ได้ (ไม่ต้องต่อ DB)

## 2) Tech Stack ที่ต้องยึด
- Next.js (App Router) + TypeScript
- React 19
- ห้ามเพิ่มไลบรารีใหม่โดยไม่จำเป็น
  - ถ้าจำเป็นจริง ๆ ต้องระบุเหตุผล + รายการแพ็กเกจที่ต้องติดตั้งก่อนเสมอ

## 3) โครงสร้างโฟลเดอร์ที่แนะนำ
ใช้ App Router + route groups แยก public/admin ให้ชัด:
- `app/(site)/...` สำหรับหน้าเว็บ
- `app/(admin)/admin/...` สำหรับหลังบ้าน
- `components/` สำหรับ UI components
- `lib/` สำหรับ mock data, utils, storage, types

ตัวอย่าง:
app/
(site)/
page.tsx
about/page.tsx
products/page.tsx
products/[id]/page.tsx
brands/page.tsx
contact/page.tsx
(admin)/
admin/login/page.tsx
admin/page.tsx
admin/banners/page.tsx
admin/categories/page.tsx
admin/brands/page.tsx
admin/products/page.tsx

components/
layout/
banners/
products/
brands/

lib/
mock-data.ts
types.ts
storage.ts


## 4) กติกาการเขียนโค้ด
- ใช้ TypeScript ทุกไฟล์ (`.ts`/`.tsx`)
- ตั้งชื่อคอมโพเนนต์/ไฟล์ตามหน้าที่ อ่านง่าย
- หลีกเลี่ยง logic หนักใน page.tsx
  - page: ทำหน้าที่ “ประกอบ UI” + เรียก hook/utility
  - logic: ย้ายไป `lib/` หรือ `components/` หรือ `hooks/`
- ห้ามใช้ `any` ถ้าเลี่ยงได้
- ต้องมี `type`/`interface` สำหรับข้อมูลหลัก: Banner, Category, Brand, Product

## 5) Data Source Strategy (MVP → ต่อจริง)
ลำดับการเก็บข้อมูล:
1) `lib/mock-data.ts` เป็น seed/ตัวอย่าง
2) `lib/storage.ts` เป็นชั้น adapter:
   - `load(key)` / `save(key, data)`
   - ถ้าไม่มีข้อมูลใน storage ให้ fallback ไป mock data
3) UI เรียกผ่านฟังก์ชันเดียวกันเสมอ เพื่อเปลี่ยนไปใช้ API ทีหลังได้ง่าย

ข้อกำหนด:
- ห้ามให้ UI ไปแตะ `localStorage` ตรง ๆ ในหลายจุด
- ให้รวมไว้ที่ `lib/storage.ts` เท่านั้น

## 6) Routing & Navigation
- Public menu: หน้าแรก, เกี่ยวกับเรา, สินค้า, แบรนด์สินค้า, ติดต่อเรา
- Product detail route: `/products/[id]`
- Admin routes อยู่ใต้ `/admin/*`
- ห้ามทำ SPA router เอง ใช้ Next routing เท่านั้น

## 7) Admin (MVP Auth)
- MVP อนุญาตใช้ “mock login”:
  - เก็บสถานะใน `sessionStorage` เช่น `admin_authed=true`
- ถ้าต้องกันเส้นทาง: ทำ guard ฝั่ง client (MVP)
- ห้ามอ้างว่าปลอดภัยระดับ production (เพราะไม่มี backend)

## 8) UI/UX มาตรฐาน MVP
- Responsive: mobile ต้องใช้งานได้
- ตารางใน admin ต้องมี:
  - ปุ่ม เพิ่ม / แก้ไข / ลบ (ลบต้องมี confirm)
  - ฟอร์มใช้ dialog/sheet ได้
- หลีกเลี่ยงอนิเมชันหนัก ๆ
- โหลดเร็ว สำคัญกว่าเอฟเฟกต์

## 9) ขอบเขตที่ “ยังไม่ทำ” ใน MVP
- Payment / Checkout
- ระบบสมาชิกจริง
- จัดการสิทธิ์หลายระดับ
- DB / API จริง (ยกเว้นต้องเดโมเฉพาะทาง)

## 10) การเปลี่ยนแปลง/แก้ไฟล์
- แก้แบบน้อยที่สุดที่ทำให้ผ่าน requirement
- เคารพโครงสร้างเดิมของโปรเจกต์
- ทุกครั้งที่เสนอให้เพิ่มแพ็กเกจใหม่ ต้องให้:
  - เหตุผล
  - คำสั่งติดตั้ง
  - ผลกระทบกับโปรเจกต์

## 11) ข้อความ/คอนเทนต์ตามบรีฟ (ต้องมีในเว็บ)
- รองรับ 1 ภาษา
- มีประสบการณ์เกี่ยวกับวัสดุก่อสร้าง
- สามารถออกใบกำกับภาษีได้
- สามารถต่อรองราคาได้ตามขอบเขตงาน