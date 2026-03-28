const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let activeUsers_num = 0; //роблю змінну для активних юзерів

io.on("connection", (socket) => {
  activeUsers_num++; // збільшую при конекті
  socket.on("user joined", (userName) => {
    io.emit("chat connection", { activeUsers_num, userName }); //роблю еміт

    console.log("Користувач під'єднався");

    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
      // window.scrollTo(0, document.querySelector(".main__container").scrollHeight);
       document.querySelector(".main__container").scrollTop = document.querySelector(".main__container").scrollHeight;
      // document.querySelector(".main__container").scrollTop({
      //    top: document.querySelector(".main__container").scrollHeight,
      //    behavior: "smooth"
      // });
    });

    socket.on("disconnect", () => {
      console.log("Користувач від'єднався");

      activeUsers_num--; // зменшую при дисконекті
      io.emit("chat disconnection", { activeUsers_num, userName }); //роблю еміт
    });
  });
});
server.listen(3000, () => {
  console.log("Sever is running on localhost:3000");
});
