const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');



const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey';  
const tokenExpiration = '1h';  // Token expiration time


// Define the port and the path to the data file
const PORT = 4008;

// Allowed origins
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

const usersFilePath = '../assets/new.json';
const loginsFilePath = '../assets/logins.json';
const tasksFilePath = '../assets/task.json';
// Function to read data from a JSON file
function readDataFromFile(filePath, callback) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            callback([]);
        } else {
            callback(data ? JSON.parse(data) : []);
        }
    });
}

// Function to write data to a JSON file
// Function to write data to JSON file synchronously
function writeDataToFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error("Error writing to JSON file:", error);
        return false;
    }
}

const updateTaskById = (taskId, newDescription, res) => {
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
        if (err) return res.end("Error reading file");

        let tasks = JSON.parse(data);
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        if (taskIndex === -1) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end("Task not found");
        }

        tasks[taskIndex] = { ...tasks[taskIndex], description: newDescription };

        fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8', (writeErr) => {
            if (writeErr) return res.end("Error writing to file");
            res.end("Task updated successfully");
        });
    });
};




// Create the server
const server = http.createServer((req, res) => {
    // Set up CORS headers
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');  //i m setting this for cookie setup
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST','PUT','DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;


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
    
            readDataFromFile(usersFilePath, users => {
                // Check if the email already exists
                const emailExists = users.some(user => user.email === newUser.email);
    
                if (emailExists) {
                    // Respond with error if email already exists
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Email already exists' }));
                } else {
                    
                    // If email doesn't exist, append the new user and save the file
                    users.push(newUser);
                    const success = writeDataToFile(usersFilePath ,users);
    
                    if (success) {
                        // Set a cookie to identify the user (e.g., a session token or user ID)
                    
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
    // Handle POST request for /Signup
    else if (req.method === 'POST' && parsedUrl.pathname === '/Login') {
        let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const loginData = JSON.parse(body); // Contains email and password

        readDataFromFile(usersFilePath, users => {
            // Check if the email and password match an existing user
            const user = users.find(u => u.email === loginData.email);

            if (!user) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid email or password' }));
            } else {
                // Successful login, generate a JWT token
                const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: tokenExpiration });

                // Track the login session by storing it in logins.json
                readDataFromFile(loginsFilePath, logins => {
                    logins = Array.isArray(logins) ? logins : [];
                    logins.push({ email: loginData.email, timestamp: new Date().toISOString() });
                    const success = writeDataToFile(loginsFilePath, logins);

                    if (success) {
                        // Include the JWT token in the response
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Login successful', token }));  // <-- token included here
                    } else {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Error saving login data' }));
                    }
                });
            }
        });
    });
    }
    
    

    // Handle GET request for /products
    else if (req.method === 'GET' && parsedUrl.pathname === '/signups') {
        readDataFromFile(usersFilePath, products => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(products));
        });
    }

    // Handle GET request for /products
    else if (req.method === 'GET' && parsedUrl.pathname === '/logins') {
        readDataFromFile(loginsFilePath, logins => { // Read from logins.json
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(logins)); // Return the login data
        });
    }

    else if (req.method === 'GET' && parsedUrl.pathname === '/tasks') {
        readDataFromFile(tasksFilePath, task => { // Read from logins.json
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(task)); // Return the login data
        });
    }


    else if (req.method === 'POST' && parsedUrl.pathname === '/Task') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
    
        req.on('end', () => {
            const taskData = JSON.parse(body); // Expects { email, description }
            
            // Validate the incoming task data
            if (!taskData.email || !taskData.description) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'Email and description are required' }));
            }
            // Create a new task with a unique ID and description
            const newTask = {
                id: taskData.id, // Generate a unique ID
                email: taskData.email,
                description: taskData.description,
                timestamp: new Date().toISOString()
            };

            //localStorage.setItem('Id', newTask.id);

            // Append the task to task.json
            readDataFromFile(tasksFilePath, tasks => {
                tasks = Array.isArray(tasks) ? tasks : [];
                tasks.push(newTask);

                const success = writeDataToFile(tasksFilePath, tasks);

                if (success) {
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Task created successfully', task: newTask }));   //sending task as object to cliengt side so that i can access taskid
                } else {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Error saving task data' }));
                }
            });
            
        });
    }
    
    
    else if (req.method === 'PUT' && path.startsWith('/Todo/')) {
        const taskId = path.split('/')[2];
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const { description } = JSON.parse(body);
            updateTaskById(taskId, description, res);
        });
    } 

    else if (req.method === 'DELETE' && path.startsWith('/Todo/')) {
        const taskId = path.split('/')[2];  // Extract the task ID from the URL
    
        // Read the current tasks from the file
        readDataFromFile(tasksFilePath, tasks => {
            tasks = Array.isArray(tasks) ? tasks : [];
    
            // Find the task index based on the ID
            const taskIndex = tasks.findIndex(task => task.id === taskId);
    
            if (taskIndex === -1) {
                // Task not found, respond with a 404 status
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'Task not found' }));
            }
    
            // Remove the task from the array
            tasks.splice(taskIndex, 1);
    
            // Write the updated task list back to the file
            const success = writeDataToFile(tasksFilePath, tasks);
    
            if (success) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Task deleted successfully' }));
            } else {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error deleting task' }));
            }
        });
    }
    
    
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("Not Found");
    }
});

// Start listening on the specified port
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
