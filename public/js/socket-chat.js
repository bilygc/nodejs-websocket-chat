var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')){
    window.location = 'index.html';
    throw new Error('The name and room are required');
}

var name = params.get('nombre');
var room = params.get('sala')

const data = {name, room};

socket.on('connect', function() {
    
    socket.emit('enter-chat', data, (users) =>{
        if(users.error){
            console.error(users.msg);
        }
        renderUsers(users)
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('create-msg', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('create-msg', function(msg) {
    renderMsgs(msg)
    scrollBottom();
});

socket.on('private-msg', function(msg) {

    console.log('private msg :', msg);

});

socket.on('users-list', function(usersList) {

    //console.log('Usuarios conectados :', usersList);
    renderUsers(usersList);


});