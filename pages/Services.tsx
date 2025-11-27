import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_VARIANTS, SERVICES } from '../constants';
import { Check } from 'lucide-react';

const Services = () => {
  return (
    <div className="min-h-screen bg-coeur-50 pb-24">
      <div className="bg-coeur-900 text-white pt-32 pb-20 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.1 }}
           className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"
         />
         <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif mb-6"
            >
              Our Offerings
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl text-coeur-200 max-w-2xl mx-auto"
            >
              Curated experiences for the hair, skin, and spirit.
            </motion.p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <motion.div 
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-8"
        >
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id}
              variants={ANIMATION_VARIANTS.item}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="grid md:grid-cols-2 h-full">
                <div className="h-64 md:h-auto overflow-hidden">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center relative">
                  <div className="absolute top-4 right-4 text-coeur-200 group-hover:text-coeur-300 transition-colors">
                    <service.icon size={48} strokeWidth={1} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-coeur-900 mb-2">{service.title}</h3>
                  <p className="text-coeur-600 font-bold mb-4 font-sans text-sm tracking-wider">{service.price}</p>
                  <p className="text-stone-600 mb-6 leading-relaxed text-sm">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm text-stone-500">
                      <Check size={14} className="text-green-500" /> 100% Organic Products
                    </li>
                    <li className="flex items-center gap-2 text-sm text-stone-500">
                      <Check size={14} className="text-green-500" /> Personalized Attention
                    </li>
                  </ul>

                  <button className="mt-auto self-start border-b-2 border-coeur-500 text-coeur-800 font-bold pb-1 hover:text-coeur-600 transition-colors">
                    Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Services;