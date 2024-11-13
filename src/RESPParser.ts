type RESPReturnType = string | number | null | Error | RESPReturnType[];


export default class RESPParser {
    private buffer: string;

    public constructor() {
        this.buffer = '';
    }

    public parse(data: string): RESPReturnType[] {
        this.buffer += data;
        const messages: RESPReturnType[] = [];

        while (this.buffer.length > 0) {
            const message = this.parseMessage();

            if (message === undefined) break;

            messages.push(message);
        }
        
        return messages;
    }

    private parseMessage(): RESPReturnType | undefined {
        if (this.buffer.length === 0) return;

        const messageTypeIndicator = this.buffer[0];

        switch (messageTypeIndicator) {
            case '+':
                return this.parseSimpleString();
            case '-':
                return this.parseError();
            case ':':
                return this.parseInteger();
            case '$':
                return this.parseBulkString();
            case '*':
                return this.parseArray();
            default:
                throw new Error(`Operator ${messageTypeIndicator} does not exist in RESP Specification`);
        }
    }

    private getEndIndex(): number {
        // RESP Messages always end with `\r\n`
        return this.buffer.indexOf('\r\n');
    }

    private getMessageAndSliceIndex(startIndex: number, endIndex: number): string {
        const message = this.buffer.slice(startIndex, endIndex);
        
        // endIndex + 2 because message always ends with `\r\n`, i.e.: 2 characters in the string.
        this.buffer = this.buffer.slice(endIndex + 2);

        return message;
    }

    private parseSimpleString(): string | undefined {
        const endIndex = this.getEndIndex();

        if (endIndex === -1) return;

        return this.getMessageAndSliceIndex(1, endIndex);
    }

    private parseError(): Error | undefined {
        const endIndex = this.getEndIndex();

        if (endIndex === -1) return;

        const message = this.getMessageAndSliceIndex(1, endIndex);

        return new Error(message);
    }

    private parseInteger(): number | undefined {
        const endIndex = this.getEndIndex();

        if (endIndex === -1) return;

        const message = this.getMessageAndSliceIndex(1, endIndex);

        return Number.parseInt(message);
    }

    private parseBulkString(): string | null | undefined {
        const endIndex = this.getEndIndex();

        if (endIndex === -1) return;

        const length = Number.parseInt(this.buffer.slice(1, endIndex), 10);

        // If the content of the message is -1 we return null once that it means empty null string
        if (length === -1) {
            this.buffer = this.buffer.slice(endIndex + 2);
            
            return null;
        }

        const bulkStartIndex = endIndex + 2;
        const bulkEndIndex = bulkStartIndex + length;

        // If there's no enough characters in the actual end of the bulk string
        // that means that the bulk string is incomplete. Therefore we return.
        if (this.buffer.length < bulkEndIndex + 2) {
            return;
        }

        return this.getMessageAndSliceIndex(bulkStartIndex, bulkEndIndex);
    }

    private parseArray(): RESPReturnType[] | undefined {
        const endIndex = this.getEndIndex();

        if (endIndex === -1) return;

        const length = Number.parseInt(this.buffer.slice(1, endIndex), 10);
        const messages: RESPReturnType[] = [];
        this.buffer = this.buffer.slice(endIndex + 2);

        for (let i = 0; i < length; i++) {
            const message = this.parseMessage();

            if (message === undefined) return;

            messages.push(message);
        }

        return messages;
    }
}