import { commandFactory } from "./command/CommandFactory";

import type { RESPReturnType } from "./types";

export default class Executor {
    private static executeCommand(command: string, input: RESPReturnType) {
        const commandObject = commandFactory(command, input);
        return commandObject.execute();
    }

    private static isValidInput(nedisMessage: RESPReturnType): Boolean {
        if (!Array.isArray(nedisMessage) && typeof nedisMessage !== 'string') 
            return false

        return !(nedisMessage as RESPReturnType[]).some((input) => {
            if (typeof input !== 'string' || typeof input !== 'number')
                return false;

            return true;
        });
    }
    
    public static execute(messages: RESPReturnType[]): RESPReturnType {
        const nedisMessage: RESPReturnType = messages[0];
        let command: string | undefined;
        let input: RESPReturnType;

        if (!Array.isArray(nedisMessage)) {
            if (typeof nedisMessage !== 'string') return new Error('Command needs to be string');

            command = nedisMessage;
            input = '';
            
            return this.executeCommand(command, input);
        }
        
        command = typeof nedisMessage[0] === 'string' ? nedisMessage[0] : undefined;
        if (command === undefined) return new Error('Command needs to be string');
        if (!this.isValidInput(nedisMessage)) return new Error('Invalid input');

        input = nedisMessage.slice(1);
        
        return this.executeCommand(command, input);
    }
}