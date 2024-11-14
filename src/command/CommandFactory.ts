import { RESPReturnType } from "../types"
import AbstractCommand from "./AbstractCommand";
import EchoCommand from "./EchoCommand"
import ErrorCommand from "./ErrorCommand";
import InfoCommand from "./InfoCommand";
import PingCommand from "./PingCommand";


export const commandFactory = (command: string, input: RESPReturnType): AbstractCommand => {
    command = command.toUpperCase();
    
    switch (command) {
        case 'ECHO':
            return new EchoCommand(input);
        case 'PING':
            return new PingCommand(input);
        case 'INFO':
            return new InfoCommand(input);
        default:
            return new ErrorCommand(input);
    }
};