// El on es para escuchar y el emit es para hablar
var socket = io();

// Conectarse al servidor
socket.on('connect', function () {
    console.log('Conectado al servidor!');
});

// Detecta cuando se deconecta del servidor
socket.on('disconnect', function () {
    console.log('Conexión perdida con el servidor!');
});

// Enviar mensajes al servidor
socket.emit('enviarMensaje', {
    usuario: 'Esteban',
    mensaje: 'Hola Mundo!'
}, function (resp) {
    console.log('Respuesta servidor: ', resp);
});

// Escuchar al servidor
socket.on('saludo', data => {
    console.log(data);
});

socket.on('enviarMensaje', data => {
    console.log(data);
});