import type { RESPReturnType } from "../types";

export default abstract class Command {
    protected input: RESPReturnType

    public constructor(input: RESPReturnType) {
        this.input = input;
    }

    public abstract execute(): RESPReturnType; 
}
