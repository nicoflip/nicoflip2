import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Loader } from 'lucide-react';

const Catalog = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('Tous');
    const categories = ['Tous', 'Flippers', 'Arcade', 'Baby-foot', 'Divers'];

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            setLoading(true);
            // Check if supabase is configured
            if (!import.meta.env.VITE_SUPABASE_URL) {
                throw new Error("Supabase URL missing");
            }

            const { data, error } = await supabase
                .from('games')
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;
            setGames(data);
        } catch (err) {
            console.error('Error fetching games:', err);
            // Fallback data if Supabase isn't connected yet (for demo purposes)
            setError('Mode démo (base de données non connectée)');
            // Keep existing data as fallback or just empty
            setGames(fallbackGames);
        } finally {
            setLoading(false);
        }
    };

    const filteredGames = filter === 'Tous'
        ? games
        : games.filter(game => game.category === filter);

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-100 pb-8">
                    <div>
                        <span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-2 block">
                            Jeux Disponibles
                        </span>
                        <h2 className="text-4xl font-display font-bold text-brand-dark">
                            Catalogue NicoFlip
                        </h2>
                        <p className="text-gray-500 mt-2">
                            {error ? <span className="text-amber-600 flex items-center gap-2">⚠️ {error}</span> : "Retrouvez les jeux vidéo qui ont bercé votre jeunesse."}
                        </p>
                    </div>

                    <div className="flex gap-2 mt-6 md:mt-0 flex-wrap">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${filter === cat
                                    ? 'bg-brand-orange text-white shadow-md'
                                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-brand-dark'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center py-20">
                        <Loader className="w-10 h-10 text-brand-orange animate-spin" />
                    </div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {!loading && filteredGames.map((game) => (
                        <motion.div
                            key={game.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-soft transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="relative h-64 overflow-hidden bg-gray-100 shrink-0">
                                <img
                                    src={game.image_url}
                                    alt={game.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-50 group-hover:saturate-100 "
                                />
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-white/90 backdrop-blur-sm shadow-sm text-brand-orange`}>
                                        {game.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-orange transition-colors">
                                        {game.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 font-medium mb-2">{game.category} • {game.year}</p>
                                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                                        {game.description}
                                    </p>
                                </div>

                                <div className="mt-auto">
                                    <Link to="/contact" className="block w-full text-center btn-secondary text-sm py-2 group-hover:bg-brand-dark group-hover:text-white group-hover:border-transparent transition-all">
                                        Réserver ce jeu
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    {/* Potentially add pagination or 'Load More' here later */}
                </div>
            </div>
        </section>
    );
};

// Fallback data for demo (keeping user experience smooth while they set up DB)
const fallbackGames = [
    {
        id: 1,
        title: 'Jaws (2024)',
        category: 'Flippers',
        image_url: 'https://cdn.pinside.com/img/game/5888/photo/832367/medium/jaws-le-stern-pinball-2024.jpg',
        status: 'Nouveauté',
        year: '2024',
        description: "Qui n'a pas tremblé devant les Dents de la mer ? Ce flipper reprend beaucoup d'extraits du film culte."
    },
    {
        id: 2,
        title: 'Borne Pac-Man 4 Joueurs',
        category: 'Arcade',
        image_url: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80',
        status: 'Disponible',
        year: '2025',
        description: "Parties endiablées assurées avec cette borne 4 joueurs ! Jouez à Pac Man à 4 simultanément !"
    },
    {
        id: 3,
        title: 'Baby Foot Bonzini',
        category: 'Baby-foot',
        image_url: 'https://images.unsplash.com/photo-1628723652899-78c6600c0274?auto=format&fit=crop&q=80',
        status: 'Incontournable',
        year: '2016',
        description: "Retrouvez le plaisir de faire des 'gamelles', 'roulettes' et 'râteaux' en famille ou entre amis !"
    }
];

export default Catalog;
