const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Define the port and the path to the data file
const PORT = 4001;
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

// Create the server
const server = http.createServer((req, res) => {
    // Set up CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5174');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const parsedUrl = url.parse(req.url, true);

    // Handle POST request for /Signup
    if (req.method === 'POST' && parsedUrl.pathname === '/Signup') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const users = readDataFromFile();
            users.push(JSON.parse(body));
            writeDataToFile(users);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User created successfully' }));
        });

    // Handle GET request for /products
    } else if (req.method === 'GET' && parsedUrl.pathname === '/products') {
        const products = readDataFromFile();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));

    // Handle unsupported routes
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
});

// Start listening on the specified port
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
