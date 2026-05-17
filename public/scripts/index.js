import convertImg from "../utils/convert.js";

const wrap = document.querySelector('.wrap');

if (localStorage.getItem('userImageBackground')) {
    wrap.style.background = `url(${localStorage.getItem('userImageBackground')}) no-repeat center / cover`
}

const socket = io();

const userData = {
    id: Math.floor(Math.random() * 1000),
    username: null, //зробив пустим юзернейм
    //password: null, // добавив пароль
    avatar: null, // добавив фото
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
    //userData.password = password.value;

    const user = {
        //id: userData.id,
        login: userData.username,
        password: password.value,
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

        localStorage.setItem("avatar", base64Img);
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
    //userData.password = password_login.value;
    const user = {
        //id: userData.id,
        login: userData.username,
        password: password_login.value,
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


const modal_background = document.querySelectorAll('.modal')[2];

const modal_content = document.querySelectorAll('.modal_content')[2];

const closeModal = document.querySelector('#closeModal');
console.log(closeModal);

closeModal.addEventListener('click', () => {
  modal_background.classList.remove('active')
})

const modal_backgrounds_btn = document.querySelector('.modal_backgrounds');
const modal_title = document.querySelectorAll('.modal_title')[2];
const modal_text = document.querySelectorAll('.modal_text')[2];
modal_backgrounds_btn.addEventListener('click', () => {
  modal_background.classList.add('active')
  
  modal_title.textContent = 'Змінити фон'
  modal_text.textContent = 'Ви можете вибрати фон які вже готолі або ваш'
  modal_content.innerHTML = `
     <div class="modal_backgrounds">
        <div class="ready_made_backgrounds">
          <div class="background" data-background="background1"></div>
          <div class="background background2" data-background="background2"></div>
          <div class="background background3" data-background="background3"></div>
          <div class="background background4" data-background="background4"></div>
          <div class="background background5" data-background="background5"></div>
          <div class="background background6" data-background="background6"></div>
        </div>
        <p>Або</p>
        <p>Ваш фон</p>
        <form action="" class="uploadForm">
          <div class="upload">
            <input type="file" class="input_file" name="file">
            <img src="./img/upload.png" alt="" class="upload_img">
          </div>
          <button id="success_background" type="submit">Підтвердити</button>
        </form>
        <button id="delete_background">Удалити ваш фон</button>
      </div>
  `
  
  const backgrounds = document.querySelectorAll('.background');
  backgrounds.forEach(b => {
      b.addEventListener('click', () => {
        wrap.style.background = ''
          for (let i = 1; i < 7; i++) {
              wrap.classList.remove('background' + i)
          }
          wrap.classList.add(b.getAttribute('data-background'))
      })
  })

  const uploadForm = document.querySelector('.uploadForm');
  const upload_img = document.querySelector('.upload_img');

  
  uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const img = new FormData(uploadForm).get('file')

    if (img.size) {
        const type_image = ['image/png', 'image/jpeg']
        for (let i = 0; i < type_image.length; i++) {
            if (img.type == type_image[i]) break


            if (type_image.length-1 == i) {
                alert('вибрайте png або jpeg')
                return
            }
        }

        const base64 = await convertImg(img, 1000, 1000, 0.9)
        
        wrap.style.background = `url(${base64}) no-repeat center / cover`
        for (let i = 1; i < 7; i++) {
            wrap.classList.remove('background' + i)
        }
        localStorage.setItem('userImageBackground', base64);
        upload_img.src = '../img/upload.png'
        document.querySelector('.upload').style.cssText = `height: ''; padding: ''` 
    }
  })

  const delete_background = document.querySelector('#delete_background');
  delete_background.addEventListener('click', () => {
    localStorage.removeItem('userImageBackground')
    wrap.style.background = ''
    alert('фон успішно удалено')
  })
  const input_file = document.querySelector('.input_file');
  input_file.addEventListener('change', () => {
    const file = input_file.files[0]
    if (file.size) {
      const type_image = ['image/png', 'image/jpeg']
      for (let i = 0; i < type_image.length; i++) {
        if (file.type == type_image[i]) {
          break
        }
        if (type_image.length-1 == i) {
          alert('вибрайте png або jpeg')
          return
        }
      }
      const url = URL.createObjectURL(file)
      document.querySelector('.upload').style.cssText = 'height: max-content; padding: 10px 0'
      upload_img.onload = () => {
        URL.revokeObjectURL(url);
      };

      upload_img.src = url;
    }

  })
})

























export default socket;
