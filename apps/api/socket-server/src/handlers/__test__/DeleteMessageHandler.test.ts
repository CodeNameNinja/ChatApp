import { type Socket } from 'socket.io'
import { verifyToken } from '@services/AuthenticationService'
import { Message } from '@models/message'
import { mocked } from 'jest-mock'
import { DeleteMessageHandler } from '@handlers/DeleteMessageHandler'

jest.mock('@services/AuthenticationService', () => ({
	verifyToken: jest.fn(),
}))

jest.mock('@models/message', () => ({
	Message: {
		findByIdAndDelete: jest.fn(),
	},
}))

describe('DeleteMessageHandler', () => {
	let deleteMessageHandler: DeleteMessageHandler
	let mockSocket: Partial<Socket>
	beforeEach(() => {
		deleteMessageHandler = new DeleteMessageHandler()
		mockSocket = {
			emit: jest.fn(),
			to: jest.fn().mockReturnThis(),
		}

		// Clear mocks
		mocked(verifyToken).mockClear()
		mocked(Message.findByIdAndDelete).mockClear()
	})

	it('should emit message_deleted on successful deletion', async () => {
		// Setup
		const testData = { messageId: 'validMessageId', token: 'validToken' }
		mocked(verifyToken).mockReturnValue({ username: 'testUser' })
		mocked(Message.findByIdAndDelete).mockResolvedValue({
			_id: 'validMessageId',
		}) // Simulate found and deleted

		// Action
		await deleteMessageHandler.handle(mockSocket as Socket, testData)

		// Assert
		expect(verifyToken).toHaveBeenCalledWith('validToken')
		expect(Message.findByIdAndDelete).toHaveBeenCalledWith('validMessageId')
		expect(mockSocket.to).toHaveBeenCalledWith('mainRoom')
		expect(mockSocket.emit).toHaveBeenCalledWith('message_deleted', {
			messageId: 'validMessageId',
		})
	})

	it('should emit error on failed token verification', async () => {
		// Setup
		const testData = { messageId: 'anyMessageId', token: 'invalidToken' }
		mocked(verifyToken).mockReturnValue('Authentication failed')

		// Action
		await deleteMessageHandler.handle(mockSocket as Socket, testData)

		// Assert
		expect(mockSocket.emit).toHaveBeenCalledWith('error', {
			message: 'Authentication failed',
		})
	})

	it('should emit error when message not found or already deleted', async () => {
		// Setup
		const testData = { messageId: 'missingMessageId', token: 'validToken' }
		mocked(verifyToken).mockReturnValue({ username: 'testUser' })
		mocked(Message.findByIdAndDelete).mockResolvedValue(null) // Simulate not found

		// Action
		await deleteMessageHandler.handle(mockSocket as Socket, testData)

		// Assert
		expect(Message.findByIdAndDelete).toHaveBeenCalledWith('missingMessageId')
		expect(mockSocket.emit).toHaveBeenCalledWith('error', {
			message: 'Message not found or already deleted',
		})
	})
})
