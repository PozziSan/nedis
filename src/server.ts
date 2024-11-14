import * as net from 'net';
import RESPParser from './RESPParser';

const PORT = 6379;

const server = net.createServer((socket) => {
    console.log("Client Connected!");

    socket.on('data', (data) => {
        const message = data.toString();
        console.log(`Message Received: ${message}`);

        const respParser = new RESPParser();
        const parsedMessage = respParser.parse(message);

        console.log(`Parsed Message is: ${parsedMessage}`);
        
        const response = parsedMessage[0] === 'PING' ? '+PONG\r\n' :  '-ERR unknown message';
        socket.write(response);
    });

    socket.on('end', () => console.log('Client Disconnected'));
    socket.on('error', (error) => console.log(`Error: ${error}`));
});

server.listen(PORT, () => console.log(`SERVER Listening on port ${PORT}`));
