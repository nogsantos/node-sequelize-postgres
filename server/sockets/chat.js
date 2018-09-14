/**
* Eventos para o chat Socket.io
*/
(function(){
    "use strict";
    module.exports = function (io) {
        
        var sockets = io.sockets;
        // Evento que acontece quando um novo cliente se conecta no servidor.
        sockets.on('connection', function (client) {
            console.log('a user connected');
        });
    };

}());
