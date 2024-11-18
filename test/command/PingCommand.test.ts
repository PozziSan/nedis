import PingCommand from '../../src/command/PingCommand';

describe('PingCommand', () => {
    it('should return PONG', () => {
        const command = new PingCommand(null);
        const result = command.execute();
        expect(result).toBe('PONG');
    });
});
