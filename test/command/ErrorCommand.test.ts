import ErrorCommand from '../../src/command/ErrorCommand';
import { RESPReturnType } from '../../src/types';

describe('ErrorCommand', () => {
    it('should return an error with the correct message', () => {
        const input: RESPReturnType = 'INVALID_COMMAND';
        const command = new ErrorCommand(input);
        const result = command.execute();
        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe(`Unknown command for input ${input}`);
    });

    it('should handle different types of input', () => {
        const inputs: RESPReturnType[] = [
            'INVALID_COMMAND',
            42,
            null,
            new Error('Test error'),
            ['nested', 'array', 93]
        ];

        inputs.forEach(input => {
            const command = new ErrorCommand(input);
            const result = command.execute();
            expect(result).toBeInstanceOf(Error);
            expect((result as Error).message).toBe(`Unknown command for input ${input}`);
        });
    });
});
