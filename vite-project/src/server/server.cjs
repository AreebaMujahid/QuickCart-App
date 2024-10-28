const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware setup
app.use(cors({
    origin: 'http://localhost:5174', // Frontend URL
    methods: ['GET', 'POST'],
}));
app.use(express.json()); // Parses JSON bodies

// Path to your data file
const dataFilePath = path.join(__dirname, '../assets/new.json');

// Function to read data from JSON file
function readDataFromFile() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error reading JSON file:", error);
        return [];
    }
}

// Function to write data to JSON file
function writeDataToFile(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Signup route to handle form submissions
app.post('/Signup', (req, res) => {
    const users = readDataFromFile();  // Get existing data
    users.push(req.body);              // Append new user data
    console.log(users);
    writeDataToFile(users);            // Write updated data back to file
    res.status(201).send({ message: 'User created successfully' });
});

// Endpoint to serve all data from JSON file
app.get('/products', (req, res) => {
    const products = readDataFromFile();
    console.log(products);
    res.json(products);  // Send the data as JSON response
});

// Start the server on port 4000
const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
