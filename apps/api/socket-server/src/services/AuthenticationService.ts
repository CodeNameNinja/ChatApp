import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET ?? 'asdf'

export const handleLogin = (
	username: string,
	password: string
): { success: boolean; message: string; token?: string } => {
	// For demonstration, using hardcoded credentials
	if (username === 'admin' && password === 'password') {
		// Generate a token
		const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' })
		return { success: true, message: 'Login successful', token }
	} else {
		return { success: false, message: 'Invalid credentials' }
	}
}

export const verifyToken = (token: string): jwt.JwtPayload | string => {
	try {
		return jwt.verify(token, SECRET_KEY)
	} catch (error) {
		return 'Token verification failed'
	}
}
