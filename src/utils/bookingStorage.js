import initialBookings from '../data/bookings.json';

const STORAGE_KEY = 'yacht_bookings';

export const getBookings = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        // Seed with initial data if empty
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBookings));
        return initialBookings;
    }
    return JSON.parse(stored);
};

export const addBooking = (booking) => {
    const bookings = getBookings();
    bookings.push(booking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    return booking;
};

export const updateBookingStatus = (id, status) => {
    const bookings = getBookings();
    const index = bookings.findIndex(b => b.id.toString() === id.toString());

    if (index !== -1) {
        bookings[index].status = status;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
        return bookings[index];
    }
    return null;
};
