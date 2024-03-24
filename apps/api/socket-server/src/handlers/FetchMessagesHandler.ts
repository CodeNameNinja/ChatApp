import { type Socket } from 'socket.io'
import type IHandler from '@interfaces/IHandler'
import { Message } from '@models/message'
import { verifyToken } from '@services/AuthenticationService'

export class FetchMessagesHandler implements IHandler {
	async handle(socket: Socket, data: { token: string }): Promise<void> {
		const verificationResult = verifyToken(data.token)
		if (typeof verificationResult === 'string') {
			socket.emit('error', { message: 'Authentication failed' })
			return
		}

		const messages = await Message.find().sort({ createdAt: -1 }).limit(50)
		socket.emit('messages', messages)
	}
}
