import socket from "./index.js";

const activeUsers = document.querySelector(".chat_activeUsers_number");
const messages = document.querySelector("#messages");

socket.on("chat connection", ({ activeUsers_num, userName }) => {
  activeUsers.textContent = activeUsers_num;
  messages.innerHTML += `
    <li class="addedUser">${userName} приєднався до чату</li>
  `;
});

socket.on("chat disconnection", ({ activeUsers_num, userName }) => {
  activeUsers.textContent = activeUsers_num;
  messages.innerHTML += `
    <li class="addedUser">${userName} покинув чат</li>
  `;
});
