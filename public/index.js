// const socket = io();
// const userName = prompt('Введіть ваше ім\'я для чату:') || 'Анонім';

// const form = document.querySelector('#form');
// const input = document.querySelector('#input');
// const messages = document.querySelector('#messages');

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     if (input.value) {
//         socket.emit('chat message', {
//             user: userName,
//             message: input.value
//         });
//         input.value = '';
//     }
// })

// socket.on('chat message', (msg) => {
//     const item = document.createElement('li');
//     item.innerHTML = `<strong>${msg.user}: </strong>${msg.message}`;
//     messages.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
// })



const message_box = document.querySelectorAll('.message_box');
message_box.forEach((message, i) => {
    if (i !== message_box.length - 1) {
        const nextMessage = message.nextElementSibling.classList.contains('my_message')
        const classMessage = message.classList.contains('my_message')
        if (classMessage && nextMessage) {
            message.style.marginBottom = '6px' 
        } else if(!classMessage && nextMessage) {
            message.style.marginBottom = '20px' 
        } else if(classMessage && !nextMessage) {
            message.style.marginBottom = '16px' 
        }
    }
    if (message.querySelector('.box_text .text').textContent.split(' ').length > 10) {
        message.querySelector('img').style.alignSelf = 'start'
    }
})