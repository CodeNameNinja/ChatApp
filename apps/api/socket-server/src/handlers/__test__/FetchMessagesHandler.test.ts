import { type Socket } from 'socket.io'
import { FetchMessagesHandler } from '@handlers/FetchMessagesHandler'
import { verifyToken } from '@services/AuthenticationService'
import { mocked } from 'jest-mock'
import { seedMessages } from '../../test/seeders/messageSeeder'

jest.mock('@services/AuthenticationService', () => ({
	verifyToken: jest.fn(),
}))

describe('FetchMessagesHandler', () => {
	let fetchMessagesHandler: FetchMessagesHandler
	let mockSocket: Partial<Socket>

	beforeEach(async () => {
		fetchMessagesHandler = new FetchMessagesHandler()
		mockSocket = {
			emit: jest.fn(),
		}

		// Clear mocks
		mocked(verifyToken).mockClear()

		await seedMessages(5)
	})

	it('should emit messages on successful token verification', async () => {
		// Setup
		const testData = { token: 'validToken' }
		mocked(verifyToken).mockReturnValue({ username: 'testUser' })

		// Action
		await fetchMessagesHandler.handle(mockSocket as Socket, testData)

		// Assert
		expect(verifyToken).toHaveBeenCalledWith('validToken')
		// Check that the 'messages' event was emitted with an array of 5 messages
		expect(mockSocket.emit).toHaveBeenCalledWith('messages', expect.any(Array))

		const emitMock = mockSocket.emit as jest.Mock

		expect(emitMock).toHaveBeenCalledWith('messages', expect.any(Array))

		expect(emitMock.mock.calls[0][1].length).toBe(5)
	})

	it('should emit an error on failed token verification', async () => {
		// Setup
		const testData = { token: 'invalidToken' }
		mocked(verifyToken).mockReturnValue('Authentication failed')

		// Action
		await fetchMessagesHandler.handle(mockSocket as Socket, testData)

		// Assert
		expect(verifyToken).toHaveBeenCalledWith('invalidToken')
		expect(mockSocket.emit).toHaveBeenCalledWith('error', {
			message: 'Authentication failed',
		})
	})
})
