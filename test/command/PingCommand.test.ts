import PingCommand from '../../src/command/PingCommand';
import Memory from '../../src/Memory';

describe('PingCommand', () => {
    it('should return PONG', () => {
        const command = new PingCommand(null, new Memory());
        const result = command.execute();
        expect(result).toBe('PONG');
    });
});
