import {Socket} from 'socket.io';

interface IHandler {
    handle(socket: Socket, data?: any): Promise<void>;
}

export default IHandler;
