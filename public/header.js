import socket from "./index.js";

const activeUsers = document.querySelector(".chat_activeUsers_number");

socket.on("chat connection", (activeUsers_num) => {
  activeUsers.textContent = activeUsers_num;
});
