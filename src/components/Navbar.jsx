import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const location = useLocation();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    const isHome = location.pathname === '/';

    // Logic: 
    // - On Home: transparent -> white on scroll.
    // - On other pages: always white or light gray.

    let navClasses = "";
    let textClasses = "";
    let logoClasses = "";

    if (isHome && !isScrolled) {
        navClasses = "bg-transparent";
        textClasses = "text-white hover:text-accent";
        logoClasses = "text-white";
    } else {
        navClasses = "bg-white/95 shadow-md backdrop-blur-sm";
        textClasses = "text-text-main hover:text-accent";
        logoClasses = "text-navy-rich";
    }

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClasses}`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-24">
                    <Link to="/" className="flex items-center gap-3 group">
                        <span className={`text-3xl text-accent`}>⚓</span>
                        <div className="flex flex-col">
                            <span className={`text-2xl font-serif font-bold tracking-widest transition-colors ${logoClasses}`}>YATCH AUSTRALIA</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center space-x-10">
                        <Link to="/" className={`text-sm font-bold uppercase tracking-widest transition-colors ${textClasses}`}>Fleet</Link>
                        <Link to="/about" className={`text-sm font-bold uppercase tracking-widest transition-colors ${textClasses}`}>About</Link>
                        <Link to="/services" className={`text-sm font-bold uppercase tracking-widest transition-colors ${textClasses}`}>Services</Link>
                        <Link to="/#reviews" className={`text-sm font-bold uppercase tracking-widest transition-colors ${textClasses}`}>Reviews</Link>

                        <a
                            href="#contact"
                            className={`border px-6 py-2 uppercase tracking-widest text-xs font-bold transition-all duration-300 ${isHome && !isScrolled ? 'border-white text-white hover:bg-white hover:text-navy-rich' : 'border-accent text-accent hover:bg-accent hover:text-white'}`}
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
