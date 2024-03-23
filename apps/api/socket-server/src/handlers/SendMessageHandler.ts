import { Socket } from 'socket.io';
import IHandler from '@interfaces/IHandler';
import { Message } from '@models/message';
import { AuthenticationService } from '@services/AuthenticationService';

export class SendMessageHandler implements IHandler {
    async handle(socket: Socket, data: { text: string; sender: string; token: string }): Promise<void> {
        const verificationResult = AuthenticationService.verifyToken(data.token);
        if (typeof verificationResult === 'string') {
            socket.emit('error', { message: 'Authentication failed' });
            return;
        }

        const message = new Message({ text: data.text, sender: data.sender });
        await message.save();
        socket.to('mainRoom').emit('new_message', message);
    }
}
