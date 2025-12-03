import { Photo } from './types';

export const CATEGORIES: { id: string; label: string; value: string }[] = [
  { id: 'all', label: 'All', value: 'ALL' },
  { id: 'ekiden', label: '駅伝・陸上競技', value: 'EKIDEN_TRACK' },
  { id: 'daily', label: '日常・カフェ', value: 'DAILY_CAFE' },
];

export const PHOTOS: Photo[] = [
  { id: 1, src: '/saya_image/saya1.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 2, src: '/saya_image/saya2.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 3, src: '/saya_image/saya3.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 4, src: '/saya_image/saya4.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 5, src: '/saya_image/saya5.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 6, src: '/saya_image/saya6.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 7, src: '/saya_image/saya7.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 8, src: '/saya_image/saya8.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 9, src: '/saya_image/saya9.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 10, src: '/saya_image/saya10.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 11, src: '/saya_image/saya11.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 12, src: '/saya_image/saya12.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 13, src: '/saya_image/saya13.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 14, src: '/saya_image/saya14.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 15, src: '/saya_image/saya15.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 16, src: '/saya_image/saya16.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 17, src: '/saya_image/saya17.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 18, src: '/saya_image/saya18.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 19, src: '/saya_image/saya19.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 20, src: '/saya_image/saya20.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 21, src: '/saya_image/saya21.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 22, src: '/saya_image/saya22.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 23, src: '/saya_image/saya23.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 24, src: '/saya_image/saya24.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 25, src: '/saya_image/saya25.jpg', title: 'Cafe', category: 'DAILY_CAFE' },
  { id: 26, src: '/saya_image/saya26.jpg', title: 'Cafe', category: 'DAILY_CAFE' },
  { id: 27, src: '/saya_image/saya27.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 28, src: '/saya_image/saya28.jpg', title: 'Scenery', category: 'DAILY_CAFE' },
];

export const INQUIRY_TYPES = [
  "陸上競技撮影のご依頼(大会、記録会、練習会等)",
  "個人撮影のご依頼(ポートレート、ペット等)",
  "その他撮影のご依頼",
  "撮影可能日についてのお問合せ",
  "その他お問い合わせ"
];
