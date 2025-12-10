import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="pt-24 min-h-screen bg-primary">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center bg-navy-rich overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=1600')" }}
                />
                <div className="relative z-20 text-center text-white px-4">
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl text-white font-serif mb-6"
                    >
                        Our Legacy
                    </motion.h1>
                    <p className="text-xl font-light tracking-wide max-w-2xl mx-auto">
                        Defining maritime excellence in Australia since 1998.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-serif text-text-main mb-6">Crafting Unforgettable Journeys</h2>
                        <div className="w-20 h-1 bg-accent mb-8"></div>
                        <p className="text-text-light text-lg leading-relaxed mb-6">
                            At Yacht Australia, we believe that true luxury lies in the details. For over two decades, we have curated exclusive charters that showcase the breathtaking beauty of the Australian coastline.
                        </p>
                        <p className="text-text-light text-lg leading-relaxed">
                            From the azure waters of the Whitsundays to the iconic Sydney Harbour, our fleet represents the pinnacle of design, comfort, and performance. Our dedicated crew ensures that every moment aboard is tailored to your desires.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&q=80&w=800"
                            alt="Luxury Interior"
                            className="w-full shadow-2xl rounded-sm"
                        />
                        <div className="absolute -bottom-10 -left-10 bg-white p-8 shadow-xl hidden md:block">
                            <p className="font-serif text-4xl text-accent mb-2">25+</p>
                            <p className="text-text-light uppercase tracking-widest text-sm">Years of Excellence</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-secondary py-24">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-serif text-text-main mb-16">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: "💎", title: "Excellence", desc: "We pursue perfection in every service, ensuring a flawless experience." },
                            { icon: "🛡️", title: "Safety", desc: "Your safety is paramount, with rigorously maintained vessels and expert crew." },
                            { icon: "🤝", title: "Integrity", desc: "Honest, transparent, and dedicated to building lasting relationships." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white p-10 shadow-lg border-t-4 border-accent hover:-translate-y-2 transition-transform duration-300"
                            >
                                <div className="text-4xl mb-6">{item.icon}</div>
                                <h3 className="text-2xl font-serif text-text-main mb-4">{item.title}</h3>
                                <p className="text-text-light leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
