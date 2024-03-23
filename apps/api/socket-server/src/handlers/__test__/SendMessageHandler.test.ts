import { Socket } from 'socket.io';
import { SendMessageHandler } from '@handlers/SendMessageHandler';
import { AuthenticationService } from '@services/AuthenticationService';
import { Message } from '@models/message';

describe('SendMessageHandler', () => {
    let handler: SendMessageHandler;
    let mockSocket: Partial<Socket>;

    beforeEach(() => {
        handler = new SendMessageHandler();

        // Reset mocks
        jest.clearAllMocks();

        // Setup a mock socket
        mockSocket = {
            emit: jest.fn(),
            to: jest.fn().mockReturnThis()
        };
    });

    it('should send a message on valid token', async () => {
        // Setup
        const testData = { text: 'Hello, world!', token: 'validToken' };
        (AuthenticationService.verifyToken as jest.Mock).mockReturnValue({ username: 'testUser' });

        // Action
        await handler.handle(mockSocket as Socket, testData);

        // Assert
        expect(AuthenticationService.verifyToken).toHaveBeenCalledWith('validToken');
        expect(Message.build).toHaveBeenCalledWith({ text: 'Hello, world!', sender: 'testUser' });
        // expect(Message.save).toHaveBeenCalled();
        expect(mockSocket.to).toHaveBeenCalledWith('mainRoom');
        expect(mockSocket.to).toHaveBeenCalledWith('mainRoom');
        expect(mockSocket.emit).not.toHaveBeenCalledWith('error', expect.any(Object));
    });

    it('should emit an error on invalid token', async () => {
        // Setup
        const testData = { text: 'Hello, world!', token: 'invalidToken' };
        (AuthenticationService.verifyToken as jest.Mock).mockReturnValue('Authentication failed');

        // Action
        await handler.handle(mockSocket as Socket, testData);

        // Assert
        expect(AuthenticationService.verifyToken).toHaveBeenCalledWith('invalidToken');
        expect(mockSocket.emit).toHaveBeenCalledWith('error', { message: 'Authentication failed' });
    });
});
