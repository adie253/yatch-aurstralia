import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white p-8 md:p-12 rounded-sm shadow-2xl max-w-lg w-full text-center border-t-4 border-accent"
                    >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl">✅</span>
                        </div>

                        <h2 className="text-3xl font-serif text-navy-rich mb-4">Request Received</h2>
                        <p className="text-text-light text-lg mb-8 leading-relaxed">
                            Thank you for choosing Yacht Australia. Your booking request has been submitted successfully using our secure server.
                        </p>
                        <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">
                            Redirecting to home...
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SuccessModal;
