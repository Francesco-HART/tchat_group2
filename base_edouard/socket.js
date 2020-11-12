const SocketIOServer = require('socket.io').Server

function ioConnectionHandler(socket) {
        let pseudo;
    
        console.log('Client connected', socket.id)
    
        socket.on('change_pseudo', (data) => {
            pseudo = data.pseudo
        })
    
        socket.on('send_message', (data) => {
            const packet_msg = {
                message: data.message,
                date: +new Date(),
                client: socket.id,
                pseudo: pseudo
            }
            io.emit('new_message', packet_msg)
            // socket.broadcast.emit('new_message', packet_msg)
        })
}

function initSocketServer(server) {
    const io = new SocketIOServer(server)

    io.on('connection', ioConnectionHandler)

    return io
}

exports.initSocketServer = initSocketServer