

const headerDots = document.querySelector(".header_dots");
const clearModal = document.querySelector("#clearModal");
const confirmClear = document.querySelector("#confirmClear");
const cancelClear = document.querySelector("#cancelClear");


const socket = io();

const userData = {
  id: Math.floor(Math.random() * 1000),
  userName: prompt("Введіть ім'я") || "Анонім",
};

socket.emit("user joined", { login: userData.userName });

const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = new FormData(form).get("text");
  if (text) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    socket.emit("chat message", {
      ...userData,
      data: hours + ":" + minutes,
      message: text
    });
    form.reset();
  }
});

socket.on("messages history", (messages) => {
  messages.forEach(msg => renderMessage(msg));
});

socket.on("chat message", (msg) => {
  renderMessage(msg);
});

function renderMessage(msg) {
  const li = document.createElement("li");
  li.classList.add("message_box");
  if (msg.id != null) {
    li.setAttribute("data-id", msg.id);
  }
  li.innerHTML = `
    <img src="./img/man.jpg" alt="" style="align-self: ${msg.message.split(" ").length > 10 ? "start" : "center"};">
    <div class="box_text">
      <p class="name">${msg.username}</p>
      <p class="text">${msg.message}</p>
      <p class="time">${msg.data}</p>
    </div>
  `;
  document.querySelector(".main__container").appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
  addClass();
}

function addClass() {
  const dataAttribute = document.querySelectorAll("[data-id]");
  dataAttribute.forEach(att => {
    if (+att.getAttribute("data-id") == userData.id) {
      att.classList.add("my_message");
    }
  });
}
/*Функція для видалення повідомлення всього чату*/



headerDots.addEventListener("click", () => {
  clearModal.style.display = "flex";
});


cancelClear.addEventListener("click", () => {
  clearModal.style.display = "none";
});


confirmClear.addEventListener("click", () => {
  socket.emit("clear chat");         
  clearModal.style.display = "none";
});


socket.on("chat cleared", () => {
  document.querySelector(".main__container").innerHTML = "";
});


export default socket;