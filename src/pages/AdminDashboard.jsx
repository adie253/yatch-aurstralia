import React, { useState, useEffect } from 'react';
import { getBookings, updateBookingStatus } from '../utils/bookingStorage';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simple hardcoded password check
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
            fetchBookings();
        } else {
            alert('Incorrect password');
        }
    };

    const fetchBookings = () => {
        try {
            const data = getBookings();
            setBookings(data);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = (id, status) => {
        try {
            updateBookingStatus(id, status);
            // Update local state
            setBookings(bookings.map(b =>
                b.id === id ? { ...b, status } : b
            ));
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center px-4">
                <div className="bg-white p-8 border border-gray-100 rounded-sm shadow-2xl max-w-md w-full">
                    <div className="text-center mb-8">
                        <span className="text-4xl text-accent mb-2 block">⚓</span>
                        <h2 className="text-2xl font-serif text-navy-rich font-bold tracking-wide">Admin Access</h2>
                        <p className="text-text-light text-sm mt-2">Please login to manage fleet</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-text-light uppercase tracking-wider mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-secondary border border-gray-200 text-text-main focus:border-accent outline-none transition-colors rounded-sm"
                                placeholder="Enter password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-accent text-white py-4 uppercase tracking-widest font-bold text-sm hover:bg-navy-rich transition-colors shadow-lg"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary pt-28 px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <span className="text-accent uppercase tracking-widest text-xs font-bold">Portal</span>
                        <h1 className="text-4xl font-serif font-bold text-navy-rich mt-1">Dashboard</h1>
                    </div>
                    <div className="bg-white border border-gray-100 px-6 py-3 shadow-md rounded-sm">
                        <span className="text-text-light text-sm font-medium uppercase tracking-wide">Total Bookings</span>
                        <span className="text-accent ml-3 text-xl font-serif font-bold">{bookings.length}</span>
                    </div>
                </header>

                <div className="bg-white rounded-sm overflow-hidden border border-gray-100 shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-secondary text-text-main border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-navy-rich">ID</th>
                                    <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-navy-rich">Client</th>
                                    <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-navy-rich">Yacht</th>
                                    <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-navy-rich">Dates</th>
                                    <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-navy-rich">Total</th>
                                    <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-navy-rich">Status</th>
                                    <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-navy-rich">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {bookings.map(booking => (
                                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-6 text-sm text-text-light font-mono">#{booking.id.toString().slice(-6)}</td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-navy-rich text-sm">{booking.clientName}</span>
                                                <span className="text-xs text-text-light mt-1">{booking.clientEmail}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-sm text-text-main font-medium">{booking.yachtName}</td>
                                        <td className="px-6 py-6 text-sm text-text-light">
                                            <div className="flex flex-col text-xs space-y-1">
                                                <span className="font-semibold">{booking.startDate}</span>
                                                <span className="text-[10px] uppercase opacity-70">to</span>
                                                <span className="font-semibold">{booking.endDate}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-sm font-serif font-bold text-accent">${booking.totalCost.toLocaleString()}</td>
                                        <td className="px-6 py-6">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => updateStatus(booking.id, 'Confirmed')}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors border border-green-200"
                                                    title="Accept"
                                                >
                                                    ✓
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(booking.id, 'Rejected')}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-200"
                                                    title="Reject"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
