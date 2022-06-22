const server = require('./socketConfig')
const http = require('./bin/bin')
server.attach(http)