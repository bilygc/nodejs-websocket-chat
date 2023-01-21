var socket = io();

const params = new URLSearchParams(window.location.search);

if(!params.has('name') || !params.has('room')){
    window.location = 'index.html';
    throw new Error('The name and room are required');
}

const name = params.get('name');
const room = params.get('room')

const data = {name, room};

socket.on('connect', function() {
    
    socket.emit('enter-chat', data, (users) =>{
        if(users.error){
            console.error(users.msg);
        }
        console.log('users connected:', users);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('user-logout', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('user-logout', function(user) {

    console.log('Admin:', user);

});

socket.on('private-msg', function(msg) {

    console.log('private msg :', msg);

});

socket.on('users-list', function(usersList) {

    console.log('Usuarios conectados :', usersList);

});