import {Socket} from 'socket.io';
import IHandler from '@interfaces/IHandler';
import {Message} from '@models/message';
import {AuthenticationService} from '@services/AuthenticationService';

export class FetchMessagesHandler implements IHandler {
    async handle(socket: Socket, data: { token: string }): Promise<void> {

        const verificationResult = AuthenticationService.verifyToken(data.token);
        if (typeof verificationResult === 'string') {
            socket.emit('error', {message: 'Authentication failed'});
            return;
        }

        const messages = await Message.find().sort({createdAt: -1}).limit(50);
        socket.emit('messages', messages);
    }
}
