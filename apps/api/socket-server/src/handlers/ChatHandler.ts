import {Server as SocketIOServer, Socket} from 'socket.io';
import {AuthenticationService} from '@services/AuthenticationService';
import {Message} from '@models/message';

class ChatHandler {
    private defaultRoom = 'mainRoom';

    constructor(private io: SocketIOServer, private socket: Socket) {
        this.registerHandlers();
    }

    private registerHandlers(): void {
        this.socket.on('login', this.handleLogin);
        this.socket.on('send_message', this.handleSendMessage);
        this.socket.on('fetch_messages', this.handleFetchMessages);
    }

    private handleLogin = async (credentials: { username: string; password: string }): Promise<void> => {
        const {username, password} = credentials;
        const result = AuthenticationService.handleLogin(username, password);
        if (result.success) {
            this.socket.join(this.defaultRoom);
            this.socket.emit('login_success', {message: result.message});
        } else {
            this.socket.emit('login_failed', {message: result.message});
        }
    };

    private handleSendMessage = async (data: { text: string; sender: string }): Promise<void> => {
        const message = Message.build({text: data.text, sender: data.sender});
        await message.save();
        this.io.to(this.defaultRoom).emit('new_message', message);
    };

    private handleFetchMessages = async (): Promise<void> => {
        const messages = await Message.find().sort({createdAt: -1}).limit(50);
        this.socket.emit('messages', messages);
    };
}

export default ChatHandler;
