import React from 'react';
import { Gamepad2, Trophy, Wrench, MapPin, Truck, CalendarCheck, Settings, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
    const services = [
        {
            id: 1,
            title: "Location Événementielle",
            subtitle: "Mariages, Séminaires, Anniversaires",
            description: "Apportez une touche ludique et rétro à vos événements ! Nous installons des flippers, bornes d'arcade, et baby-foots directement sur le lieu de votre réception.",
            points: ["Installation et reprise incluses", "Matériel entretenu et fiable", "Formules week-end ou soirée"],
            icon: <CalendarCheck className="w-6 h-6" />,
            image: "https://images.unsplash.com/photo-1574673647139-38b30f52dbb0?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Dépannage & Restauration",
            subtitle: "Redonnez vie à vos machines",
            description: "Votre flipper a besoin d'une révision ? Nous assurons le dépannage et l'entretien de vos jeux de café, quelle que soit leur génération.",
            points: ["Diagnostic précis", "Remplacement de pièces d'usure", "Nettoyage et réglages"],
            icon: <Wrench className="w-6 h-6" />,
            image: "https://images.unsplash.com/photo-1555617981-d419b7d8be0c?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Organisation de Tournois",
            subtitle: "Challengez vos équipes",
            description: "Créez de la cohésion avec un tournoi de baby-foot ou de flipper ! Nous gérons l'animation de A à Z pour une expérience clé en main.",
            points: ["Animation micro", "Tableaux de scores", "Remise de trophées"],
            icon: <Trophy className="w-6 h-6" />,
            image: "https://images.unsplash.com/photo-1518115598836-e8d1979b0241?q=80&w=1000&auto=format&fit=crop"
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">

                {/* Intro Header */}
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4 block">
                        L'expérience NicoFlip
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-6">
                        Bien plus que de la location
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        Passionnés de jeux de café depuis des années, nous mettons notre expertise au service de vos moments de convivialité.
                        Basés à Nantes, nous rayonnons sur toute la Loire-Atlantique.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-gray-500">
                        <span className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
                            <MapPin className="w-4 h-4 text-brand-orange" /> Nantes & Alentours
                        </span>
                        <span className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
                            <Heart className="w-4 h-4 text-brand-orange" /> Passionné
                        </span>
                        <span className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
                            <Truck className="w-4 h-4 text-brand-orange" /> Livraison Incluse
                        </span>
                    </div>
                </div>

                {/* Services Rows */}
                <div className="flex flex-col gap-24">
                    {services.map((service, index) => (
                        <div key={service.id} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Text Content */}
                            <div className="flex-1 space-y-6">
                                <div className="inline-block p-3 bg-orange-50 rounded-xl text-brand-orange">
                                    {service.icon}
                                </div>
                                <div>
                                    <h3 className="text-3xl font-display font-bold text-brand-dark mb-2">{service.title}</h3>
                                    <p className="text-brand-orange font-medium text-lg">{service.subtitle}</p>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {service.description}
                                </p>
                                <ul className="space-y-3">
                                    {service.points.map((point, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-gray-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-4">
                                    <Link to="/contact" className="text-brand-dark font-bold hover:text-brand-orange transition-colors inline-flex items-center gap-2 border-b-2 border-brand-orange/20 hover:border-brand-orange pb-0.5">
                                        En savoir plus <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="flex-1 w-full">
                                <div className="relative group rounded-2xl overflow-hidden shadow-2xl shadow-gray-200">
                                    <img
                                        src={service.image.replace('w=1000', 'w=600')}
                                        alt={service.title}
                                        loading="lazy"
                                        className="w-full h-80 md:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-brand-orange/10 mix-blend-multiply group-hover:opacity-0 transition-opacity"></div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Features;
