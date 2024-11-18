import GetCommand from '../../src/command/GetCommand';
import Memory from '../../src/Memory';

describe('GetCommand', () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory();
    });

    it('should get existent key in memory', () => {
        const key = 'foo';
        const value = 'bar';
        memory.set(key, value);

        const command = new GetCommand(key, memory);
        const result = command.execute();
        expect(result).toBe(value);
    });

    it('should get existent key in memory if key is only member of array', () => {
        const key = 'foo';
        const value = 'bar';
        memory.set(key, value);

        const command = new GetCommand([key], memory);
        const result = command.execute();
        expect(result).toBe(value);
    })
})