import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "*",
  },
});

const onlineuser = [];

const addNewUser = (username, socketId) => {
  !onlineuser.some((user) => user.username === username) &&
    onlineuser.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineuser = onlineuser.filter((user) => user.socketId !== socketId);
};

const getOneUser = (username) => {
  return onlineuser.find((user) => user.username === username);
};

console.log(onlineuser);

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
    console.log(`${username} is online `);
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getOneUser(receiverName);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });

    console.log(type);
  });

  socket.on("disconnection", () => {
    removeUser(socket.id);
  });
});

io.listen(5000);
