import { Socket } from 'socket.io';
import IHandler from '@interfaces/IHandler';
import { AuthenticationService } from '@services/AuthenticationService';
import { Message } from '@models/message';
export class DeleteMessageHandler implements IHandler {
    async handle(socket: Socket, data: { messageId: string; token: string }): Promise<void> {
        const { messageId, token } = data;
        const verificationResult = AuthenticationService.verifyToken(token);

        if (typeof verificationResult === 'string') {
            socket.emit('error', { message: 'Authentication failed' });
            return;
        }

        // Optionally, check if the user is authorized to delete the message
        // For example, by verifying if the user is the sender or an admin

        try {
            const result = await Message.findByIdAndDelete(messageId);
            if (result) {
                socket.to('mainRoom').emit('message_deleted', { messageId });
            } else {
                socket.emit('error', { message: 'Message not found or already deleted' });
            }
        } catch (error) {
            console.error('Delete message error:', error);
            socket.emit('error', { message: 'Failed to delete message' });
        }
    }
}
