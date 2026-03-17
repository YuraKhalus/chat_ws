const socket = io();
const userData = {
    id: Math.floor(Math.random() * 100),
    username: prompt('Введіть ваше ім\'я для чату:'),
}
const button = document.querySelector('#button');
button.addEventListener('click', () => {
    // if (input.value) {
        socket.emit('chat message', {
            ...userData,
            data: new Date().toLocaleString('en-US', { 
                hour: 'numeric', 
                minute: 'numeric', 
                hour12: true 
            }),
            message: document.querySelector('#text').value
        });
        document.querySelector('#text').value = ''
    // }
})

socket.on('chat message', (msg) => {
    const li = document.createElement('li')
    li.classList.add('message_box')
    li.setAttribute('data-id', msg.id)
    li.innerHTML = `
        <img src="./img/icon/__avatar_url.svg" alt="">
        <div class="box_text">
            <p class="name">${msg.username}</p>
            <p class="text">${msg.message}</p>
            <p class="time">${msg.data}</p>
        </div>
    `
    document.querySelector('.main__container').appendChild(li);
    addClass()
})



function addClass() {
    const dataAttribute = document.querySelectorAll('[data-id]');
    dataAttribute.forEach(att => {
        if (+att.getAttribute('data-id') == userData.id) {
            att.classList.add('my_message')
        }
    })
}
