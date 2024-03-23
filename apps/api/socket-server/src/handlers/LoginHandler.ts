import { Socket } from 'socket.io';
import IHandler from '@interfaces/IHandler';
import { AuthenticationService } from '@services/AuthenticationService';

export class LoginHandler implements IHandler {
    async handle(socket: Socket, credentials: { username: string; password: string }): Promise<void> {
        const { username, password } = credentials;
        const result = AuthenticationService.handleLogin(username, password);
        if (result.success) {
            socket.emit('login_success', { message: result.message, token: result.token });
        } else {
            socket.emit('login_failed', { message: result.message });
        }
    }
}
