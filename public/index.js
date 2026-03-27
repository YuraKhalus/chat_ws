const socket = io();
const userData = {
  id: Math.floor(Math.random() * 1000),
  username: "", //зробив пустим юзернейм
};

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






const modal = document.querySelector('.modal');
const modal_content = document.querySelector('.modal_content');
const closeModal = document.querySelector('#closeModal');

closeModal.addEventListener('click', () => {
  modal.classList.remove('active')
})

const modal_backgrounds = document.querySelector('.modal_backgrounds');
modal_backgrounds.addEventListener('click', () => {
  modal.classList.add('active')
  modal_content.innerHTML = `
    <div class="modal_background">
      <div class="background" data-background="background"></div>
      <div class="background background2" data-background="background2"></div>
      <div class="background background3" data-background="background3"></div>
      <div class="background background4" data-background="background4"></div>
      <div class="background background5" data-background="background5"></div>
      <div class="background background6" data-background="background6"></div>
    </div>
  `
  const backgrounds = document.querySelectorAll('.background');
  backgrounds.forEach(b => {
      b.addEventListener('click', () => {
          for (let i = 1; i < 7; i++) {
              document.querySelector('.main__container').classList.remove('background' + i)
          }
          document.querySelector('.main__container').classList.add(b.getAttribute('data-background'))
      })
  })
})

