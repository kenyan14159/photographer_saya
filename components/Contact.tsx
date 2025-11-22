import React, { useState } from 'react';
import { INQUIRY_TYPES } from '../lib/constants';
import { ContactFormState } from '../lib/types';
import { Instagram, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    inquiryType: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('お問い合わせありがとうございます。安全に送信されました。');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Minimalist border-bottom styles
  const inputClasses = "w-full bg-transparent border-b border-beige-950/20 py-3 text-sm text-beige-950 placeholder:text-beige-400 focus:outline-none focus:border-beige-950 transition-colors duration-300 rounded-none";

  return (
    <section id="contact" className="pt-20 md:pt-32 bg-[#F5F1E8]">
      <div className="max-w-2xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif italic text-beige-950 mb-6">Contact</h2>
            <p className="text-beige-900/60 text-xs md:text-sm tracking-wider font-light">
                撮影のご依頼、ご相談など、お気軽にお問い合わせください。
            </p>
        </div>

        {/* Contact Form - Minimalist Style */}
        <div className="mb-20">
            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Name & Inquiry Type */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-1">
                        <input 
                            type="text" 
                            name="name"
                            required
                            placeholder="Name *"
                            className={inputClasses}
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="space-y-1">
                         <div className="relative">
                            <select 
                                name="inquiryType"
                                required
                                className={`${inputClasses} appearance-none cursor-pointer`}
                                value={formData.inquiryType}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Subject *</option>
                                {INQUIRY_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-beige-400">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-1">
                        <input 
                            type="email" 
                            name="email"
                            required
                            placeholder="Email *"
                            className={inputClasses}
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-1">
                         <input 
                            type="tel" 
                            name="phone"
                            required
                            placeholder="Phone *"
                            className={inputClasses}
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-1 pt-4">
                    <textarea 
                        name="message"
                        required
                        rows={3}
                        placeholder="Message *"
                        className={`${inputClasses} resize-none`}
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                </div>

                {/* Submit */}
                <div className="pt-10 text-center">
                    <button 
                        type="submit"
                        className="bg-beige-950 text-[#F5F1E8] px-12 py-4 text-xs uppercase tracking-[0.2em] hover:bg-beige-800 transition-colors duration-300"
                    >
                        メッセージを送信
                    </button>
                </div>
            </form>
        </div>

        {/* SNS Links */}
        <div className="flex justify-center gap-8 mb-0">
             <a href="https://www.instagram.com/iam_saya_a/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-beige-950/40 hover:text-beige-950 transition-colors group">
                 <Instagram size={20} strokeWidth={1} />
                 <span className="text-xs tracking-wider hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300">@iam_saya_a</span>
             </a>
             <a href="https://www.instagram.com/saya_sports_films/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-beige-950/40 hover:text-beige-950 transition-colors group">
                 <Instagram size={20} strokeWidth={1} />
                 <span className="text-xs tracking-wider hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300">@saya_sports_films</span>
             </a>
             <a href="https://x.com/iam_saya_a" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-beige-950/40 hover:text-beige-950 transition-colors group">
                 <Twitter size={20} strokeWidth={1} />
                 <span className="text-xs tracking-wider hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300">@iam_saya_a</span>
             </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
