import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import yachts from '../data/yachts.json';
import reviews from '../data/reviews.json';

const FleetListing = () => {
    const { hash } = useLocation();

    // Handle scroll to hash if present (e.g. #reviews)
    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        }
    }, [hash]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen bg-primary">
            {/* Hero Section */}
            <header className="relative h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-slow-zoom"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&q=80&w=1600')" }}
                />
                <div className="absolute inset-0 bg-black/30 z-10" />
                {/* Lighter overlay for Light Theme feel, or keep dark for contrast? User asked for "whole website theme light". 
            Usually Hero text needs dark overlay. Let's keep overlay but maybe lighter 30% */}

                <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="block text-accent font-sans font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base text-shadow"
                    >
                        Luxury Private Cruises
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 border-b-2 border-accent/60 pb-8 inline-block drop-shadow-md"
                    >
                        AUSTRALIAN <br /> YACHTS
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <p className="text-white text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                            Discover the pristine waters of Australia on our exclusive fleet.
                            Unmatched elegance, professional crew, and unforgettable memories.
                        </p>
                        <a
                            href="#fleet"
                            className="inline-block bg-accent text-white px-10 py-4 uppercase tracking-widest font-bold text-xs md:text-sm hover:bg-white hover:text-navy-rich transition-all duration-300 shadow-lg"
                        >
                            Explore Fleet
                        </a>
                    </motion.div>
                </div>
            </header>

            {/* Fleet Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24" id="fleet">
                <div className="text-center mb-16">
                    <span className="text-accent uppercase tracking-widest text-sm font-bold block mb-2">Our Collection</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-text-main">Choose Your Vessel</h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {yachts.map(yacht => (
                        <motion.div
                            key={yacht.id}
                            variants={cardVariants}
                            className="group bg-white rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                        >
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={yacht.image}
                                    alt={yacht.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-white text-navy-rich px-3 py-1 text-xs uppercase tracking-wider font-bold shadow-md">
                                    {yacht.length}
                                </div>
                            </div>

                            <div className="p-8 text-center bg-white">
                                <h3 className="text-2xl font-serif text-navy-rich mb-2 group-hover:text-accent transition-colors">{yacht.name}</h3>
                                <p className="text-text-light text-sm mb-6 flex items-center justify-center gap-2">
                                    <span>📍 {yacht.location}</span>
                                </p>

                                <div className="border-t border-gray-100 pt-6 mb-6">
                                    <p className="text-accent text-xl font-serif mb-1">${yacht.pricePerDay.toLocaleString()}</p>
                                    <p className="text-xs text-text-light uppercase tracking-wide">PD / AUD</p>
                                </div>

                                <Link
                                    to={`/yacht/${yacht.id}`}
                                    className="inline-block border border-gray-300 text-text-main px-8 py-3 text-xs uppercase tracking-widest hover:bg-navy-rich hover:border-navy-rich hover:text-white transition-all duration-300 w-full"
                                >
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </main>

            {/* Reviews Section */}
            <section className="bg-secondary py-24" id="reviews">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        <div className="lg:col-span-1">
                            <span className="text-accent uppercase tracking-widest text-sm font-bold block mb-2">Testimonials</span>
                            <h2 className="text-4xl font-serif text-text-main mb-6">Client Stories</h2>
                            <p className="text-text-light leading-relaxed mb-8">
                                We pride ourselves on delivering exceptional experiences. Hear what our distinguished guests have to say about their journey with us.
                            </p>
                            <div className="h-1 w-20 bg-accent"></div>
                        </div>

                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {reviews.map(review => (
                                <div key={review.id} className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-accent/30 transition-all">
                                    <div className="text-accent text-sm mb-4">{'★'.repeat(review.rating)}</div>
                                    <p className="text-text-light italic mb-6 leading-relaxed font-serif">"{review.review}"</p>
                                    <div>
                                        <p className="text-navy-rich font-bold uppercase tracking-wide text-sm">{review.name}</p>
                                        <p className="text-xs text-gray-400 mt-1">{review.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FleetListing;
