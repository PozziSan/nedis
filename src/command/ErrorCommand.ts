import { RESPReturnType } from '../types';
import AbstractCommand from './AbstractCommand';

export default class ErrorCommand extends AbstractCommand {
    public execute(): RESPReturnType {
        return new Error(`Unknown command for input ${this.input}`);
    }
}