import { Message } from '@models/message'

export const seedMessages = async (
	messagesToGenerate: number
): Promise<void> => {
	const messageTemplates = [
		{ text: 'Hello, world!', sender: 'John Doe' },
		{ text: 'How are you?', sender: 'Jane Doe' },
		{ text: 'Welcome to the chat app.', sender: 'Admin' },
		{ text: 'This is a seeded message.', sender: 'Seeder' },
		{ text: 'Goodbye!', sender: 'John Doe' },
	]

	for (let i = 0; i < messagesToGenerate; i++) {
		const templateIndex = i % messageTemplates.length
		const messageTemplate = messageTemplates[templateIndex]

		const messageText = `${messageTemplate.text} (${i + 1})`
		const newMessage = new Message({
			text: messageText,
			sender: messageTemplate.sender,
		})

		await newMessage.save()
	}

	console.log(`Database seeded with ${messagesToGenerate} messages.`)
}
