import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { INQUIRY_TYPES } from '../lib/constants';
import { Instagram, Twitter, Loader2, Send, ArrowRight } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "名前は2文字以上で入力してください" }),
  inquiryType: z.string().min(1, { message: "お問い合わせ内容を選択してください" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "メッセージは10文字以上で入力してください" }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // メール本文を作成
    const subject = encodeURIComponent(`【お問い合わせ】${data.inquiryType}`);
    const body = encodeURIComponent(
      `お名前: ${data.name}\n` +
      `メールアドレス: ${data.email}\n` +
      `電話番号: ${data.phone || '未入力'}\n` +
      `お問い合わせ内容: ${data.inquiryType}\n\n` +
      `メッセージ:\n${data.message}`
    );
    
    // メーラーを開く
    window.location.href = `mailto:contact@photographer-saya.com?subject=${subject}&body=${body}`;
    
    toast.success('メールアプリが開きます。送信をお願いします。');
    setIsSubmitting(false);
  };

  // Minimalist border-bottom styles
  const inputClasses = "w-full bg-transparent border-b border-beige-950/20 py-3 text-sm text-beige-950 placeholder:text-beige-400 focus:outline-none focus:border-beige-950 transition-colors duration-300 rounded-none";
  const errorClasses = "text-red-500 text-xs mt-1";

  return (
    <section id="contact" className="pt-20 md:pt-32 bg-[#F5F1E8] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full border border-beige-200/30 hidden lg:block" />
        <div className="absolute bottom-40 right-20 w-24 h-24 border border-beige-200/30 rotate-45 hidden lg:block" />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-beige-300 rounded-full opacity-50 hidden lg:block"
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        
        {/* Header - Enhanced */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
            <motion.span 
              className="text-[10px] uppercase tracking-[0.3em] text-beige-500 mb-4 block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Get in Touch
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-beige-950 mb-6 relative inline-block">
              Contact
              <motion.div 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-beige-400 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: '80%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </h2>
            <p className="text-beige-900/60 text-xs md:text-sm tracking-wider font-light mt-6">
                撮影のご依頼、ご相談など、お気軽にお問い合わせください。
            </p>
        </motion.div>

        {/* Contact Form - Enhanced */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Name & Inquiry Type */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    <motion.div 
                      className="space-y-1 group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <input 
                            type="text" 
                            placeholder="Name *"
                            className={`${inputClasses} group-hover:border-beige-400`}
                            {...register("name")}
                        />
                        {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
                    </motion.div>
                    
                    <motion.div 
                      className="space-y-1 group"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                         <div className="relative">
                            <select 
                                className={`${inputClasses} appearance-none cursor-pointer group-hover:border-beige-400`}
                                {...register("inquiryType")}
                                defaultValue=""
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
                         {errors.inquiryType && <p className={errorClasses}>{errors.inquiryType.message}</p>}
                    </motion.div>
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    <motion.div 
                      className="space-y-1 group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <input 
                            type="email" 
                            placeholder="Email *"
                            className={`${inputClasses} group-hover:border-beige-400`}
                            {...register("email")}
                        />
                        {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
                    </motion.div>
                    <motion.div 
                      className="space-y-1 group"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                         <input 
                            type="tel" 
                            placeholder="Phone（任意）"
                            className={`${inputClasses} group-hover:border-beige-400`}
                            {...register("phone")}
                        />
                    </motion.div>
                </div>

                {/* Message */}
                <motion.div 
                  className="space-y-1 pt-4 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <textarea 
                        rows={3}
                        placeholder="Message *"
                        className={`${inputClasses} resize-none group-hover:border-beige-400`}
                        {...register("message")}
                    ></textarea>
                    {errors.message && <p className={errorClasses}>{errors.message.message}</p>}
                </motion.div>

                {/* Submit - Enhanced */}
                <motion.div 
                  className="pt-10 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                    <motion.button 
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative bg-beige-950 text-[#F5F1E8] px-12 py-4 text-xs uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto gap-3"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="animate-spin" size={16} />
                              送信中...
                            </>
                          ) : (
                            <>
                              メッセージを送信
                              <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </>
                          )}
                        </span>
                        <motion.div 
                          className="absolute inset-0 bg-beige-800"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.4 }}
                        />
                    </motion.button>
                </motion.div>
            </form>
        </motion.div>

        {/* SNS Links - Enhanced */}
        <motion.div 
          className="flex justify-center gap-8 mb-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1 }}
        >
             <motion.a 
               href="https://www.instagram.com/iam_saya_a/" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="flex items-center gap-2 text-beige-950/40 hover:text-beige-950 transition-all duration-300 group"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
                 <div className="relative">
                   <Instagram size={20} strokeWidth={1} />
                   <motion.div 
                     className="absolute inset-0 border border-beige-400 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-0"
                     transition={{ duration: 0.5 }}
                   />
                 </div>
                 <span className="text-xs tracking-wider hidden md:inline opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">@iam_saya_a</span>
             </motion.a>
             <motion.a 
               href="https://www.instagram.com/saya_sports_films/" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="flex items-center gap-2 text-beige-950/40 hover:text-beige-950 transition-all duration-300 group"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
                 <Instagram size={20} strokeWidth={1} />
                 <span className="text-xs tracking-wider hidden md:inline opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">@saya_sports_films</span>
             </motion.a>
             <motion.a 
               href="https://x.com/iam_saya_a" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="flex items-center gap-2 text-beige-950/40 hover:text-beige-950 transition-all duration-300 group"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
                 <Twitter size={20} strokeWidth={1} />
                 <span className="text-xs tracking-wider hidden md:inline opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">@iam_saya_a</span>
             </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
