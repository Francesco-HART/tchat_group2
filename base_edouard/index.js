const { initExpressApp, hookWithServer } = require('./webserver')

const app = initExpressApp()
const server = hookWithServer(app)

server.listen(4021, () => {
    console.log('Listening on http://localhost:4021')
})


