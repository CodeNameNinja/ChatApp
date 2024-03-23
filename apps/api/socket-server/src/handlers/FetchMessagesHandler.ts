import { Socket } from 'socket.io';
import IHandler from '@interfaces/IHandler';
import { Message } from '@models/message';

export class FetchMessagesHandler implements IHandler {
    async handle(socket: Socket): Promise<void> {
        const messages = await Message.find().sort({ createdAt: -1 }).limit(50);
        socket.emit('messages', messages);
    }
}
