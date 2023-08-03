const express = require('express');
const socket = require('socket.io');

const app = express()

const server = app.listen(3000, ()=> {
  console.log('listening at port 3000');
});

app.use(express.static('public'));

const rtc = socket(server);

rtc.on("connection", socket => {
  console.log("Socket established...", socket.id)
  socket.on('sendMessage', data => {
    console.log(data)
    rtc.emit('receiveMessage', data)
  })

  socket.on('typingSignal', data => {
    rtc.emit('typing', data)
  })
})