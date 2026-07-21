import { Schema, model } from 'mongoose';
import { TMessage, TConversation } from './chat.interface';

const messageSchema = new Schema<TMessage>(
    {
        conversation: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
        sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true, trim: true },
        attachments: [
            {
                name: { type: String, required: true },
                url: { type: String, required: true },
                _id: false,
            },
        ],
        readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

messageSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
messageSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const conversationSchema = new Schema<TConversation>(
    {
        participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
        lastMessage: { type: String, trim: true },
        lastMessageAt: { type: Date },
        lastMessageBy: { type: Schema.Types.ObjectId, ref: 'User' },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

conversationSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
conversationSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Message = model<TMessage>('Message', messageSchema);
export const Conversation = model<TConversation>('Conversation', conversationSchema);
