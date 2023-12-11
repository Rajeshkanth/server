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
    origin: "https://rajeshkanth.github.io/feed-someone/",
  },
});

io.on("connection", (socket) => {
  console.log(`user connected ${(c += 1)}`);

  socket.on("donateDone", (value) => {
    if (value.donated) {
      io.emit("success", {details:value.details});
      console.log(value);
    }
  });
  socket.on("cancel", (val) => {
    if (val.cancelled) {
      console.log(val);
      io.emit("failed", true);
    }
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});
