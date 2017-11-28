const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/message')

const port = process.env.PORT || 3000
const app = express()

const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(path.join(__dirname, '..', 'public')))
io.on('connection', socket => {
  console.log('New user connected')

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

  socket.broadcast.emit('newMessage',
                        generateMessage('Admin', 'New user joined'))

  socket.on('createMessage', message => {
    console.log('Create message', message)
    io.emit('newMessage', generateMessage(message.from, message.text))
  })

  socket.on('disconnect', () => console.log('User was disconnected'))
})

server.listen(port, () => console.log(`Server is up on port ${port}`))
