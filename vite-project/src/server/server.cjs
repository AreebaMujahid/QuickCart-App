const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken'); // Required for JWT token generation

const app = express();
const PORT = 4000;

// Path to JSON files
const usersFilePath = '../assets/new.json';
const loginsFilePath = '../assets/logins.json';
const tasksFilePath = '../assets/task.json';

// JWT secret and expiration settings
const secretKey = 'yourSecretKey'; // Replace with a strong secret in production
const tokenExpiration = '1h'; // Set token expiration (e.g., '1h' for 1 hour)

// CORS configuration
const allowedOrigins = ['http://localhost:3000'];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Middleware to parse JSON bodies and cookies
app.use(express.json());
app.use(cookieParser());

// Helper functions to read/write user data
const readDataFromFile = (filePath, callback) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(data));
    }
  });
};

const writeDataToFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing file:', error);
    return false;
  }
};

// Signup route
app.post('/Signup', (req, res) => {
  const newUser = req.body;

  readDataFromFile(usersFilePath, (users) => {
    const emailExists = users.some(user => user.email === newUser.email);

    if (emailExists) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      users.push(newUser);
      const success = writeDataToFile(usersFilePath, users);

      if (success) {
        res.cookie('session_id', newUser.email, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
        });
        res.status(201).json({ message: 'User created successfully' });
      } else {
        res.status(500).json({ message: 'Error saving user data' });
      }
    }
  });
});

// Login route
app.post('/Login', (req, res) => {
  const loginData = req.body;

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading user data' });
    }

    const users = JSON.parse(data);
    const user = users.find(u => u.email === loginData.email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: tokenExpiration });

    fs.readFile(loginsFilePath, 'utf8', (err, loginsData) => {
      const logins = err ? [] : JSON.parse(loginsData);
      logins.push({ email: loginData.email, timestamp: new Date().toISOString() });

      fs.writeFile(loginsFilePath, JSON.stringify(logins), (writeErr) => {
        if (writeErr) {
          return res.status(500).json({ message: 'Error saving login data' });
        }

        res.status(200).json({ message: 'Login successful', token });
      });
    });
  });
});

app.get('/signups', (req, res) => {
    const users = readDataFromFile(usersFilePath);
    res.status(200).json(users);
  });
  
app.get('/logins', (req, res) => {
    const logins = readDataFromFile(loginsFilePath);
    res.status(200).json(logins);
  });
  
app.get('/tasks', (req, res) => {
    const tasks = readDataFromFile(tasksFilePath);
    res.status(200).json(tasks);
  });
  
app.post('/Task', (req, res) => {
    const { email, description } = req.body;
    if (!email || !description) {
      return res.status(400).json({ message: 'Email and description are required' });
    }
    const newTask = { id: Date.now().toString(), email, description, timestamp: new Date().toISOString() };
    const tasks = readDataFromFile(tasksFilePath);
    tasks.push(newTask);
    const success = writeDataToFile(tasksFilePath, tasks);
    if (success) {
      res.status(201).json({ message: 'Task created successfully', task: newTask });
    } else {
      res.status(500).json({ message: 'Error saving task data' });
    }
  });
  
app.put('/Todo/:taskId', (req, res) => {
    const { taskId } = req.params;
    const { description } = req.body;
    const tasks = readDataFromFile(tasksFilePath);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    tasks[taskIndex].description = description;
    const success = writeDataToFile(tasksFilePath, tasks);
    if (success) {
      res.status(200).json({ message: 'Task updated successfully', task: tasks[taskIndex] });
    } else {
      res.status(500).json({ message: 'Error updating task' });
    }
  });
  
app.delete('/Todo/:taskId', (req, res) => {
    const { taskId } = req.params;
    const tasks = readDataFromFile(tasksFilePath);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    const success = writeDataToFile(tasksFilePath, tasks);
    if (success) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(500).json({ message: 'Error deleting task' });
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
