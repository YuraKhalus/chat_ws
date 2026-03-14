const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Підключення до бази даних
connectDB();


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
   console.log("Користувач під'єднався");

   socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
   })

   socket.on('disconnect', () => {
      console.log("Користувач від'єднався");
   })
})

server.listen(3000, () => {
   console.log("Sever is running on localhost:3000");
})