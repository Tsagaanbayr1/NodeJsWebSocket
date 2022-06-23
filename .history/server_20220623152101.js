// var app = require("express")();
// var http = require("http").Server(app);
// var io = require("socket.io")(http);

// app.get("/", function (_req, res) {
//   res.sendFile(__dirname + "/index.html");
// });
// users = [];
// io.on("connection", function (socket) {
//   console.log("A user connected");
//   socket.on("setUsername", function (data) {
//     console.log(data);
//     if (users.includes(data)) {
//       socket.emit(
//         "userExists",
//         data + " username is taken! Try some other username."
//       );
//     } else {
//       users.push(data);
//       socket.emit("userSet", { username: data });
//     }
//   });
//   socket.on("msg", function (data) {
//     //Send message to everyone
//     io.sockets.emit("newmsg", data);
//   });
//   socket.on("who", function (data) {
//     //Send message to everyone
//     io.sockets.emit("whoUsers", { users: users, user: data });
//   });
// });
// http.listen(3000, function () {
//   console.log("listening on localhost:3000");
// });

var express = require("express");

const PORT = process.env.PORT || 3000;
const INDEX = "/index.html";
var socketIO = require("socket.io");

const server = express()
  .use((_req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

users = [];

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

io.on("connection", function (socket) {
  console.log("A user connected");
  socket.on("setUsername", function (data) {
    console.log(data);
    if (users.includes(data)) {
      socket.emit(
        "userExists",
        data + " username is taken! Try some other username."
      );
    } else {
      users.push(data);
      socket.emit("userSet", { username: data });
    }
  });
  socket.on("msg", function (data) {
    //Send message to everyone
    io.sockets.emit("newmsg", data);
  });
  socket.on("who", function (data) {
    //Send message to everyone
    io.sockets.emit("whoUsers", { users: users, user: data });
  });
});
