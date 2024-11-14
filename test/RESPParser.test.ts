import RESPPArser from '../src/RESPParser';


describe('RESPParser', () => {
    let respParser: RESPPArser;

    beforeEach(() => {
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
        const [message] = respParser.parse('-Error message\r\n');
        expect(message).toBeInstanceOf(Error);
        expect((message as Error).message).toBe('Error message');
    });

    it('Should parse empty bulk string', () => {
        const messages = respParser.parse('$0\r\n\r\n');
        expect(messages).toEqual(['']);
    });

    it('Should parse simple string with text', () => {
        const messages = respParser.parse('+hello world\r\n');
        expect(messages).toEqual(['hello world']);
    });

    it('Should parse simple string with number', () => {
        const messages = respParser.parse(':1\r\n');
        expect(messages).toEqual([1]);
    });

    it('should parse a simple bulk string', () => {
        const data = '$6\r\nfoobar\r\n';
        const result = respParser.parse(data);
        expect(result).toEqual(['foobar']);
    });

    it('should parse a bulk string with empty content', () => {
        const data = '$0\r\n\r\n';
        const result = respParser.parse(data);
        expect(result).toEqual(['']);
    });

    it('should parse a null bulk string', () => {
        const data = '$-1\r\n';
        const result = respParser.parse(data);
        expect(result).toEqual([null]);
    });

    it('should parse multiple bulk strings in sequence', () => {
        const data = '$3\r\nfoo\r\n$3\r\nbar\r\n';
        const result = respParser.parse(data);
        expect(result).toEqual(['foo', 'bar']);
    });

    it('should handle incomplete bulk string and wait for more data', () => {
        const data1 = '$6\r\nfo';
        const data2 = 'obar\r\n';
        let result = respParser.parse(data1);
        expect(result).toEqual([]);
        result = respParser.parse(data2);
        expect(result).toEqual(['foobar']);
    });
})