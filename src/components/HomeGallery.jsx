import React from 'react';
import { motion } from 'framer-motion';

const images = [
  {
    url: '/images/image1.jpg',
    alt: 'Arcade Rental 1',
    title: 'Immersion Totale'
  },
  {
    url: '/images/image2.jpg',
    alt: 'Arcade Rental 2',
    title: 'Flippers Authentiques'
  },
  {
    url: '/images/image3.jpg',
    alt: 'Arcade Rental 3',
    title: 'Fun Garanti'
  }
];

const HomeGallery = () => {
  return (
    <section className="py-20 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Galerie Photos
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Nos machines en action
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="relative group aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <h3 className="text-white text-2xl font-display font-bold">{image.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeGallery;
