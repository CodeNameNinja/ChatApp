// src/handlers/chatHandler.ts
import { type Server as SocketIOServer, type Socket } from 'socket.io'
import { LoginHandler } from '@handlers/LoginHandler'
import { SendMessageHandler } from '@handlers/SendMessageHandler'
import { FetchMessagesHandler } from '@handlers/FetchMessagesHandler'
import { DeleteMessageHandler } from '@handlers/DeleteMessageHandler'
import type IHandler from '@interfaces/IHandler'

type HandlerConstructor = new () => IHandler

const handlerMap: Record<string, HandlerConstructor> = {
	login: LoginHandler,
	send_message: SendMessageHandler,
	fetch_messages: FetchMessagesHandler,
	delete_message: DeleteMessageHandler,
}

export const setupHandlers = (io: SocketIOServer, socket: Socket): void => {
	Object.keys(handlerMap).forEach((event) => {
		const HandlerClass = handlerMap[event]
		const handlerInstance = new HandlerClass()
		socket.on(event, async (data) => {
			await handlerInstance.handle(socket, data)
		})
	})
}
