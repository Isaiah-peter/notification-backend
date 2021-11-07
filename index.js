import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("someone has connected!");

  socket.on("disconnection", () => {
    console.log("someone has disconnected!");
  });
});

io.listen(5000);
