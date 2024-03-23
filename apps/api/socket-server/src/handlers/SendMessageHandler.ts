import { Socket } from 'socket.io';
import IHandler from '@interfaces/IHandler';
import { Message } from '@models/message';

export class SendMessageHandler implements IHandler {
    async handle(socket: Socket, data: { text: string; sender: string; token: string }): Promise<void> {
        // Token validation logic here
        const message = new Message({ text: data.text, sender: data.sender });
        await message.save();
        socket.to('mainRoom').emit('new_message', message); // Adjust as necessary
    }
}
