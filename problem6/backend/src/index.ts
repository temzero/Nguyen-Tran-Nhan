import express from 'express';
import router from './routers';
import mongoose from 'mongoose';
// websocket for live update
import http from 'http';
import {Server} from 'socket.io';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 4001;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // allow all clients
  }
});

app.use(express.json());
app.use('/', router);


// connect to MongoDB database
const MONGO_URI = 'mongodb server url';
mongoose.Promise = Promise;
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Unable to connect to MongoDB', error));


// Step 3: Server Verifies JWT in WebSocket Connection
// The server checks if the JWT is valid before accepting the WebSocket connection.

// WebSocket JWT authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token; // Get JWT from client

  if (!token) return next(new Error("Authentication error"));

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); // Validate JWT
    socket.data.user = user; // Attach user data to socket
    next();
  } catch (error) {
    next(new Error("Authentication error"));
  }
});


// websocket connection
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Example: Listen for an event called "sendMessage"
  socket.on('userScoreUpdate', (data) => {
    console.log('Received userScoreUpdate:', data);
    // Data would be like { userId: data.username, score: (oldScore + data.score) }
    // PUT api/user/score/update (inside imported router)

    // Save data to database 
    // Broadcast message to all connected clients
    io.emit('Received userScoreUpdate', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});