import { Server as SocketIOServer, Socket } from 'socket.io';
import IHandler from '@interfaces/IHandler';
import { LoginHandler } from '@handlers/LoginHandler';
import { SendMessageHandler } from '@handlers/SendMessageHandler';
import { FetchMessagesHandler } from '@handlers/FetchMessagesHandler';
import { DeleteMessageHandler } from '@handlers/DeleteMessageHandler';

class ChatHandler {
    private handlerMap: { [key: string]: IHandler } = {};

    constructor(private io: SocketIOServer, private socket: Socket) {
        this.handlerMap['login'] = new LoginHandler();
        this.handlerMap['send_message'] = new SendMessageHandler();
        this.handlerMap['fetch_messages'] = new FetchMessagesHandler();
        this.handlerMap['delete_message'] = new DeleteMessageHandler();

        this.registerHandlers();
    }

    private registerHandlers(): void {
        Object.keys(this.handlerMap).forEach((event) => {
            this.socket.on(event, (data) => this.handlerMap[event].handle(this.socket, data));
        });
    }
}

export default ChatHandler;
