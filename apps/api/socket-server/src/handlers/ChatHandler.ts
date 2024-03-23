import { Server as SocketIOServer, Socket } from 'socket.io';
import { AuthenticationService } from '@services/AuthenticationService';

class ChatHandler {
    private io: SocketIOServer;
    private socket: Socket;

    constructor(io: SocketIOServer, socket: Socket) {
        this.io = io;
        this.socket = socket;
        this.registerHandlers();
    }

    private registerHandlers(): void {
        this.socket.on('login', this.handleLogin);
    }

    private handleLogin = (credentials: { username: string; password: string }): void => {
        const { username, password } = credentials;
        const result = AuthenticationService.handleLogin(username, password);
        if (result.success) {
            this.socket.emit('login_success', { message: result.message });
        } else {
            this.socket.emit('login_failed', { message: result.message });
        }
    };
}
