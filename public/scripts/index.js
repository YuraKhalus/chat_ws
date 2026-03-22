const socket = io();
const userData = {
  id: Math.floor(Math.random() * 1000),
  username: "", //зробив пустим юзернейм
};

//-----------------------------

const modal = document.querySelector(".modal");
const modal_login = document.querySelector(".login");
const userForm = document.querySelector("#userForm");
const userForm_login = document.querySelector(".login #userForm");
const userNameInput = document.querySelector(".userNameInput");
const userNameInput_login = document.querySelector(".login .userNameInput");

const userImgInput = document.querySelector("#fileInput");
const avatar_img = document.querySelector(".avatar_img_show");

document.body.style.overflow = "hidden";

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userData.username = userNameInput.value ? userNameInput.value : "Aнонім"; //тут юзернейм заповнюю
  socket.emit("user joined", userData.username);
  document.body.style.overflow = "";
  modal.classList.remove("active");
});

userImgInput.addEventListener("change", (e) => {
  const currFiles = e.target.files;

  if (currFiles.length > 0) {
    let src = URL.createObjectURL(currFiles[0]);
    avatar_img.src = src;
  }
});

const login_modal = document.querySelector(".login");
const registration_modal = document.querySelector(".registration");
const switch_button_registration = document.querySelector(
  ".switch_button_registration",
);
const switch_button_login = document.querySelector(".switch_button_login");

userForm_login.addEventListener("submit", (e) => {
  e.preventDefault();
  userData.username = userNameInput_login.value
    ? userNameInput_login.value
    : "Aнонім"; //тут юзернейм заповнюю
  socket.emit("user joined", userData.username);
  document.body.style.overflow = "";
  modal_login.classList.remove("active");
});

function switch_modal(e) {
  e.preventDefault();
  login_modal.classList.toggle("active");
  registration_modal.classList.toggle("active");
}

switch_button_registration.addEventListener("click", (e) => switch_modal(e));
switch_button_login.addEventListener("click", (e) => switch_modal(e));

//-----------------------------

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
      message: text,
    });
    form.reset();
  }
});

socket.on("chat message", (msg) => {
  const li = document.createElement("li");
  li.classList.add("message_box");
  li.setAttribute("data-id", msg.id);
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
});

function addClass() {
  const dataAttribute = document.querySelectorAll("[data-id]");
  dataAttribute.forEach((att) => {
    if (+att.getAttribute("data-id") == userData.id) {
      att.classList.add("my_message");
    }
  });
}

export default socket;
