require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const setupSockets = require("./sokets/soket");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

connectDB();

const authRoutes = require("./routes/routes");
app.use("/api/auth", authRoutes);

setupSockets(io);

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});