const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);

var c = 0;

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`user connected ${(c += 1)}`);

  socket.on("qrScanned", (data) => {
    console.log(data);
  });
  socket.on("donateDone", (value) => {
    if (value.donated) {
      io.emit("success", true);
      console.log(value);
    }
  });
  socket.on("cancel", (val) => {
    if (val === false) {
      console.log(val);
      socket.emit("failed", true);
    }
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});
