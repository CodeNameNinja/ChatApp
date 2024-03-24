import { type Socket } from 'socket.io'
import type IHandler from '@interfaces/IHandler'
import { Message } from '@models/message'
import { verifyToken } from '@services/AuthenticationService'

export class SendMessageHandler implements IHandler {
	async handle(
		socket: Socket,
		data: { text: string; token: string }
	): Promise<void> {
		const verificationResult = verifyToken(data.token)

		if (typeof verificationResult !== 'string') {
			const username = verificationResult.username

			if (username === null || username === undefined) {
				socket.emit('error', {
					message: 'Authentication failed: Username not found in token',
				})
				return
			}

			const message = new Message({ text: data.text, sender: username })
			await message.save()
			socket.to('mainRoom').emit('new_message', message)
		} else {
			socket.emit('error', { message: 'Authentication failed' })
		}
	}
}
