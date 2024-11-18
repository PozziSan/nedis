import EchoCommand from '../../src/command/EchoCommand';
import Memory from '../../src/Memory';
import { RESPReturnType } from '../../src/types';

describe('EchoCommand', () => {
    let memory: Memory;

    beforeAll(() => {
        memory = new Memory();
    });

    it('should return the input as output', () => {
        const input: RESPReturnType = 'Hello, World!';
        const command = new EchoCommand(input, memory);
        const result = command.execute();
        expect(result).toBe(input);
    });

    it('should handle different types of input', () => {
        const inputs: RESPReturnType[] = [
            'Nedis FTW',
            42,
            null,
            new Error('Test error'),
            ['nested', 'array', 93]
        ];

        inputs.forEach(input => {
            const command = new EchoCommand(input, memory);
            const result = command.execute();
            expect(result).toBe(input);
        });
    });
});
