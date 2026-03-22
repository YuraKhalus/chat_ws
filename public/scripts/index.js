const socket = io();
const userData = {
  id: Math.floor(Math.random() * 1000),
  username: "", //зробив пустим юзернейм
};

//-----------------------------

const modal = document.querySelector(".modal");
const submit = document.querySelector(".submit");
const userNameInput = document.querySelector(".userNameInput");

const userImgInput = document.querySelector("#fileInput");
const avatar_img = document.querySelector(".avatar_img_show");

submit.addEventListener("click", () => {
  console.log("fwofiwgwo");
  userData.username = userNameInput.value ? userNameInput.value : "Aнонім"; //тут юзернейм заповнюю
  socket.emit("user joined", userData.username);
  modal.classList.remove("active");
});

userImgInput.addEventListener("change", (e) => {
  const currFiles = e.target.files;

  if (currFiles.length > 0) {
    let src = URL.createObjectURL(currFiles[0]);
    avatar_img.src = src;
  }
});

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
