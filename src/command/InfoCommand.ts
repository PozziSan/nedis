import { RESPReturnType } from '../types';
import AbstractCommand from './AbstractCommand';

export default class InfoCommand extends AbstractCommand {
    public execute(): RESPReturnType {
        return "Redis Version: That's NEDIS bro";
    }
}