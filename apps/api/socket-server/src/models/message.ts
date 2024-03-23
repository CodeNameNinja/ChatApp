import IMessage from '@interfaces/IMessage'
import mongoose from 'mongoose'


interface MessageModel extends mongoose.Model<MessageDoc> {
    build(attrs: IMessage): MessageDoc
}


interface MessageDoc extends mongoose.Document {
    text: string,
    sender: string,
}

const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        sender: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform(_, ret) {
                ret.id = ret._id
                delete ret._id
            },
        },
    }
)


messageSchema.statics.build = (attrs: IMessage) => {
    return new Message(attrs)
}

const Message = mongoose.model<MessageDoc, MessageModel>('Message', messageSchema)

export {Message, MessageDoc}
