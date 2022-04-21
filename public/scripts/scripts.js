const socket = io();
const chatForm = document.getElementById('chat');
const nicknameForm = document.getElementById('nickname');
const input = document.getElementById('input');
const nicknameInput = document.getElementById('nickname-input');


// if (window.location.pathname === '/') {
//     nicknameForm.addEventListener('submit', (event) => {
//         if (nicknameInput.value) {
//             nickname = nicknameInput.value
//             socket.emit('send-nickname', nickname);
//             nicknameInput.value = '';
//         }
//     });
// }

if (window.location.pathname === '/chat') {

    const username = new URLSearchParams(window.location.search).get('nickname')

    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (input.value) {
            socket.emit('chat-message', {
                msg: input.value,
                nickname: username
            });
            input.value = '';
        }
    });

    console.log(username);


    socket.on('chat-message', (msg) => {
        const item = document.createElement('li');
        console.log(msg);
        item.textContent = `${msg.nickname}: ${msg.msg}`;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('connected', (msg) => {
        const item = document.createElement('li');
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('disconnected', (msg) => {
        const item = document.createElement('li');
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });

}