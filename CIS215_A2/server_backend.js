const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// parses json requests
app.use(bodyParser.json());

app.use(cors());

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



app.post('/api/add-drivers', (req, res) => {
    const data = req.body;

    const query = 'INSERT INTO Drivers (first_name, middle_name, last_name, dob, address_street, address_zip, license_number) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const { first_name, middle_name, last_name, dob, address_street, address_zip, license_number } = data;

    db.run(query, [first_name, middle_name, last_name, dob, address_street, address_zip, license_number], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Driver added successfully', driver_id: this.lastID });
    });
});

app.post('/api/add-vehicles', (req, res) => {
    const data = req.body;

    const query = 'INSERT INTO Vehicles (start_miles, end_miles, start_fuel, end_fuel, start_condition, end_condition, issues, reason_for_trip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
     
    const { start_miles, end_miles, start_fuel, end_fuel, start_condition, end_condition, issues, reason_for_trip } = data;

    db.run(query, [start_miles, end_miles, start_fuel, end_fuel, start_condition, end_condition, issues, reason_for_trip], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Vehicle added successfully', vehicle_id: this.lastID });
    });
});

app.post('/api/add-passengers', (req, res) => {
    const data = req.body;

    const query = 'INSERT INTO Passengers (first_name, middle_name, last_name, dob, address_street, address_zip ) VALUES (?, ?, ?, ?, ?, ?)';
     
    const { first_name, middle_name, last_name, dob, address_street, address_zip } = data;

    db.run(query, [first_name, middle_name, last_name, dob, address_street, address_zip], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Trips added successfully', passenger_id: this.lastID });
    });
});

app.post('/api/add-trips', (req, res) => {
    const data = req.body;

    const query = 'INSERT INTO Trips ( destination_address, destination_zip, to_date, to_start_time, to_arrival_time, back_date, back_start_time, back_arrival_time, vehicle_id, driver_id, passenger_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const { destination_address, destination_zip, to_date, to_start_time, to_arrival_time, back_date, back_start_time, back_arrival_time, vehicle_id, driver_id, passenger_id } = data;

    db.run(query, [destination_address, destination_zip, to_date, to_start_time, to_arrival_time, back_date, back_start_time, back_arrival_time, vehicle_id, driver_id, passenger_id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Passenger added successfully', trip_id: this.lastID });
    });
});



const PORT = 3000;
// starts server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});