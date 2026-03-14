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