const express = require('express')
const http = require('http')
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT

        // Http server
        this.server = http.createServer(this.app);

        // Configuracion de sockets
        this.io = socketio(this.server, { /* Configuraciones */ })
    }

    middlewares(){
        //Desplegar el directorio público
        this.app.use(express.static(path.resolve(__dirname, '../public')))
    }

    configurateSockets(){
        new Sockets(this.io)
    }

    execute(){

        // Inicializar middlewares
        this.middlewares()

        // Configurar sockets
        this.configurateSockets()

        // Inicializar Server
        this.server.listen(this.port, () => {
            console.log("Server corriendo en puerto:", this.port);
        });
    }
}

module.exports = Server