import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'src', 'data', 'bookings.json');

// In-memory cache for Vercel/Serverless where FS is read-only
let bookingsCache = [];

// Initialize cache from file if possible
try {
    if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        bookingsCache = JSON.parse(data);
    }
} catch (err) {
    console.error('Failed to load initial data:', err);
    bookingsCache = []; // Start empty if read fails
}

// Get all bookings
app.get('/api/bookings', (req, res) => {
    res.json(bookingsCache);
});

// Create a new booking
app.post('/api/bookings', (req, res) => {
    const newBooking = req.body;

    // Update in-memory cache
    bookingsCache.push(newBooking);

    // Attempt to write to file (will fail on Vercel, but we catch it)
    fs.writeFile(DATA_FILE, JSON.stringify(bookingsCache, null, 2), (err) => {
        if (err) {
            console.warn('Warning: Failed to save to disk (expected on Vercel). Using in-memory store.');
            // Do NOT return error, return success based on in-memory update
        } else {
            console.log('Booking saved to disk.');
        }
    });

    // Always return success if in-memory update worked
    res.status(201).json(newBooking);
});

// Update booking status (Accept/Reject)
app.put('/api/bookings/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const index = bookingsCache.findIndex(b => b.id.toString() === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Booking not found' });
    }

    bookingsCache[index].status = status;

    // Attempt to write to file
    fs.writeFile(DATA_FILE, JSON.stringify(bookingsCache, null, 2), (err) => {
        if (err) {
            console.warn('Warning: Failed to save to disk (expected on Vercel). Using in-memory store.');
        }
    });

    res.json(bookingsCache[index]);
});

// Conditionally listen if run directly (Local dev), but export for Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;
