import { RESPReturnType } from '../types';
import AbstractCommand from './AbstractCommand';

export default class GetCommand extends AbstractCommand {
    private static isStringOrNumber(value: RESPReturnType): boolean {
        if (typeof value === 'string' || typeof value === 'number') return true

        return false;
    }
    
    private getKeyFromInput(): string | undefined {
        if (Array.isArray(this.input)) {
            if (this.input.length > 1) return;

            const [key] = this.input;
            if (!GetCommand.isStringOrNumber(key)) return;

            return key?.toString();
        }

        if (!GetCommand.isStringOrNumber(this.input)) return;

        return this.input?.toString();
    }
    
    public execute(): RESPReturnType {
        const memoryKey = this.getKeyFromInput();
        if (memoryKey === undefined) return new Error(`Invalid memory key for input ${this.input}`);

        const inMemoryValue = this.memory.get(memoryKey);
        if (inMemoryValue === undefined) return new Error('NOT FOUND');

        return inMemoryValue;
    }
}