export type PhotoCategory = 'EKIDEN_TRACK' | 'DAILY_CAFE';

export interface Photo {
  id: number;
  src: string;
  title: string;
  category: PhotoCategory;
}

export interface ContactFormState {
  name: string;
  inquiryType: string;
  email: string;
  phone: string;
  message: string;
}
