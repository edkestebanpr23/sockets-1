const { io } = require('../server');

io.on('connection', (client) => { // Detectar cuando se conecte un nuevo cliente
    console.log('Usuario conectado!');

    client.on('disconnect', () => {
        console.log('Usuario desconectado!');
    });

    client.on('enviarMensaje', (data, callback) => {

        // callback({
        //     ok: true,
        //     mensaje: 'Recibido con éxito!'
        // });
        // console.log(data);

        client.broadcast.emit('enviarMensaje', data);
    });

    client.emit('saludo', "Bienvenido al servicio!");
});
