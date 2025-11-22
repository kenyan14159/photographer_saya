export interface Photo {
  id: number;
  src: string;
  title: string;
  category: string;
}

export interface ContactFormState {
  name: string;
  inquiryType: string;
  email: string;
  phone: string;
  message: string;
}
