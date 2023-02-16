import express from 'express';
import path from 'path';
import __dirname from './util.js'
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';

//Declrando Express para usar sus funciones.
const app = express();


//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public')));

// Defino el engine de plantillas
app.engine('handlebars', handlebars.engine());

//Uso de vista de plantillas
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');

// Routes
app.use("/", viewsRouter);


//Arrancando el servidor:
const SERVER_PORT = 9090;
const httpServer = app.listen(SERVER_PORT, () => {
    console.log(`Servidor listo escuchando en el puerto: ${SERVER_PORT}`);
});

// Instancio el Websocket Server
const socketServer = new Server(httpServer);

socketServer.on("connection", socket => {

    const logs = [];

    socket.on("message", data => {
        logs.push({socketid: socket.id, message: data});
        socketServer.emit("log", { logs });
    })

});