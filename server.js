const http = require('http')
const app = require('./app')
const socketio = require('socket.io')

const port = process.env.PORT || '8080'

app.set('port', port)
const server = http.createServer(app)
const io = socketio.listen(server)
app.set('socketIo', io)

server.listen(port, () => console.log('Server listenning on:', port))
