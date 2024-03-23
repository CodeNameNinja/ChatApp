import { Socket } from 'socket.io';
import { SendMessageHandler } from '@handlers/SendMessageHandler';
import { AuthenticationService } from '@services/AuthenticationService';
import { Message } from '@models/message';

jest.mock('@services/AuthenticationService', () => ({
    AuthenticationService: {
        verifyToken: jest.fn()
    }
}));

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
        expect(mockSocket.to).toHaveBeenCalledWith('mainRoom');
        expect(mockSocket.emit).not.toHaveBeenCalledWith('error', expect.any(Object));

        const messages = await Message.find();
        expect(messages).toHaveLength(1);
        expect(messages[0].text).toBe('Hello, world!');
        expect(messages[0].sender).toBe('testUser');
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
