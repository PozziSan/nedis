import * as net from 'net';
import RESPParser from './RESPParser';
import RESPSerializer from './RESPSerializer';

const PORT = 6379;

const server = net.createServer((socket) => {
    console.log("Client Connected!");

    socket.on('data', (data) => {
        const message = data.toString();
        console.log(`Message Received: ${message}`);

        const parser = new RESPParser();
        const serializer = new RESPSerializer();
        
        const parsedMessage = parser.parse(message);
        console.log(`Parsed Message is: ${parsedMessage}`);
        
        const response = parsedMessage[0] === 'PING' ? 'PONG' :  new Error('ERR unknown message');
        const serializedResponse = serializer.serialize(response);
        console.log(`Serialized Response is: ${serializedResponse}`);
        
        socket.write(serializedResponse);
    });

    socket.on('end', () => console.log('Client Disconnected'));
    socket.on('error', (error) => console.log(`Error: ${error}`));
});

server.listen(PORT, () => console.log(`SERVER Listening on port ${PORT}`));
