import express from 'express'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { setupHandlers } from '@handlers/ChatHandler'
import connectToDatabase from './config/database'

const app = express()
const httpServer = createServer(app)
const io = new SocketIOServer(httpServer)

connectToDatabase()
	.then(() => {
		console.log('MongoDB Connected Successfully')
	})
	.catch(() => {
		console.log('MongoDB Connection Failed')
	})

io.on('connection', async (socket) => {
	console.log('A user connected')

	const defaultRoom = 'mainRoom'

	await socket.join(defaultRoom)

	setupHandlers(io, socket)

	socket.on('disconnect', async () => {
		console.log('User disconnected')
		await socket.leave(defaultRoom)
	})
})

const PORT = process.env.PORT ?? 3000
httpServer.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
