class Users{
    
    constructor(){
        this.users =[];
    }

    connectUser(id, name, room){
        let user = {id, name, room}

        this.users.push(user);

        return this.users;
    }

    get getUsers(){
        return this.users;
    }

    getUser(id){
        
        return this.users.filter( user => user.id === id)[0];
    }

    disconnectUser(id){
        const deletedUser = this.getUser(id);

        this.users = this.users.filter( user => user.id !== id);

        return deletedUser;

    }

    getUsersByRoom(room){
        return this.users.filter( user => user.room === room);
    }
}

module.exports = { Users};