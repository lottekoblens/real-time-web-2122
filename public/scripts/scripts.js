const socket = io();

if (window.location.pathname === '/game') {
    const chatForm = document.getElementById('chat');
    const input = document.getElementById('input');
    const score = document.getElementById('score');
    const button = document.getElementById('skip-button');

    const username = new URLSearchParams(window.location.search).get('nickname')

    chatForm.addEventListener('submit', (event) => {
        event.preventDefault(); // prevents the default of refreshing the page
        if (input.value) {
            socket.emit('chat-message', {
                msg: input.value,
                nickname: username
            });
            input.value = '';
        }
    });

    socket.emit('connected', {
        nickname: username
    });

    socket.emit('userconnect', username);

    socket.on('userconnect', (username) => {
        const item = document.createElement('li');
        item.textContent = `${username.nickname} has connected`
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
    });

    socket.on('chat-message', (msg) => {
        const name = document.createElement('li');
        const item = document.createElement('p')
        name.textContent = `${msg.nickname}`
        item.textContent = `${msg.msg}`; // show the username and the message of the user in the chat
        messages.appendChild(name);
        name.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
    });

    socket.on('connected', (nickname) => {
        const item = document.createElement('li');
        item.textContent = `${nickname} has connected`
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
    });

    socket.on('movie', (movie) => {
        const img = document.getElementById('movieImg')
        const description = document.getElementById('movieDescription')
        img.src = `${movie.img}`
        // img.src = `https://image.tmdb.org/t/p/w500/${movie.img}`
        description.textContent = `${movie.description}`
    })

    socket.on('scoreboard', (users) => {
        // first empty the scoreboard
        score.innerHTML = '';

        const scoreTitle = document.querySelector('.score h2')
        scoreTitle.innerHTML = `Score:`

        // then add users with their score
        users.forEach(user => {
            const userScores = document.createElement('li');
            userScores.textContent = `${user.nickname}: ${user.score} points`
            score.appendChild(userScores);
        })
    });

    button.addEventListener('click', () => {
        socket.emit('skip-movie')
    })

    //when the button of skip movie is clicked there will be send a message in the chat
    socket.on('skip-movie', () => {
        const item = document.createElement('li');
        item.textContent = `The movie is skipped`;
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
    });

    socket.on('disconnected', (nickname) => {
        if (nickname.nickname === 'transport close') {
            const item = document.createElement('li');
            item.textContent = `a user has disconnected`;
        } else {
            const item = document.createElement('li');
            item.textContent = `${nickname.nickname} has disconnected`;
            messages.appendChild(item);
            messages.scrollTop = messages.scrollHeight;
        }
    });

}