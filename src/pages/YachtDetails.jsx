import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import yachts from '../data/yachts.json';
import SuccessModal from '../components/SuccessModal';

const YachtDetails = () => {
    const { id } = useParams();
    const yacht = yachts.find(y => y.id === parseInt(id));

    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        startDate: '',
        endDate: ''
    });

    if (!yacht) {
        return (
            <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-primary">
                <h2 className="text-2xl font-serif text-text-main mb-4">Yacht not found</h2>
                <Link to="/" className="text-accent hover:underline">Back to Fleet</Link>
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const totalCost = days > 0 ? days * yacht.pricePerDay : 0;

        const newBooking = {
            id: Date.now(),
            ...formData,
            yachtId: yacht.id,
            yachtName: yacht.name,
            totalCost,
            status: 'Pending'
        };

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBooking),
            });

            if (response.ok) {
                setShowSuccess(true);
                // Redirect after 3 seconds
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                alert("Failed to submit booking. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting booking:", error);
            alert("An error occurred. Please check console.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-primary text-text-main pt-24 pb-20"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/" className="inline-flex items-center text-text-light hover:text-accent mb-8 transition-colors text-sm uppercase tracking-widest">
                    <span>←</span> <span className="ml-2">Return to Fleet</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative overflow-hidden rounded-sm shadow-xl">
                            <img
                                src={yacht.image}
                                alt={yacht.name}
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute top-0 right-0 bg-accent text-white px-6 py-2 font-bold uppercase tracking-widest">
                                ${yacht.pricePerDay.toLocaleString()} <span className="text-[10px] font-normal opacity-80">/ DAY</span>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            {/* Placeholders for gallery */}
                            <div className="h-32 bg-secondary flex items-center justify-center text-text-light text-xs uppercase font-bold tracking-wider">Interior View</div>
                            <div className="h-32 bg-secondary flex items-center justify-center text-text-light text-xs uppercase font-bold tracking-wider">Deck View</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="mb-10">
                            <span className="text-accent uppercase tracking-widest text-sm font-bold block mb-2">{yacht.location}</span>
                            <h1 className="text-4xl md:text-5xl font-serif text-navy-rich mb-6">{yacht.name}</h1>

                            <div className="flex gap-8 border-b border-gray-200 pb-8 mb-8">
                                <div className="text-left">
                                    <span className="block text-2xl mb-1 text-text-light">📏</span>
                                    <span className="text-sm font-bold text-navy-rich uppercase tracking-wider">Length: {yacht.length}</span>
                                </div>
                                <div className="text-left">
                                    <span className="block text-2xl mb-1 text-text-light">👥</span>
                                    <span className="text-sm font-bold text-navy-rich uppercase tracking-wider">Guests: {yacht.capacity}</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-serif text-navy-rich mb-4">About the Yacht</h3>
                            <p className="text-text-light leading-relaxed mb-8 text-lg font-light">{yacht.description}</p>
                        </div>

                        <div className="bg-secondary p-8 border border-gray-100 relative shadow-lg">
                            <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
                            <h3 className="text-2xl font-serif text-navy-rich mb-6">Request Booking</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-text-light uppercase tracking-wider mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="clientName"
                                        value={formData.clientName}
                                        required
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 text-text-main focus:border-accent outline-none transition-colors shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-text-light uppercase tracking-wider mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="clientEmail"
                                        value={formData.clientEmail}
                                        required
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 text-text-main focus:border-accent outline-none transition-colors shadow-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-text-light uppercase tracking-wider mb-2">Start Date</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            required
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 text-text-main focus:border-accent outline-none transition-colors shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-text-light uppercase tracking-wider mb-2">End Date</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formData.endDate}
                                            required
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 text-text-main focus:border-accent outline-none transition-colors shadow-sm"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!formData.endDate}
                                    className="w-full bg-accent text-white py-4 uppercase tracking-widest font-bold text-sm hover:bg-navy-rich transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                >
                                    Submit Request
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
            <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
        </motion.div>
    );
};

export default YachtDetails;
