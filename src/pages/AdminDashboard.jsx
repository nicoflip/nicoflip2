import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Edit, Trash2, X, Save, Search, Image as ImageIcon, Lock, LogOut } from 'lucide-react';

const AdminDashboard = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    // Auth State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);

    // Dashboard Data
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGame, setEditingGame] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: 'Flippers',
        year: '',
        description: '',
        image_url: '',
        status: 'Disponible',
        price: 'Sur devis'
    });

    useEffect(() => {
        // Check for active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) fetchGames();
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchGames();
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        setLoginError(null); // Reset error on new attempt

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            // Check for specific error messages or return a generic friendly one
            if (error.message.includes("Invalid login credentials")) {
                setLoginError("Identifiants incorrects. Veuillez vérifier votre email et mot de passe.");
            } else {
                setLoginError("Une erreur est survenue lors de la connexion. Veuillez réessayer.");
            }
        }
        setAuthLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setGames([]);
    };

    const fetchGames = async () => {
        const { data, error } = await supabase
            .from('games')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error feching games:', error);
        } else {
            setGames(data || []);
        }
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;

        if (name === 'image_url') {
            // Normalize slashes
            let cleanedValue = value.replace(/\\/g, '/');

            // Detect if path contains 'public/' and extract relative path
            if (cleanedValue.includes('/public/')) {
                cleanedValue = cleanedValue.substring(cleanedValue.indexOf('/public/') + 7);
                if (!cleanedValue.startsWith('/')) cleanedValue = '/' + cleanedValue;
            } else if (cleanedValue.includes('public/')) {
                // Case where user pastes relative path starting with 'public/'
                cleanedValue = cleanedValue.substring(cleanedValue.indexOf('public/') + 6);
                if (!cleanedValue.startsWith('/')) cleanedValue = '/' + cleanedValue;
            }

            value = cleanedValue;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const openModal = (game = null) => {
        if (game) {
            setEditingGame(game);
            setFormData({
                title: game.title,
                category: game.category,
                year: game.year || '',
                description: game.description || '',
                image_url: game.image_url || '',
                status: game.status || 'Disponible',
                price: game.price || 'Sur devis'
            });
        } else {
            setEditingGame(null);
            setFormData({
                title: '',
                category: 'Flippers',
                year: '',
                description: '',
                image_url: '',
                status: 'Disponible',
                price: 'Sur devis'
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingGame(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingGame) {
            // Update
            const { error } = await supabase
                .from('games')
                .update(formData)
                .eq('id', editingGame.id);

            if (error) {
                alert('Erreur lors de la modification : ' + error.message);
            } else {
                fetchGames();
                closeModal();
            }
        } else {
            // Create
            const { error } = await supabase
                .from('games')
                .insert([formData]);

            if (error) {
                alert('Erreur lors de la création : ' + error.message);
            } else {
                fetchGames();
                closeModal();
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce jeu ?')) {
            const { error } = await supabase
                .from('games')
                .delete()
                .eq('id', id);

            if (error) {
                alert('Erreur lors de la suppression : ' + error.message);
            } else {
                fetchGames();
            }
        }
    };

    const filteredGames = games.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Chargement...</div>;
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 text-brand-orange" />
                        </div>
                        <h1 className="text-2xl font-display font-bold text-brand-dark">Accès Administrateur</h1>
                        <p className="text-gray-500 mt-2">Veuillez vous identifier pour accéder au tableau de bord.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {loginError && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-fade-in">
                                <X className="w-4 h-4 shrink-0" />
                                {loginError}
                            </div>
                        )}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                                placeholder="admin@nicoflip.fr"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Mot de passe</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={authLoading}
                            className="w-full btn-primary py-3 flex justify-center items-center gap-2"
                        >
                            {authLoading ? 'Connexion...' : 'Se connecter'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-12">
            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-brand-dark">Administration Catalogue</h1>
                        <p className="text-gray-600">Gérez vos jeux, modifier les descriptions et les images.</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleLogout}
                            className="btn-secondary flex items-center gap-2 hover:bg-gray-200/50 hover:text-red-500 hover:border-red-200"
                        >
                            <LogOut className="w-5 h-5" />
                            Déconnexion
                        </button>
                        <button
                            onClick={() => openModal()}
                            className="btn-primary flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Ajouter un jeu
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center gap-2">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher un jeu..."
                        className="flex-1 outline-none text-brand-dark"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Games Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-bold text-gray-600 text-sm uppercase">Image</th>
                                    <th className="p-4 font-bold text-gray-600 text-sm uppercase">Titre</th>
                                    <th className="p-4 font-bold text-gray-600 text-sm uppercase">Catégorie</th>
                                    <th className="p-4 font-bold text-gray-600 text-sm uppercase">Année</th>
                                    <th className="p-4 font-bold text-gray-600 text-sm uppercase">Statut</th>
                                    <th className="p-4 font-bold text-gray-600 text-sm uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-gray-500">Chargement...</td>
                                    </tr>
                                ) : filteredGames.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-gray-500">Aucun jeu trouvé.</td>
                                    </tr>
                                ) : (
                                    filteredGames.map(game => (
                                        <tr key={game.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                                    <img
                                                        src={game.image_url || 'https://via.placeholder.com/150'}
                                                        alt={game.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-4 font-bold text-brand-dark">{game.title}</td>
                                            <td className="p-4 text-gray-600">
                                                <span className="px-2 py-1 bg-gray-100 rounded text-xs uppercase tracking-wide">
                                                    {game.category}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-600">{game.year}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${game.status === 'Disponible' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {game.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => openModal(game)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(game.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Supprimer"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-brand-dark">
                                    {editingGame ? 'Modifier le jeu' : 'Ajouter un nouveau jeu'}
                                </h2>
                                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form key={editingGame ? editingGame.id : 'new'} onSubmit={handleSubmit} className="p-6 space-y-6" autoComplete="off">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Titre du jeu</label>
                                        <input
                                            type="text"
                                            name="title"
                                            required
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                                            placeholder="Ex: Addams Family"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Catégorie</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                                        >
                                            <option value="Flippers">Flippers</option>
                                            <option value="Arcade">Arcade</option>
                                            <option value="Baby-foot">Baby-foot</option>
                                            <option value="Divers">Divers</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Année</label>
                                        <input
                                            type="text"
                                            name="year"
                                            value={formData.year}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                                            placeholder="Ex: 1992"
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Image URL / Chemin</label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <ImageIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="image_url"
                                                    value={formData.image_url}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 pl-10 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                                                    placeholder="/images/mon-jeu.jpg ou https://..."
                                                />
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Conseil : Placez vos images dans le dossier <code>public/images</code> et tapez <code>/images/nom.jpg</code>
                                        </p>
                                    </div>

                                    {/* Image Preview */}
                                    {formData.image_url && (
                                        <div className="col-span-2">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Aperçu</label>
                                            <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                                <img
                                                    src={formData.image_url}
                                                    alt="Aperçu"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Erreur+Image'}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            rows="4"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                                            placeholder="Description du jeu..."
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Statut</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                                        >
                                            <option value="Disponible">Disponible</option>
                                            <option value="Loué">Loué</option>
                                            <option value="Maintenance">Maintenance</option>
                                            <option value="Nouveauté">Nouveauté</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Prix affiché</label>
                                        <input
                                            type="text"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                                            placeholder="Ex: Sur devis"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 py-3 px-6 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 px-6 rounded-lg bg-brand-orange text-white font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 flex justify-center items-center gap-2"
                                    >
                                        <Save className="w-5 h-5" />
                                        Enregistrer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminDashboard;
