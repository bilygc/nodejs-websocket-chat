var params = new URLSearchParams(window.location.search);

const divUsuarios = $('#divUsuarios');
const frmMsg = $('#frmMsg');
const txtMsg = $('#txtMsg');
const divChatbox = $('#divChatbox');

var name = params.get('nombre');
var room = params.get('sala');

const renderUsers = (users)=>{
    let html = '';

    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span>'+ params.get('sala') +' </span></a>';
    html += '</li>';

    for(let i =0; i < users.length; i++ ){

        html += '<li>';
        html += '<a data-id="'+ users[i].id +'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+ users[i].name +' <small class="text-success">online</small></span></a>';
        html += '</li>';

    }

    divUsuarios.html(html)
}

divUsuarios.on('click', 'a', function (){
    var id = $(this).data('id');
    
    if(id){
        console.log(id)
    }
});

frmMsg.on('submit', function(e){
    e.preventDefault()

    const msg = txtMsg.val().trim();

    if(msg === 0){
        return;
    }
    
    // Enviar información
    socket.emit('create-msg', {
        name,
        msg
    }, function(msg) {
        txtMsg.val('');
        renderMsgs(msg, true);
        scrollBottom();
    });

});

function renderMsgs(msg, I){
    let html ='';

    let date = new Date(msg.date);
    let chatTime = date.getHours()+':'+date.getMinutes();

    let adminClass = 'info';

    if(msg.name === 'Administrator'){
        adminClass = 'danger'
    }

    if(I){
        
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>'+msg.name+'</h5>';
        html += '        <div class="box bg-light-inverse">'+msg.msg+'</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">'+chatTime+'</div>';
        html += '</li>';

    }else{

        html += '<li class="animated fadeIn">';
        if(msg.name !== 'Administrator'){
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '    <div class="chat-content">';
        html += '        <h5>'+msg.name+'</h5>';
        html += '        <div class="box bg-light-'+adminClass+'">'+msg.msg+'</div>';
        html += '    </div>';
        html += '    <div class="chat-time">'+chatTime+'</div>';
        html += '</li>';
    }

    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}