import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine initial text color based on path and scroll
    // On Home (at top): White text (for dark hero)
    // On Home (scrolled) or other pages: Dark/Gray text (for white bg)
    const getTextColor = () => {
        if (isHome && !scrolled) return 'text-white hover:text-brand-orange-light';
        return 'text-gray-600 hover:text-brand-orange';
    };

    return (
        <header
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
                : isHome ? 'bg-transparent py-6' : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <img src="/logo.png" alt="NicoFlip" className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/" className={`text-sm font-medium tracking-wide transition-colors ${isActive('/') ? 'font-bold' : ''} ${getTextColor()}`}>
                        Accueil
                    </Link>
                    <Link to="/catalogue" className={`text-sm font-medium tracking-wide transition-colors ${isActive('/catalogue') ? 'font-bold text-brand-orange' : getTextColor()}`}>
                        Catalogue
                    </Link>
                    <Link to="/services" className={`text-sm font-medium tracking-wide transition-colors ${isActive('/services') ? 'font-bold text-brand-orange' : getTextColor()}`}>
                        Services
                    </Link>

                    <Link to="/contact" className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${isHome && !scrolled
                        ? 'bg-white text-brand-orange hover:bg-brand-orange hover:text-white'
                        : 'bg-brand-orange text-white hover:bg-black'
                        }`}>
                        Demander un devis
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className={`md:hidden p-2 ${isHome && !scrolled ? 'text-white' : 'text-brand-dark'}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden shadow-lg"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            <Link to="/" className="text-brand-dark hover:text-brand-orange transition-colors font-medium p-2" onClick={() => setIsOpen(false)}>Accueil</Link>
                            <Link to="/catalogue" className="text-brand-dark hover:text-brand-orange transition-colors font-medium p-2" onClick={() => setIsOpen(false)}>Catalogue</Link>
                            <Link to="/services" className="text-brand-dark hover:text-brand-orange transition-colors font-medium p-2" onClick={() => setIsOpen(false)}>Services</Link>

                            <Link
                                to="/contact"
                                className="btn-primary w-full mt-2 text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                Demander un devis
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
export default Header;
