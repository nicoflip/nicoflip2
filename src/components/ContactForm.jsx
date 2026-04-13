import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Calendar, Users, MessageSquare } from 'lucide-react';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { French } from "flatpickr/dist/l10n/fr.js";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        societe: '',
        typeDemande: 'location', // location, depannage, entretien
        dates: [],
        typeEvenement: 'Soirée Entreprise',
        autreTypeEvenement: '',
        machineType: 'Flipper',
        machineMarque: '',
        panneDescription: '',
        jeux: [],
        message: ''
    });

    const flatpickrOptions = React.useMemo(() => ({
        mode: "range",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "j F Y",
        locale: French,
        minDate: "today",
        showMonths: window.innerWidth > 768 ? 2 : 1,
        closeOnSelect: false,
        disableMobile: "true"
    }), []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTypeDemandeChange = (type) => {
        setFormData(prev => ({ ...prev, typeDemande: type }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted', formData);
        const action = formData.typeDemande === 'location' ? 'demande de devis' :
            formData.typeDemande === 'depannage' ? 'demande de dépannage' : 'demande d\'entretien';
        alert(`Merci ! Votre ${action} a bien été envoyée. Nous vous recontacterons sous 24h.`);
    };

    return (
        <section className="min-h-screen bg-gray-50 pt-32 pb-24">
            <div className="container mx-auto px-4">

                {/* Page Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-2 block animate-fade-in-up">
                        Parlons de votre projet
                    </span>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-6">
                        Contactez-nous
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Que ce soit pour une location événementielle, un dépannage ou l'entretien de votre matériel,
                        remplissez ce formulaire pour nous détailler votre besoin.
                    </p>
                </div>

                {/* Main Form - Centered */}
                <div className="max-w-4xl mx-auto mb-16">
                    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-2xl shadow-soft border border-gray-100">

                        {/* Section: Identité */}
                        <div className="mb-10">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-brand-dark mb-6 border-b border-gray-100 pb-2">
                                <Users className="w-5 h-5 text-brand-orange" />
                                Vos Coordonnées
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Nom *</label>
                                    <input
                                        type="text"
                                        name="nom"
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-400"
                                        placeholder="Votre nom"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Prénom *</label>
                                    <input
                                        type="text"
                                        name="prenom"
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-400"
                                        placeholder="Votre prénom"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-400"
                                        placeholder="votre@email.com"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Téléphone</label>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-400"
                                        placeholder="06 00 00 00 00"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Société / Organisation</label>
                                    <input
                                        type="text"
                                        name="societe"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-400"
                                        placeholder="Nom de votre entreprise (facultatif)"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Type de Demande */}
                        <div className="mb-10">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-brand-dark mb-6 border-b border-gray-100 pb-2">
                                <MessageSquare className="w-5 h-5 text-brand-orange" />
                                Nature de votre demande
                            </h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div
                                    onClick={() => handleTypeDemandeChange('location')}
                                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center gap-2 ${formData.typeDemande === 'location' ? 'border-brand-orange bg-orange-50' : 'border-gray-100 hover:border-orange-200'}`}
                                >
                                    <Calendar className={`w-8 h-8 ${formData.typeDemande === 'location' ? 'text-brand-orange' : 'text-gray-400'}`} />
                                    <span className={`font-bold ${formData.typeDemande === 'location' ? 'text-brand-dark' : 'text-gray-500'}`}>Location & Événement</span>
                                </div>
                                <div
                                    onClick={() => handleTypeDemandeChange('depannage')}
                                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center gap-2 ${formData.typeDemande === 'depannage' ? 'border-brand-orange bg-orange-50' : 'border-gray-100 hover:border-orange-200'}`}
                                >
                                    <div className="text-2xl">🔧</div>
                                    <span className={`font-bold ${formData.typeDemande === 'depannage' ? 'text-brand-dark' : 'text-gray-500'}`}>Dépannage</span>
                                </div>
                                <div
                                    onClick={() => handleTypeDemandeChange('entretien')}
                                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center gap-2 ${formData.typeDemande === 'entretien' ? 'border-brand-orange bg-orange-50' : 'border-gray-100 hover:border-orange-200'}`}
                                >
                                    <div className="text-2xl">✨</div>
                                    <span className={`font-bold ${formData.typeDemande === 'entretien' ? 'text-brand-dark' : 'text-gray-500'}`}>Entretien</span>
                                </div>
                            </div>
                        </div>

                        {/* Section: Événement (Conditionnel) */}
                        {formData.typeDemande === 'location' && (
                            <div className="mb-10 animate-fade-in">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-brand-dark mb-6 border-b border-gray-100 pb-2">
                                    <Calendar className="w-5 h-5 text-brand-orange" />
                                    Votre Événement
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Type d'événement</label>
                                        <select
                                            name="typeEvenement"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all cursor-pointer"
                                            onChange={handleChange}
                                            value={formData.typeEvenement}
                                        >
                                            <option>Soirée Entreprise / Séminaire</option>
                                            <option>Mariage</option>
                                            <option>Anniversaire</option>
                                            <option>Team Building</option>
                                            <option>Salon / Exposition</option>
                                            <option>Autre</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Période souhaitée</label>
                                        <div className="relative">
                                            <Flatpickr
                                                key="date-picker-v1"
                                                options={flatpickrOptions}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all cursor-pointer pl-10"
                                                placeholder="Sélectionnez vos dates..."
                                                value={formData.dates}
                                                onChange={(selectedDates, dateStr, instance) => {
                                                    setFormData(prev => ({ ...prev, dates: selectedDates }));
                                                    if (selectedDates.length === 2) {
                                                        setTimeout(() => {
                                                            instance.close();
                                                        }, 500);
                                                    }
                                                }}
                                            />
                                            <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">Sélectionnez la date de début et de fin.</p>
                                    </div>

                                    {/* Conditional Input for 'Autre' */}
                                    {formData.typeEvenement === 'Autre' && (
                                        <div className="md:col-span-2 animate-fade-in">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Précisez le type d'événement</label>
                                            <input
                                                type="text"
                                                name="autreTypeEvenement"
                                                className="w-full bg-orange-50/50 border border-orange-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-400"
                                                placeholder="Ex: Festival, Bar Mitzvah, Inauguration..."
                                                onChange={handleChange}
                                                autoFocus
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Section: Machine (Conditionnel - Dépannage/Entretien) */}
                        {(formData.typeDemande === 'depannage' || formData.typeDemande === 'entretien') && (
                            <div className="mb-10 animate-fade-in">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-brand-dark mb-6 border-b border-gray-100 pb-2">
                                    <div className="w-5 h-5 text-brand-orange">⚙️</div>
                                    Votre Machine
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Type de matériel</label>
                                        <select
                                            name="machineType"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all cursor-pointer"
                                            onChange={handleChange}
                                            value={formData.machineType}
                                        >
                                            <option>Flipper</option>
                                            <option>Borne d'Arcade</option>
                                            <option>Baby-foot</option>
                                            <option>Jukebox</option>
                                            <option>Autre</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Marque / Modèle</label>
                                        <input
                                            type="text"
                                            name="machineMarque"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-400"
                                            placeholder="Ex: Stern, Williams, Gottlieb..."
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Section: Message */}
                        <div className="mb-8">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-brand-dark mb-6 border-b border-gray-100 pb-2">
                                <MessageSquare className="w-5 h-5 text-brand-orange" />
                                {formData.typeDemande === 'location' ? 'Votre besoin' : 'Description du problème / demande'}
                            </h3>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                    {formData.typeDemande === 'location' ? 'Message & Jeux souhaités' : 'Détails supplémentaires'}
                                </label>
                                <p className="text-xs text-gray-400 mb-2">
                                    {formData.typeDemande === 'location'
                                        ? "N'hésitez pas à préciser les jeux qui vous intéressent (Flippers, Bornes, Baby-foot...) ou le budget approximatif."
                                        : "Décrivez le dysfonctionnement rencontré ou l'état général de la machine."}
                                </p>
                                <textarea
                                    name="message"
                                    rows="6"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-400"
                                    placeholder={formData.typeDemande === 'location' ? "Bonjour, je souhaite louer 2 flippers..." : "Mon flipper ne démarre plus, l'écran reste noir..."}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>

                        <button type="submit" className="w-full btn-primary py-4 text-base flex justify-center items-center gap-3 group shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-0.5 transition-all">
                            Envoyer ma demande de devis
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-4">
                            Vos données restent confidentielles. Réponse sous 24h ouvrées.
                        </p>
                    </form>
                </div>

                {/* Contact Info Footer - Now below form */}
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-center mb-8">
                            <h3 className="font-display font-bold text-2xl text-brand-dark">Nos Coordonnées</h3>
                            <p className="text-gray-500 mt-2">Une question avant de demander votre devis ?</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center p-4 hover:bg-orange-50/30 rounded-lg transition-colors">
                                <div className="bg-orange-50 p-4 rounded-full text-brand-orange mb-4">
                                    <MapPin className="w-8 h-8" />
                                </div>
                                <h4 className="font-bold text-brand-dark uppercase tracking-wide mb-2">Zone d'intervention</h4>
                                <p className="text-gray-600">Nantes Métropole</p>
                                <p className="text-gray-600">Loire Atlantique (44)</p>
                                <p className="text-gray-600">Pays de la Loire</p>
                            </div>

                            <div className="flex flex-col items-center text-center p-4 hover:bg-orange-50/30 rounded-lg transition-colors">
                                <div className="bg-orange-50 p-4 rounded-full text-brand-orange mb-4">
                                    <Mail className="w-8 h-8" />
                                </div>
                                <h4 className="font-bold text-brand-dark uppercase tracking-wide mb-2">Email</h4>
                                <a href="mailto:contact@nicoflip.fr" className="text-gray-600 hover:text-brand-orange transition-colors text-lg">contact@nicoflip.fr</a>
                                <p className="text-sm text-gray-400 mt-1">Réponse sous 24h</p>
                            </div>

                            <div className="flex flex-col items-center text-center p-4 hover:bg-orange-50/30 rounded-lg transition-colors">
                                <div className="bg-orange-50 p-4 rounded-full text-brand-orange mb-4">
                                    <Phone className="w-8 h-8" />
                                </div>
                                <h4 className="font-bold text-brand-dark uppercase tracking-wide mb-2">Téléphone</h4>
                                <p className="text-gray-600 text-lg">+33 6 00 00 00 00</p>
                                <span className="text-sm text-gray-400">Du Lundi au Samedi, 9h-19h</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ContactForm;
