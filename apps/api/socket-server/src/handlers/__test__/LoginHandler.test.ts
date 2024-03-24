import { type Socket } from 'socket.io'
import { handleLogin } from '@services/AuthenticationService'

import { mocked } from 'jest-mock'
import { LoginHandler } from '@handlers/LoginHandler'

jest.mock('@services/AuthenticationService', () => ({
	handleLogin: jest.fn(),
}))
beforeEach(() => {
	mocked(handleLogin).mockClear()
})

describe('LoginHandler', () => {
	let loginHandler: LoginHandler
	let mockSocket: Partial<Socket>

	beforeEach(() => {
		loginHandler = new LoginHandler()
		mockSocket = {
			emit: jest.fn(),
		}
	})

	it('should emit login_success on successful login', async () => {
		// Setup
		const testCredentials = { username: 'testUser', password: 'testPass' }
		mocked(handleLogin).mockReturnValue({
			success: true,
			message: 'Success',
			token: 'fakeToken',
		})

		// Action
		await loginHandler.handle(mockSocket as Socket, testCredentials)

		// Assert
		expect(mockSocket.emit).toHaveBeenCalledWith('login_success', {
			message: 'Success',
			token: 'fakeToken',
		})
	})

	it('should emit login_failed on failed login', async () => {
		// Setup
		const testCredentials = { username: 'wrongUser', password: 'wrongPass' }
		mocked(handleLogin).mockReturnValue({ success: false, message: 'Failed' })

		// Action
		await loginHandler.handle(mockSocket as Socket, testCredentials)

		// Assert
		expect(mockSocket.emit).toHaveBeenCalledWith('login_failed', {
			message: 'Failed',
		})
	})
})
