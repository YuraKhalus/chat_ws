
const wrap = document.querySelector('.wrap');

if (localStorage.getItem('userImageBackground')) {
  wrap.style.background = `url(${localStorage.getItem('userImageBackground')}) no-repeat center / cover`
}
const socket = io()
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
const modal_title = document.querySelector('.modal_title');
const modal_text = document.querySelector('.modal_text');
modal_backgrounds.addEventListener('click', () => {
  modal.classList.add('active')
  modal_title.textContent = 'Змінити задній фон'
  modal_text.textContent = 'Ви можете вибрати задній вибрати фон які вже готолі або ваш'
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
        <button id="delete_background">Удалити фон</button>
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

  
  uploadForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const img = new FormData(uploadForm).get('file')
    const type_image = ['image/png', 'image/jpeg']
    for (let i = 0; i < type_image.length; i++) {
      if (img.type == type_image[i]) {
        break
      }
      if (type_image.length-1 == i) {
        alert('syibq nbg afqkf yfls')
        return
      }
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const base64 = e.target.result
      wrap.style.background = `url(${base64}) no-repeat center / cover`
      localStorage.setItem('userImageBackground', base64);
    };
    reader.readAsDataURL(img)
    upload_img.src = '../img/upload.png'
    document.querySelector('.upload').style.cssText = `height: ''; padding: ''`
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
    if (file) {
      
      const url = URL.createObjectURL(file)
      document.querySelector('.upload').style.cssText = 'height: max-content; padding: 10px 0'
      upload_img.onload = () => {
        URL.revokeObjectURL(url);
      };

      upload_img.src = url;
    }

  })
})




