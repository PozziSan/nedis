import InfoCommand from '../../src/command/InfoCommand';

describe('InfoCommand', () => {
    it('should return the correct info message', () => {
        const command = new InfoCommand(null);
        const result = command.execute();
        expect(result).toBe("Redis Version: That's NEDIS bro");
    });
});
