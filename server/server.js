const express = require('express');
const path = require('path');
const socketIO = require('socket.io'); // Libreria socket
/**
 * El socket no funciona con express, hay que usar el servidor default de node que es 'http' pero como argumento a este
 * servidor se le puede pasar el app de express con sus configuraciones y funcionaria todo exactamente igual...
 */
const http = require('http');
const app = express();
let server = http.createServer(app);

/**
 * __dirname me dice donde estoy y el ../public para ir a esa carpeta.
 * El path se usa para volver la ruta en un string valido y no el "/server../public" ya que esa ruta no existe
 */
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

/** 
 * ************** Socket **************
 */
module.exports.io = socketIO(server); // Creando el socket
require('./sockets/socket');



/**
 * Aquí no se usa el app de expres sino el server de http
 */
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${port}`);

});