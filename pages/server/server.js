const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow access from this origin
    methods: ["GET", "POST"], // Allow these HTTP methods
    allowedHeaders: ["my-custom-header"], // Allow these headers
    credentials: true, // Allow sending cookies with the request
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("message", (message) => {
    io.emit("message", message);
  });
});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});
