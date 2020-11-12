const EventEmitter = require('events').EventEmitter
class AppEmitter extends EventEmitter {}

const event_manager = new AppEmitter()

// Ecouter sur l'event `new_user`
event_manager.on('new_user', (data, t) => {
    console.log('event received: new_user', { user: data })
    console.log('2e argument test', t)
})

// test d'event sur `new_user`
// event_manager.emit('new_user', { pseudo: 'test' }, 'second test')


// export l'event manager pour l'utiliser ailleurs
module.exports = event_manager