import RESPPArser from '../src/RESPParser';


describe('RESPParser', () => {
    let respParser;

    beforeAll(() => {
        respParser = new RESPPArser();
    });

    it('Should parse NULL bulk string', () => {
        const messages = respParser.parse('$-1\r\n');
        expect(messages).toEqual([null]);
    });

    it('Should parse simple array with 1 bulk string', () => {
        const messages = respParser.parse('*1\r\n$4\r\nping\r\n');
        expect(messages).toEqual([['ping']]);
    });

    it('Should parse array with multiple bulk strings', () => {
        const messages = respParser.parse('*2\r\n$4\r\necho\r\n$11\r\nhello world\r\n');
        expect(messages).toEqual([['echo', 'hello world']]);
    });

    it('Should parse array with command and key', () => {
        const messages = respParser.parse('*2\r\n$3\r\nget\r\n$3\r\nkey\r\n');
        expect(messages).toEqual([['get', 'key']]);
    });

    it('Should parse simple string', () => {
        const messages = respParser.parse('+OK\r\n');
        expect(messages).toEqual(['OK']);
    });

    it('Should parse error message', () => {
        const messages = respParser.parse('-Error message\r\n');
        expect(messages[0]).toBeInstanceOf(Error);
        expect(messages[0].message).toBe('Error message');
    });

    it('Should parse empty bulk string', () => {
        const messages = respParser.parse('$0\r\n\r\n');
        expect(messages).toEqual(['']);
    });

    it('Should parse simple string with text', () => {
        const messages = respParser.parse('+hello world\r\n');
        expect(messages).toEqual(['hello world']);
    });
})