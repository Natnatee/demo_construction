'use client';

import { mockBanners, mockCategories, mockBrands, mockProducts } from './mock-data';

const KEYS = {
    BANNERS: 'demo_banners',
    CATEGORIES: 'demo_categories',
    BRANDS: 'demo_brands',
    PRODUCTS: 'demo_products',
};

// Generic helper to load from storage or fallback to mock data
const load = <T>(key: string, fallback: T): T => {
    if (typeof window === 'undefined') return fallback;
    const stored = localStorage.getItem(key);
    if (!stored) {
        // Initializing storage with mock data if empty
        save(key, fallback);
        return fallback;
    }
    try {
        return JSON.parse(stored);
    } catch (e) {
        console.error(`Error parsing storage for key ${key}:`, e);
        return fallback;
    }
};

const save = <T>(key: string, data: T): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(data));
};

export const bannerStorage = {
    get: () => load(KEYS.BANNERS, mockBanners),
    save: (data: any[]) => save(KEYS.BANNERS, data),
};

export const categoryStorage = {
    get: () => load(KEYS.CATEGORIES, mockCategories),
    save: (data: any[]) => save(KEYS.CATEGORIES, data),
};

export const brandStorage = {
    get: () => load(KEYS.BRANDS, mockBrands),
    save: (data: any[]) => save(KEYS.BRANDS, data),
};

export const productStorage = {
    get: () => load(KEYS.PRODUCTS, mockProducts),
    save: (data: any[]) => save(KEYS.PRODUCTS, data),
};
