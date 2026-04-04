import socket from "./index.js";

const activeUsers = document.querySelector(".chat_activeUsers_number");
const messages = document.querySelector(".main__container");


socket.on("chat connection", ({ activeUsers_num, userName }) => {
  activeUsers.textContent = activeUsers_num;
  messages.innerHTML += `
          <li class="addedUser">
    <span class="addedUser_msg"><strong>${userName}</strong> приєднався до чату</span>
  </li>
  `;
});

socket.on("chat disconnection", ({ activeUsers_num, userName }) => {
  activeUsers.textContent = activeUsers_num;
  messages.innerHTML += `
      <li class="addedUser">
    <span class="addedUser_msg"><strong>${userName}</strong> покинув чат</span>
  </li>
  `;
});

