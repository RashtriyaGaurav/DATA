const express = require("express");
const socketIo = require("socket.io");
const { createServer } = require("http");
const path = require("path");

const app = express();
const server = createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 3000;

module.exports = (req, res) => {
  app(req, res);
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
