var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function (_req, res) {
  res.sendFile(__dirname + "/index.html");
});
users = [];
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
http.listen(3000, function () {
  console.log("listening on localhost:3000");
});
