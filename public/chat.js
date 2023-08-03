

const socket = io.connect("http://localhost:3000");

const chat = document.getElementById('chat');

// const typingSignal = document.getElementById('isTyping')
const sendButton = document.getElementById('send');

const message = () =>  document.getElementById('message').value;
const username = () => document.getElementById('username').value;

const messageBox = document.getElementById('message');

let user = '';

const setNode = (data) => {
  const span = document.createElement('span');
  span.setAttribute('id', 'typing-bubble');
  span.innerHTML = '<span id="typing-bubble"> ' +data.response+ '</span>';
  chat.append(span);
}

messageBox.addEventListener('keyup', () => {
  console.log(message());
  socket.emit('typingSignal', {
    message: message(),
    response: username() + ' is typing...',
    username: username()
  })
})



sendButton.addEventListener('click', ()=> {

  user = username();

  socket.emit('sendMessage', {
    message: message(),
    username: username()
  });

  document.getElementById('typing-bubble')?.remove();
  document.getElementById('message').value = ''
})

socket.on('receiveMessage', data => {

  const them = data.username === user ? '' : 'them';
  const sender = them ? data.username : "You"

  document.getElementById('typing-bubble')?.remove();
  chat.innerHTML += '<div class="'+ them +' chat-bubble"><span>' + sender + '</span><p>'+data.message+ '</p></div>'
})

socket.on('typing', (data) => {

  if(data.message.length < 1){
    document.getElementById('typing-bubble')?.remove();
    return
  };
  
  if(data.message.length >= 1){
    if( document.getElementById('typing-bubble') ) return;
    setNode(data)
  }
  
})