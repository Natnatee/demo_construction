import { Banner, Category, Brand, Product } from './types'

export const mockBanners: Banner[] = [
    {
        id: '1',
        imageUrl: '/วัสดุก่อสร้างครบวงจร.jpg',
        title: 'วัสดุก่อสร้างครบวงจร',
        description: 'ราคาต่อรองได้ตามขอบเขตงาน ออกใบกำกับภาษีได้',
        link: '/products',
    },
    {
        id: '2',
        imageUrl: '/construction_workplace.jpg',
        title: 'ทีมงานมืออาชีพ',
        description: 'มีประสบการณ์ยาวนานในธุรกิจวัสดุก่อสร้าง',
        link: '/about',
    },
]

export const mockCategories: Category[] = [
    { id: 'cat-1', name: 'ปูนและคอนกรีต', imageUrl: '/ปูน.jpg' },
    { id: 'cat-2', name: 'เหล็กและโลหะ', imageUrl: '/เหล็กและโลหะ.jpg' },
    { id: 'cat-3', name: 'ไม้และวัสดุทดแทน', imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400' },
    { id: 'cat-4', name: 'กระเบื้องและสุขภัณฑ์', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400' },
]

export const mockBrands: Brand[] = [
    { id: 'brand-1', name: 'SCG', imageUrl: '/scg.jpg' },
    { id: 'brand-2', name: 'TOA', imageUrl: '/toa.png' },
]

export const mockProducts: Product[] = [
    {
        id: 'p-1',
        name: 'ปูนซีเมนต์โครงสร้าง เอสซีจี',
        description: 'ปูนซีเมนต์ปอร์ตแลนด์ประเภท 1 สำหรับงานโครงสร้างที่ต้องการความแข็งแรงสูง',
        price: 150,
        imageUrl: '/ปูน.jpg',
        categoryId: 'cat-1',
        brandId: 'brand-1',
        isFeatured: true,
    },
    {
        id: 'p-2',
        name: 'เหล็กเส้น 2 หุน',
        description: 'เหล็กเส้นคุณภาพมาตรฐานอุตสาหกรรม',
        price: 85,
        imageUrl: '/เหล็กเส้น2หุน.jpg',
        categoryId: 'cat-2',
        brandId: 'brand-1',
        isFeatured: true,
    },
]
