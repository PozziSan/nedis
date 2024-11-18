import EchoCommand from '../../src/command/EchoCommand';
import { RESPReturnType } from '../../src/types';

describe('EchoCommand', () => {
    it('should return the input as output', () => {
        const input: RESPReturnType = 'Hello, World!';
        const command = new EchoCommand(input);
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
            const command = new EchoCommand(input);
            const result = command.execute();
            expect(result).toBe(input);
        });
    });
});
