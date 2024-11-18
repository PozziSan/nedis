import * as net from 'net';

import Executor from './Executor';
import Memory from './Memory';
import RESPParser from './RESPParser';
import RESPSerializer from './RESPSerializer';

const PORT = 6379;
const memory = new Memory();

const server = net.createServer((socket) => {
    console.log("Client Connected!");

    socket.on('data', (data) => {
        const message = data.toString();
        console.log(`Message Received: ${message}`);
        
        const parser = new RESPParser();
        const serializer = new RESPSerializer();
        const executor = new Executor(memory);
        
        try {    
            const parsedMessages = parser.parse(message);
            console.log(`Parsed Message is: ${parsedMessages}`);
            
            const response = executor.execute(parsedMessages);
            const serializedResponse = serializer.serialize(response);
            console.log(`Serialized Response is: ${serializedResponse}`);
            
            socket.write(serializedResponse);
        } catch (error) {
            console.log(`Error while processing data: ${error}`);

            const errorMessage = serializer.serialize(new Error('Unknown Error'));
            socket.write(errorMessage);

        }
    });

    socket.on('end', () => console.log('Client Disconnected'));
    socket.on('error', (error) => console.log(`Error: ${error}`));
});

server.listen(PORT, () => console.log(`SERVER Listening on port ${PORT}`));
