import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ChatServices } from './chat.service';
import { emitToUser } from '../../utils/socket';
import { Conversation } from './chat.model';

const createConversation = catchAsync(async (req, res) => {
    const result = await ChatServices.createConversationIntoDB(req.body);
    if (result) {
        (result.participants || []).forEach((pId: any) => {
            if (pId.toString() !== req.user?.userId) {
                emitToUser(pId.toString(), 'new-conversation', result);
            }
        });
    }
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Conversation created successfully',
        data: result,
    });
});

const getUserConversations = catchAsync(async (req, res) => {
    const userId = req.user?.userId;
    const result = await ChatServices.getUserConversationsFromDB(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Conversations retrieved successfully',
        data: result,
    });
});

const sendMessage = catchAsync(async (req, res) => {
    const payload = { ...req.body, sender: req.user?.userId };
    const result = await ChatServices.sendMessageIntoDB(payload);
    const conversation = await Conversation.findById(payload.conversation).select('participants');
    if (conversation) {
        conversation.participants.forEach((pId: any) => {
            if (pId.toString() !== req.user?.userId) {
                emitToUser(pId.toString(), 'new-message', {
                    conversation: payload.conversation,
                    message: result,
                });
            }
        });
    }
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Message sent successfully',
        data: result,
    });
});

const getConversationMessages = catchAsync(async (req, res) => {
    const { conversationId } = req.params;
    const result = await ChatServices.getConversationMessagesFromDB(conversationId, req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Messages retrieved successfully',
        data: result,
    });
});

const markMessagesAsRead = catchAsync(async (req, res) => {
    const { conversationId } = req.params;
    const userId = req.user?.userId;
    const result = await ChatServices.markMessagesAsReadIntoDB(conversationId, userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Messages marked as read',
        data: result,
    });
});

const deleteConversation = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ChatServices.deleteConversationFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Conversation deleted successfully',
        data: result,
    });
});

const deleteMessage = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ChatServices.deleteMessageFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Message deleted successfully',
        data: result,
    });
});

export const ChatControllers = {
    createConversation,
    getUserConversations,
    sendMessage,
    getConversationMessages,
    markMessagesAsRead,
    deleteConversation,
    deleteMessage,
};
