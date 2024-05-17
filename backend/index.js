const app = require("express")();
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const port = 8080;

const savedStrings = [];

app.use(cors());

io.on("connection", (socket) => {
  socket.on("saveString", (data) => {
    console.log(data);
    savedStrings.push(data);
    socket.emit("saveStringResponse", savedStrings);
  });
});

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
