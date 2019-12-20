const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => { // Detectar cuando se conecte un nuevo cliente
    console.log('Usuario conectado!');

    client.on('disconnect', () => {
        console.log('Usuario desconectado!');
    });

    client.on('siguienteTicket', (data, callback) => {
        callback({
            ok: true,
            ticket: ticketControl.siguiente()
        });
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        client.broadcast.emit('ultimos4', ticketControl.ultimos4);

        callback(atenderTicket);
    })
});
