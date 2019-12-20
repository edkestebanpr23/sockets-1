var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function () {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('Desconectado del servidor');
});

$('button').on('click', function () {
    console.log('click');
    socket.emit('siguienteTicket', null, function (resp) {
        // console.log(resp);
        if (resp.ok == true) {
            label.text(resp.ticket);
        }
    });
});

socket.on('estadoActual', function (resp) {
    console.log('Estado actual', resp);
    label.text(resp.ticket);
});