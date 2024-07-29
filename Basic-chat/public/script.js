const socket = io('http://localhost:8000', {
    auth: { token: 'dfsjakfhsadkjlfsadkf' },
    query: { ml: 42 }
});


document.getElementById('messages-form').addEventListener('submit', e => {
    e.preventDefault()
    const message = document.getElementById('user-message').value
    document.getElementById('user-message').value = ''
    socket.emit('messagefromClient', message)
})

socket.on('messageFromServer', msg => {
    document.getElementById('messages').innerHTML += `<li>${msg}</li>`
})