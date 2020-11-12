const http = require('http')
const express = require('express')
const cors = require('cors')
const middlewares = require('./middlewares')
const router = require('./router')

function initExpressApp() {
    const app = express()

    app.disable('x-powered-by')

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(middlewares.printReq)

    // serve static files
    app.use(express.static('html'))
    // use our router
    app.use('/api', router)

    return app
}

function hookWithServer(app) {
    const server = http.createServer(app)
    return server
}

exports.initExpressApp = initExpressApp
exports.hookWithServer = hookWithServer
