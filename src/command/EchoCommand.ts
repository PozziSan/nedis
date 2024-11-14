import { RESPReturnType } from '../types';
import AbstractCommand from './AbstractCommand';

export default class EchoCommand extends AbstractCommand {
    public execute(): RESPReturnType {
        return this.input;
    }
}