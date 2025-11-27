import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data: any) => {
    console.log(data);
    alert("Thank you for reaching out to CoeurDesire. We will connect with you shortly.");
  };

  return (
    <div className="min-h-screen bg-stone-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Info Side */}
          <div className="bg-coeur-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <motion.div 
              animate={{ scale: [1, 1.5, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute -top-40 -right-40 w-96 h-96 bg-coeur-600 rounded-full opacity-30 blur-3xl"
            />
            
            <div className="relative z-10">
              <h2 className="text-4xl font-serif mb-6">Let's Connect</h2>
              <p className="text-coeur-200 mb-12">Whether you need a consultation or have a question about our oils, our heart is open to you.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-coeur-800 flex items-center justify-center">
                    <Phone size={20} className="text-coeur-300" />
                  </div>
                  <div>
                    <p className="text-xs text-coeur-400 uppercase tracking-widest">Phone</p>
                    <p className="font-serif text-lg">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-coeur-800 flex items-center justify-center">
                    <Mail size={20} className="text-coeur-300" />
                  </div>
                  <div>
                    <p className="text-xs text-coeur-400 uppercase tracking-widest">Email</p>
                    <p className="font-serif text-lg">hello@coeurdesire.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-coeur-800 flex items-center justify-center">
                    <MapPin size={20} className="text-coeur-300" />
                  </div>
                  <div>
                    <p className="text-xs text-coeur-400 uppercase tracking-widest">Studio</p>
                    <p className="font-serif text-lg">123 Serenity Blvd, Suite 400<br/>Los Angeles, CA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12">
              <p className="font-serif italic text-coeur-300">"The heart knows the way."</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-12">
            <h3 className="text-2xl font-serif text-coeur-900 mb-8">Send a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-500 mb-2 uppercase tracking-wide">Name</label>
                  <input 
                    {...register("name", { required: true })} 
                    className="w-full bg-stone-50 border-b-2 border-stone-200 p-3 focus:outline-none focus:border-coeur-500 transition-colors"
                    placeholder="Jane Doe" 
                  />
                  {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-500 mb-2 uppercase tracking-wide">Topic</label>
                  <select {...register("topic")} className="w-full bg-stone-50 border-b-2 border-stone-200 p-3 focus:outline-none focus:border-coeur-500 transition-colors">
                    <option>General Inquiry</option>
                    <option>Consultation Booking</option>
                    <option>Product Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-500 mb-2 uppercase tracking-wide">Email</label>
                <input 
                  type="email" 
                  {...register("email", { required: true })}
                  className="w-full bg-stone-50 border-b-2 border-stone-200 p-3 focus:outline-none focus:border-coeur-500 transition-colors"
                  placeholder="jane@example.com" 
                />
                {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-500 mb-2 uppercase tracking-wide">Message</label>
                <textarea 
                  {...register("message", { required: true })}
                  rows={4} 
                  className="w-full bg-stone-50 border-b-2 border-stone-200 p-3 focus:outline-none focus:border-coeur-500 transition-colors resize-none"
                  placeholder="How can we help you heal?" 
                />
                 {errors.message && <span className="text-red-500 text-xs">Message is required</span>}
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full bg-coeur-600 text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-coeur-700 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                Send Message <Send size={18} />
              </motion.button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;