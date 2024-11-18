import InfoCommand from '../../src/command/InfoCommand';
import Memory from '../../src/Memory';

describe('InfoCommand', () => {
    it('should return the correct info message', () => {    
        const command = new InfoCommand(null, new Memory());
        const result = command.execute();
        expect(result).toBe("Redis Version: That's NEDIS bro");
    });
});
