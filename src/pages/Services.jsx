import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
    const services = [
        {
            title: "Private Charters",
            desc: "Experience ultimate privacy and freedom. Customize your route, menu, and activities for a truly bespoke journey on the open seas.",
            image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Corporate Events",
            desc: "Impress clients and reward your team with a sophisticated nautical venue. Perfect for product launches, networking, and celebrations.",
            image: "https://www.oyorooms.com/blog/wp-content/uploads/2018/03/fe-30.jpg"
        },
        {
            title: "Wedding Celebrations",
            desc: "Say 'I do' against the backdrop of a stunning sunset. We offer comprehensive wedding packages including catering, decor, and entertainment.",
            image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Gourmet Catering",
            desc: "Our onboard chefs create culinary masterpieces using the freshest local ingredients. From seafood platters to fine dining degustations.",
            image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <div className="pt-24 min-h-screen bg-primary">
            <section className="bg-secondary py-20 text-center">
                <h1 className="text-5xl font-serif text-text-main mb-6">Our Services</h1>
                <p className="text-xl text-text-light max-w-2xl mx-auto">
                    Beyond just yacht rental, we provide a complete luxury lifestyle experience.
                </p>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-24">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`flex flex-col md:flex-row gap-12 items-center mb-24 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                        <div className="flex-1 w-full">
                            <div className="relative overflow-hidden group shadow-2xl rounded-sm">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-navy-rich/20 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-serif text-text-main mb-6">{service.title}</h2>
                            <div className="w-16 h-1 bg-accent mb-6 mx-auto md:mx-0"></div>
                            <p className="text-text-light text-lg leading-relaxed mb-8">{service.desc}</p>
                            <button className="text-accent font-bold uppercase tracking-widest text-sm hover:text-navy-rich transition-colors">
                                Enquire Now →
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Services;
