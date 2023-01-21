const { io } = require('../server');
const {Users} = require('../classes/users')
const { createMsg } = require('../helpers/utils');

const user = new Users()

io.on('connection', (client) => {

    client.on('enter-chat', (data, callback) =>{

        if(!data.name || !data.room){
            
            return callback({
                error: true,
                msg: 'The name/romm is required'
            });
        }

        client.join(data.room)
        
        user.connectUser(client.id, data.name, data.room);

        client.broadcast.to(data.room).emit('users-list', user.getUsersByRoom(data.room));
        callback(user.getUsersByRoom(data.room));


    });

    client.on('user-logout' , (data) =>{
        const usr = user.getUser(client.id);
        
        const msg = createMsg(usr.name, data.msg);
        client.broadcast.to(usr.room).emit('user-logout', msg)
    });

    client.on('disconnect', ()=>{
        const disconnectedUser = user.disconnectUser(client.id);

        client.broadcast.to(disconnectedUser.room).emit('user-logout', createMsg('Administrador', `${disconnectedUser.name} has leave the chat`));
        client.broadcast.to(disconnectedUser.room).emit('users-list', user.getUsersByRoom(disconnectedUser.room));
    });

    client.on('private-msg', (data) =>{
        const userchat = user.getUser(client.id);

        client.broadcast.to(data.for).emit('private-msg', {msg: data.msg, from:userchat.name})

    });

});