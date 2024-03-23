// SendMessageHandler.ts
import { Socket } from 'socket.io';
import IHandler from '@interfaces/IHandler';
import { Message } from '@models/message';
import { AuthenticationService } from '@services/AuthenticationService';
import jwt from 'jsonwebtoken';

export class SendMessageHandler implements IHandler {
    async handle(socket: Socket, data: { text: string; token: string }): Promise<void> {
        const verificationResult = AuthenticationService.verifyToken(data.token);

        if (typeof verificationResult !== 'string') {
            const username = (verificationResult as jwt.JwtPayload).username;

            if (!username) {
                socket.emit('error', { message: 'Authentication failed: Username not found in token' });
                return;
            }

            const message = new Message({ text: data.text, sender: username });
            await message.save();
            socket.to('mainRoom').emit('new_message', message);
        } else {
            socket.emit('error', { message: 'Authentication failed' });
        }
    }
}
