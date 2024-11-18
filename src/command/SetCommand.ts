import type { RESPReturnType, MemoryType } from '../types';
import AbstractCommand from './AbstractCommand';

export default class SetCommand extends AbstractCommand {    
    private static isNullOrError(values: RESPReturnType): boolean {
        if (Array.isArray(values)) return SetCommand.isNullOrError(values[0]);
   
        if (values === null || values instanceof Error) return true;

        return false;
    }

    private parseValues(values: RESPReturnType[]): MemoryType  {
        if (values.some((value) => SetCommand.isNullOrError(value))) throw new Error('Values cannot be null or Error');

        if (values.length === 1)
            return values[0] as string | number;

        return values as string[] | number[];
    }

    public execute(): RESPReturnType {
        if (!Array.isArray(this.input) || (this.input as RESPReturnType[]).length !== 2) {
            return new Error("wrong number of arguments for 'set' command");
        }
        
        let valueToBeSaved: MemoryType;
        const [key, ...values] = this.input;        
        if (!key) return new Error("SET Command key must not be NULL");
        
        try {
            valueToBeSaved = this.parseValues(values);
        } catch (error) {
            if (error instanceof Error) return new Error(error.message);

            return new Error("Unknown Error while parsing values");
        }
        
        console.log(`Setting value: ${valueToBeSaved} to key: ${key}`);
        this.memory.set(key.toString(), valueToBeSaved);

        return "OK";
    }
}
