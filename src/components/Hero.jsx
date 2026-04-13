import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            {/* Background Image with Parallax-like effect */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop"
                    alt="Arcade Background"
                    fetchPriority="high"
                    className="w-full h-full object-cover opacity-60"
                />
                {/* Dark Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center pt-24 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-4xl mx-auto flex flex-col items-center"
                >
                    <span className="inline-block px-5 py-2 mb-8 border border-white/20 bg-white/10 backdrop-blur-md rounded-full text-brand-orange text-sm font-bold uppercase tracking-widest shadow-lg">
                        Nantes et alentours
                    </span>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-lg">
                        Louez l'Ambiance <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orange-light">
                            Arcade & Flipper
                        </span>
                    </h1>

                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md font-light">
                        Transformez vos événements avec nos bornes d'arcade, flippers et baby-foot authentiques.
                        Le plaisir du rétrogaming livré chez vous.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
                        <Link
                            to="/catalogue"
                            className="w-full sm:w-auto px-8 py-4 bg-brand-orange text-white rounded-full font-bold text-lg hover:bg-white hover:text-brand-orange transition-all duration-300 shadow-xl shadow-orange-900/40 flex items-center justify-center gap-2 group"
                        >
                            Voir le catalogue
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/contact"
                            className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white hover:text-brand-dark transition-all duration-300 flex items-center justify-center"
                        >
                            Devis gratuit
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator - Positioned absolutely at the bottom */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/50 animate-bounce cursor-pointer hover:text-white transition-colors"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs uppercase tracking-widest text-white/70">Découvrir</span>
                    <ChevronDown className="w-6 h-6" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
