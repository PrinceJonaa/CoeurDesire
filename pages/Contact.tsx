import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../components/SEO';

type FormData = { name: string; email: string; subject: string; message: string };
type Status = 'idle' | 'loading' | 'success' | 'error';

const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>();
  const [status, setStatus] = useState<Status>('idle');

  // Pre-fill from product detail URL params
  useEffect(() => {
    const subject = searchParams.get('subject');
    const productSlug = searchParams.get('product');
    if (subject) setValue('subject', subject);
    if (productSlug) setValue('message', `Hi, I'd like to inquire about ordering this product. Please let me know how to proceed.`);
  }, [searchParams, setValue]);

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch('https://coeurdesire-api.jbonner.workers.dev/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <SEO title="Contact" description="Reach out to CoeurDesire for product inquiries, custom orders, or consultations. Email inquiry@coeurdesire.com" url="https://coeurdesire.com/contact" />

      <div className="min-h-screen bg-coeur-50 pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-0 bg-white rounded-3xl shadow-xl overflow-hidden">

            {/* Left panel */}
            <div className="bg-coeur-900 p-10 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
              <motion.div animate={{ scale: [1, 1.5, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity }}
                className="absolute -top-40 -right-40 w-96 h-96 bg-coeur-600 rounded-full opacity-30 blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-4xl font-serif mb-4">Let's Connect</h2>
                <p className="text-coeur-200 mb-10 leading-relaxed">
                  Whether you're inquiring about a product, requesting a custom blend, or just want to share your self-love journey, our heart is open to you.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: Mail, label: 'Email', value: 'inquiry@coeurdesire.com', href: 'mailto:inquiry@coeurdesire.com' },
                    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
                    { icon: MapPin, label: 'Location', value: 'Remote & Nationwide', href: undefined },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-coeur-800 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-coeur-300" />
                      </div>
                      <div>
                        <p className="text-xs text-coeur-400 uppercase tracking-widest">{label}</p>
                        {href
                          ? <a href={href} className="font-serif text-lg hover:text-coeur-300 transition-colors">{value}</a>
                          : <p className="font-serif text-lg">{value}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="relative z-10 text-coeur-400 text-xs mt-10">We respond within 24–48 hours.</p>
            </div>

            {/* Right form */}
            <div className="p-10 md:p-12">
              <h3 className="font-serif text-3xl text-coeur-900 mb-2">Send an Inquiry</h3>
              <p className="text-stone-400 text-sm mb-8">All fields marked * are required.</p>

              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center py-12">
                  <CheckCircle size={52} className="text-emerald-500 mb-4" />
                  <h4 className="font-serif text-2xl text-coeur-900 mb-2">Thank You!</h4>
                  <p className="text-stone-500 text-sm max-w-xs">Your message was received. We'll reply to you at <strong>inquiry@coeurdesire.com</strong> within 24–48 hours.</p>
                  <button onClick={() => setStatus('idle')} className="mt-6 text-sm text-coeur-600 hover:underline">Send another message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-stone-500 uppercase tracking-widest mb-1.5">Name *</label>
                      <input {...register('name', { required: 'Name is required' })}
                        className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-coeur-300 transition ${errors.name ? 'border-red-300' : 'border-stone-200'}`}
                        placeholder="Your name" />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs text-stone-500 uppercase tracking-widest mb-1.5">Email *</label>
                      <input {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
                        type="email" className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-coeur-300 transition ${errors.email ? 'border-red-300' : 'border-stone-200'}`}
                        placeholder="your@email.com" />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-stone-500 uppercase tracking-widest mb-1.5">Subject *</label>
                    <input {...register('subject', { required: 'Subject is required' })}
                      className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-coeur-300 transition ${errors.subject ? 'border-red-300' : 'border-stone-200'}`}
                      placeholder="Product inquiry, custom blend, consultation..." />
                    {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs text-stone-500 uppercase tracking-widest mb-1.5">Message *</label>
                    <textarea {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Please write at least 10 characters' } })}
                      rows={5} className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-coeur-300 transition resize-none ${errors.message ? 'border-red-300' : 'border-stone-200'}`}
                      placeholder="Tell us what you're looking for..." />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">
                      <AlertCircle size={16} /> Something went wrong. Please email us directly at inquiry@coeurdesire.com
                    </div>
                  )}

                  <motion.button type="submit" disabled={status === 'loading'} whileHover={{ scale: status === 'loading' ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full bg-coeur-800 text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-coeur-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                    {status === 'loading' ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
