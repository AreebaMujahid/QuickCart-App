const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Define the port and the path to the data file
const PORT = 4008;
const dataFilePath = path.join(__dirname, '../assets/new.json');

// Allowed origins
const allowedOrigins = ['http://localhost:3002', 'http://localhost:5173'];

// Function to read data from JSON file asynchronously
function readDataFromFile(callback) {
    fs.readFile(dataFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            callback([]);
        } else {
            callback(data ? JSON.parse(data) : []);
        }
    });
}

// Function to write data to JSON file synchronously
function writeDataToFile(data) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error("Error writing to JSON file:", error);
        return false;
    }
}

// Create the server
const server = http.createServer((req, res) => {
    // Set up CORS headers
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const parsedUrl = url.parse(req.url, true);

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    // Handle POST request for /Signup
    if (req.method === 'POST' && parsedUrl.pathname === '/Signup') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
    
        req.on('end', () => {
            const newUser = JSON.parse(body); // Parse the incoming user data (contains email)
    
            readDataFromFile(users => {
                // Check if the email already exists
                const emailExists = users.some(user => user.email === newUser.email);
    
                if (emailExists) {
                    // Respond with error if email already exists
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Email already exists' }));
                } else {
                    
                    // If email doesn't exist, append the new user and save the file
                    users.push(newUser);
                    const success = writeDataToFile(users);
    
                    if (success) {
                        // Set a cookie to identify the user (e.g., a session token or user ID)
                    res.setHeader('Set-Cookie', `useremail=${newUser.email}; HttpOnly; Max-Age=604800`); // Cookie expires in 7 days
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'User created successfully' }));
                    } else {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Error saving user data' }));
                    }
                }
            });
        });
    }
    

    // Handle GET request for /products
     else if (req.method === 'GET' && parsedUrl.pathname === '/products') {
        readDataFromFile(products => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(products));
        });

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
