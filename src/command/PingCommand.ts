import { RESPReturnType } from '../types';
import AbstractCommand from './AbstractCommand';

export default class PingCommand extends AbstractCommand {
    public execute(): RESPReturnType {
        return 'PONG';
    }
}