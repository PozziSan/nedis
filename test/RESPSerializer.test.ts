import RESPSerializer from '../src/RESPSerializer';
import type { RESPReturnType } from '../src/types';

describe('RESPSerializer', () => {
    let serializer: RESPSerializer;

    beforeEach(() => {
        serializer = new RESPSerializer();
    });

    it('Should serialize a simple string', () => {
        const data = 'foobar';
        const result = serializer.serialize(data);
        expect(result).toBe('$6\r\nfoobar\r\n');
    });

    it('Should serialize an empty string', () => {
        const data = '';
        const result = serializer.serialize(data);
        expect(result).toBe('$0\r\n\r\n');
    });

    it('Should serialize a null value', () => {
        const data = null;
        const result = serializer.serialize(data);
        expect(result).toBe('$-1\r\n');
    });

    it('Should serialize an integer', () => {
        const data = 123;
        const result = serializer.serialize(data);
        expect(result).toBe(':123\r\n');
    });

    it('Should serialize an error', () => {
        const data = new Error('error message');
        const result = serializer.serialize(data);
        expect(result).toBe('-error message\r\n');
    });

    it('Should serialize an array of mixed types', () => {
        const data: RESPReturnType = ['foo', 123, null, new Error('error'), ['bar', 456]];
        const result = serializer.serialize(data);
        console.log(result);
        expect(result).toBe('*5\r\n$3\r\nfoo\r\n:123\r\n$-1\r\n-error\r\n*2\r\n$3\r\nbar\r\n:456\r\n');
    });

    it('Should serialize an array with empty content', () => {
        const data: RESPReturnType = [];
        const result = serializer.serialize(data);
        expect(result).toBe('*0\r\n');
    });

    it('Should serialize a string with binary data', () => {
        const binaryData = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05]).toString('binary');
        const result = serializer.serialize(binaryData);
        expect(result).toBe(`$6\r\n${binaryData}\r\n`);
    });
})