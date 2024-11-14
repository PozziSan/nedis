import net from 'net';
import readline from 'readline';
import RESPSerializer from '../RESPSerializer';
import type { RESPReturnType } from '../types';

const HOST = 'localhost';
const PORT = 6379;

const serializer = new RESPSerializer();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'nedis> '
});

const client = net.createConnection({ host: HOST, port: PORT }, () => {
    console.log(`Connected to NEDIS in ${HOST}/${PORT}`);
    console.log('Welcome to NEDIS! Insert a Command');
    rl.prompt();
});

client.on('data', (data) => {
    console.log('NEDIS Response:', data.toString());
    rl.prompt();
});

client.on('end', () => {
    console.log('Disconnecting from NEDIS');
    process.exit(0);
});

rl.on('line', (line) => {
    try {
        // Split comment and args by space, considering that args inside "" must be considered single arg
        const [command, ...args] = line.match(/(?:[^\s"]+|"[^"]*")+/g) || [];

        if (command === undefined) throw new Error('Command must not be Empty!');

        // Create the RESP array with the command and arguments
        const respArray: RESPReturnType[] = [command, ...args.map(arg => arg.replace(/"/g, ''))];
        const serializedMessage = serializer.serialize(respArray);
        console.log(`Serialized Message is: ${serializedMessage}`);

        client.write(serializedMessage);
    } catch (error) {
        console.error(`Error: ${error}`);
    }

    rl.prompt();
});
rl.on('close', () => process.exit(0));
