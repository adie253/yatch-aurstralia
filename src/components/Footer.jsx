import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-navy-rich text-white pt-20 pb-10" id="contact">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <span className="text-3xl text-accent">⚓</span>
                            <span className="text-2xl font-serif font-bold text-white tracking-widest">YATCH AUSTRALIA</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed max-w-sm mb-8">
                            The premier destination for luxury yacht charters in Australia.
                            Setting the standard for maritime excellence and bespoke service.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-serif text-lg mb-6">Contact</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start gap-3">
                                <span className="text-accent mt-1">📍</span>
                                <span>1 Circular Quay,<br />Sydney NSW 2000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-accent">📞</span>
                                <span>+61 2 9000 1234</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-accent">📧</span>
                                <span>book@aussieyachtfleet.com.au</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-serif text-lg mb-6">Links</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link to="/" className="hover:text-accent transition-colors">Our Fleet</Link></li>
                            <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="hover:text-accent transition-colors">Services</Link></li>
                            <li><Link to="/#reviews" className="hover:text-accent transition-colors">Testimonials</Link></li>
                            <li><Link to="/admin" className="hover:text-accent transition-colors">Admin Portal</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>&copy; 2024 Aussie Yacht Fleet. All rights reserved.</p>
                    <p>Designed for Luxury.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
