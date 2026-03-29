import convertImg from "../utils/convert.js";

const socket = io();

const userData = {
    id: Math.floor(Math.random() * 1000),
    username: "123", //зробив пустим юзернейм
    password: `123456`, // добавив пароль
    avatar: "123", // добавив фото
};

//-----------------------------

const modal = document.querySelector(".modal");
const modal_login = document.querySelector(".login");
const userForm = document.querySelector("#userForm");
const password = document.querySelector("#password");
const password_login = document.querySelector(".login #password");
const userForm_login = document.querySelector(".login #userForm");
const userNameInput = document.querySelector(".userNameInput");
const userNameInput_login = document.querySelector(".login .userNameInput");

const userImgInput = document.querySelector("#fileInput");
const avatar_img = document.querySelector(".avatar_img_show");

document.body.style.overflow = "hidden";

userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    userData.username = userNameInput.value ? userNameInput.value : "Aнонім"; //тут юзернейм заповнюю
    userData.password = password.value;

    const user = {
        //id: userData.id,
        login: userData.username,
        password: userData.password,
        avatar: userData.avatar,
    };
    try {
        const response = await axios.post("/api/auth/register", user); // роблю запит
        console.log(response);

        socket.emit("user joined", userData.username);
        document.body.style.overflow = "";
        modal.classList.remove("active");
    } catch (e) {
        alert("Логін зайнятий");
        console.log(e);
    }
});

userImgInput.addEventListener("change", async (e) => {
    const currFiles = e.target.files;

    if (currFiles.length > 0) {
        let src = URL.createObjectURL(currFiles[0]);
        avatar_img.src = src;
        const base64Img = await convertImg(currFiles[0]);
        console.log(base64Img);
        userData.avatar = base64Img;
    }
});

const login_modal = document.querySelector(".login");
const registration_modal = document.querySelector(".registration");
const switch_button_registration = document.querySelector(
    ".switch_button_registration",
);
const switch_button_login = document.querySelector(".switch_button_login");

userForm_login.addEventListener("submit", async (e) => {
    e.preventDefault();
    userData.username = userNameInput_login.value
        ? userNameInput_login.value
        : "Aнонім"; //тут юзернейм заповнюю
    userData.password = password_login.value;
    const user = {
        //id: userData.id,
        login: userData.username,
        password: userData.password,
    };
    try {
        const response = await axios.post("/api/auth/login", user); // роблю запит
        console.log(response);
        socket.emit("user joined", userData.username);
        document.body.style.overflow = "";
        modal_login.classList.remove("active");
    } catch (e) {
        alert("Логін не вдався");
        console.log(e);
    }
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
    dataAttribute.forEach((att) => {
        if (+att.getAttribute("data-id") == userData.id) {
            att.classList.add("my_message");
        }
    });
}

export default socket;
