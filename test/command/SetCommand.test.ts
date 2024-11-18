import SetCommand from '../../src/command/SetCommand';
import Memory from '../../src/Memory';

describe('SetCommand', () => {
    let memory: Memory
    
    beforeEach(() => {
        memory = new Memory();
    });
    
    it('should store value under key in memory', () => {
        const key = 'foo';
        const value = 'bar';
        
        const command = new SetCommand([key, value], memory);
        const result = command.execute();
        expect(result).toBe('OK');

        const valueInMemory = memory.get(key);
        expect(valueInMemory).toBe(value);
    });

    it('should store array values under key in memory', () => {
        const key = 'foo';
        const value = ['bar', 1, 2, 3 , '4'];
        
        const command = new SetCommand([key, value], memory);
        const result = command.execute();
        expect(result).toBe('OK');

        const valueInMemory = memory.get(key);
        expect(valueInMemory).toBe(value);
    });

    it('should return error if no value is provided', () => {
        const command = new SetCommand('only key, no value', memory);
        const result = command.execute();
        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe("wrong number of arguments for 'set' command");
    });

    it('should return error if array of single value is provided', () => {
        const command = new SetCommand(['only key, no value'], memory);
        const result = command.execute();
        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe("wrong number of arguments for 'set' command");
    });

    it('should override current values for the same key if new one is provided', () => {
        const key = 'foo';
        const newValue = 'bar2';
        memory.set(key, 'bar');

        const command = new SetCommand([key, newValue], memory);
        const result = command.execute();
        expect(result).toBe('OK');

        const inMemoryNewValue = memory.get(key);
        expect(inMemoryNewValue).toBe(newValue);
    });
});
