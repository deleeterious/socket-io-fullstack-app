const app = require("express")();
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const port = 8080;

let rooms = [
  {
    id: 1,
    name: "Room 1",
    messages: [],
    users: [],
  },
  {
    id: 2,
    name: "Room 2",
    messages: [],
    users: [],
  },
  {
    id: 3,
    name: "Room 3",
    messages: [],
    users: [],
  },
];

app.use(cors());

app.get("/rooms", (req, res) => {
  res.send(rooms);
});

io.on("connection", (socket) => {
  socket.on("join room", (data) => {
    rooms = rooms.reduce((acc, item) => {
      if (item.id === Number(data.roomId)) {
        return [{ ...item, users: [...item.users, data.userName] }, ...acc];
      }

      return [...acc, item];
    }, []);
    socket.emit(
      "room update",
      rooms.find((item) => item.id === Number(data.roomId))
    );
  });

  socket.on("disconnect room", (data) => {
    rooms = rooms.reduce((acc, item) => {
      if (item.id === Number(data.roomId)) {
        return [
          {
            ...item,
            users: item.users.filter((item) => item != data.userName),
          },
          ...acc,
        ];
      }

      return [...acc, item];
    }, []);
    socket.emit(
      "room update",
      rooms.find((item) => item.id === Number(data.roomId))
    );
  });
});

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
