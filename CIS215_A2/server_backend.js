const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

// express app
const app = express();

// parses json requests
app.use(bodyParser.json());

// connection to car-trips.db
const db = new sqlite3.Database('car-trips.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to car-trips.db successfully!');
    }
});



// route to fetch data from car-trips
app.get('/api/drivers', (req, res) => {
    const query = 'SELECT * FROM Drivers';

    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/api/passengers', (req, res) => {
    const query = 'SELECT * FROM Passengers';

    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/api/vehicles', (req, res) => {
    const query = 'SELECT * FROM Vehicles';

    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/api/trips', (req, res) => {
    const query = 'SELECT * FROM Trips';

    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

const PORT = 3000;
// starts server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});