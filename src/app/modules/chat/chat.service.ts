import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ChatSearchableFields } from './chat.constant';
import { TMessage, TConversation } from './chat.interface';
import { Message, Conversation } from './chat.model';

const createConversationIntoDB = async (payload: TConversation) => {
    const existing = await Conversation.findOne({
        participants: { $all: payload.participants, $size: payload.participants.length },
        isDeleted: { $ne: true },
    });
    if (existing) return existing;
    const result = await Conversation.create(payload);
    return result;
};

const getUserConversationsFromDB = async (userId: string) => {
    const result = await Conversation.find({
        participants: userId,
        isDeleted: { $ne: true },
    })
        .populate('participants', 'email role')
        .sort({ lastMessageAt: -1, updatedAt: -1 });
    return result;
};

const sendMessageIntoDB = async (payload: TMessage) => {
    const conversation = await Conversation.findById(payload.conversation);
    if (!conversation) throw new AppError(httpStatus.NOT_FOUND, 'Conversation not found');

    const result = await Message.create(payload);

    await Conversation.findByIdAndUpdate(payload.conversation, {
        lastMessage: payload.content,
        lastMessageAt: new Date(),
        lastMessageBy: payload.sender,
    });

    return result;
};

const getConversationMessagesFromDB = async (
    conversationId: string,
    query: Record<string, unknown>,
) => {
    const msgQuery = new QueryBuilder(
        Message.find({ conversation: conversationId })
            .populate('sender', 'email role')
            .populate('readBy', 'email role'),
        query,
    )
        .search(ChatSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await msgQuery.modelQuery;
    const meta = await msgQuery.countTotal();
    return { data, meta };
};

const markMessagesAsReadIntoDB = async (conversationId: string, userId: string) => {
    const result = await Message.updateMany(
        { conversation: conversationId, readBy: { $ne: userId } },
        { $addToSet: { readBy: userId } },
    );
    return result;
};

const deleteConversationFromDB = async (id: string) => {
    const result = await Conversation.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Conversation not found');
    return result;
};

const deleteMessageFromDB = async (id: string) => {
    const result = await Message.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Message not found');
    return result;
};

export const ChatServices = {
    createConversationIntoDB,
    getUserConversationsFromDB,
    sendMessageIntoDB,
    getConversationMessagesFromDB,
    markMessagesAsReadIntoDB,
    deleteConversationFromDB,
    deleteMessageFromDB,
};
