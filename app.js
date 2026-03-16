require('dotenv').config(); 
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


connectDB();


const authRoutes = require('./routes/routes');
app.use('/api/auth', authRoutes);   


io.on('connection', (socket) => {
  console.log("Користувач під'єднався");

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log("Користувач від'єднався");
  });
});

server.listen(3000, () => {
  console.log(" Server на localhost:3000");
});
