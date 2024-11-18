import type { MemoryType, MemoryMapType } from "./types";

export default class Memory {
    private memory: MemoryMapType;

    public constructor() {
        this.memory = new Map();
    }

    public get(key: string): MemoryType | undefined {
        return this.memory.get(key);
    }

    public set(key: string, value: MemoryType) {
        this.memory.set(key, value);
    }
}
