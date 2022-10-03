const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let count = 0;

io.on("connection", function (socket) {
  console.log("A user has connected");
  count++;
  io.emit("usercnt", count);

  socket.on("disconnect", function () {
    console.log("A user disconnected");
    count--;
    io.emit("usercnt", count);
  });

  socket.on('sendmsg', function(msg){
    io.emit('sendmsg', msg)
  })


});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

let port = 5500;

http.listen(port, function () {
  console.log(`listining on port ${port}`);
});
