import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Gamepad2 } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-dark text-white py-16 border-t border-gray-800 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <Link to="/" className="bg-brand-orange p-1 rounded-md">
                                <Gamepad2 className="w-6 h-6 text-white" />
                            </Link>
                            <Link to="/" className="text-2xl font-display font-bold text-white tracking-wide">
                                Nico<span className="text-brand-orange">Flip</span>
                            </Link>
                        </div>
                        <p className="text-gray-400 max-w-sm leading-relaxed">
                            Le spécialiste de la location de jeux d'arcade vintage pour événements d'entreprise et privés.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Navigation</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/" className="hover:text-brand-orange transition-colors">Accueil</Link></li>
                            <li><Link to="/catalogue" className="hover:text-brand-orange transition-colors">Catalogue</Link></li>
                            <li><Link to="/services" className="hover:text-brand-orange transition-colors">Services</Link></li>
                            <li><Link to="/contact" className="hover:text-brand-orange transition-colors">Devis</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Légal</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Mentions Légales</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">CGV</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; 2024 NicoFlip. Tous droits réservés.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
