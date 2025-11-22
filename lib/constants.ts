import { Photo } from './types';

export const CATEGORIES: { id: string; label: string; value: string }[] = [
  { id: 'all', label: 'All', value: 'ALL' },
  { id: 'ekiden', label: '駅伝・陸上競技', value: 'EKIDEN_TRACK' },
  { id: 'daily', label: '日常・カフェ', value: 'DAILY_CAFE' },
];

export const PHOTOS: Photo[] = [
  { id: 1, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya1.jpg', title: 'Portrait', category: 'DAILY_CAFE' },
  { id: 2, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya2.jpg', title: 'Scenery', category: 'DAILY_CAFE' },
  { id: 3, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya3.jpg', title: 'Scenery', category: 'DAILY_CAFE' },
  { id: 4, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya4.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 5, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya5.jpg', title: 'Cafe', category: 'DAILY_CAFE' },
  { id: 6, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya6.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 7, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya7.jpg', title: 'Portrait', category: 'DAILY_CAFE' },
  { id: 8, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya8.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 9, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya9.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 10, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya10.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 11, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya11.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 12, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya12.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 13, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya13.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 14, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya14.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 15, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya15.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 16, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya16.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 17, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya17.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 18, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya18.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 19, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya19.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 20, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya20.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 21, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya21.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 23, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya22.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 24, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya23.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 25, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya24.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 26, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya25.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 27, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya26.jpg', title: 'Ekiden', category: 'EKIDEN_TRACK' },
  { id: 28, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya27.jpg', title: 'Portrait', category: 'DAILY_CAFE' },
  { id: 29, src: 'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya28.jpg', title: 'Scenery', category: 'DAILY_CAFE' },
];

export const INQUIRY_TYPES = [
  "陸上競技撮影のご依頼(大会、記録会、練習会等)",
  "個人撮影のご依頼(ポートレート、ペット等)",
  "その他撮影のご依頼",
  "撮影可能日についてのお問合せ",
  "その他お問い合わせ"
];
