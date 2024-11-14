import type { RESPReturnType } from "./types";

export default class RESPSerializer {
    public serialize(data: RESPReturnType): string {
        if (typeof data === 'string') return this.serializeString(data);
        else if (typeof data === 'number') return this.serializeNumber(data);
        else if (data === null) return this.serializeNull();
        else if (data instanceof Error) return this.serializeError(data);
        else if (Array.isArray(data)) return this.serializeArray(data);

        throw new Error(`Data type of message: ${data} is not supported`);
    }

    private serializeString(data: string): string {
        return `$${data.length}\r\n${data}\r\n`;
    }

    private serializeNumber(data: number): string {
        return `:${data}\r\n`;
    }

    private serializeNull(): string {
        return '$-1\r\n';
    }

    private serializeError(data: Error): string {
        return `-${data.message}\r\n`;
    }

    private serializeArray(data: RESPReturnType[]): string {
        const serializedElements = data.map(element => this.serialize(element)).join('');
        return `*${data.length}\r\n${serializedElements}`;
    }
}