const inputField = document.querySelector('#input');
const sendIconDefault = document.querySelector('#send-icon-default');
const sendIconActive = document.querySelector('#send-icon-active');

sendIconActive.style.display = 'none';
sendIconDefault.style.display = 'block';

inputField.addEventListener('input', () => {
    if (inputField.value.trim().length > 0) {
        sendIconDefault.style.display = 'none';
        sendIconActive.style.display = 'block';
    } else {
        sendIconDefault.style.display = 'block';
        sendIconActive.style.display = 'none';
    }
});

const form = document.querySelector('#form');
form.addEventListener('submit', () => {
    sendIconDefault.style.display = 'block';
    sendIconActive.style.display = 'none';
});