import Memory from "../Memory";
import type { RESPReturnType } from "../types";

export default abstract class AbstractCommand {
    protected input: RESPReturnType
    protected memory: Memory

    public constructor(input: RESPReturnType, memory: Memory) {
        this.input = input;
        this.memory = memory;
    }

    public abstract execute(): RESPReturnType; 
}
