import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'src', 'data', 'bookings.json');

// Get all bookings
app.get('/api/bookings', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        res.json(JSON.parse(data));
    });
});

// Create a new booking
app.post('/api/bookings', (req, res) => {
    const newBooking = req.body;
    console.log('Received booking request:', JSON.stringify(newBooking, null, 2));

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            return res.status(500).json({ error: 'Failed to read data' });
        }

        let bookings = [];
        try {
            bookings = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            // Fallback to empty array if file is corrupt
            bookings = [];
        }

        bookings.push(newBooking);

        fs.writeFile(DATA_FILE, JSON.stringify(bookings, null, 2), (err) => {
            if (err) {
                console.error('Error writing data file:', err);
                return res.status(500).json({ error: 'Failed to save data' });
            }
            console.log('Booking saved successfully to:', DATA_FILE);
            res.status(201).json(newBooking);
        });
    });
});

// Update booking status (Accept/Reject)
app.put('/api/bookings/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }

        let bookings = JSON.parse(data);
        const index = bookings.findIndex(b => b.id.toString() === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        bookings[index].status = status;

        fs.writeFile(DATA_FILE, JSON.stringify(bookings, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save data' });
            }
            res.json(bookings[index]);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
