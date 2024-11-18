import Memory from "../Memory";
import { RESPReturnType } from "../types";
import AbstractCommand from "./AbstractCommand";
import EchoCommand from "./EchoCommand";
import ErrorCommand from "./ErrorCommand";
import GetCommand from "./GetCommand";
import InfoCommand from "./InfoCommand";
import PingCommand from "./PingCommand";
import SetCommand from "./SetCommand";


export const commandFactory = (command: string, input: RESPReturnType, memory: Memory): AbstractCommand => {
    command = command.toUpperCase();
    
    switch (command) {
        case 'ECHO':
            return new EchoCommand(input, memory);
        case 'PING':
            return new PingCommand(input, memory);
        case 'INFO':
            return new InfoCommand(input, memory);
        case 'SET':
            return new SetCommand(input, memory);
        case 'GET':
            return new GetCommand(input, memory);
        default:
            return new ErrorCommand(input, memory);
    }
};