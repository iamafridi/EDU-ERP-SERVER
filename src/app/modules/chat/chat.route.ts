import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ChatControllers } from './chat.controller';
import { ChatValidations } from './chat.validation';

const router = express.Router();

router.post(
    '/conversations',
    auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
    validateRequest(ChatValidations.createConversationValidationSchema),
    ChatControllers.createConversation,
);
router.get(
    '/conversations',
    auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
    ChatControllers.getUserConversations,
);
router.delete(
    '/conversations/:id',
    auth('super-admin', 'domain-admin'),
    ChatControllers.deleteConversation,
);

router.post(
    '/messages',
    auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
    validateRequest(ChatValidations.sendMessageValidationSchema),
    ChatControllers.sendMessage,
);
router.get(
    '/messages/:conversationId',
    auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
    ChatControllers.getConversationMessages,
);
router.patch(
    '/messages/:conversationId/read',
    auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
    ChatControllers.markMessagesAsRead,
);
router.delete(
    '/messages/:id',
    auth('super-admin', 'domain-admin'),
    ChatControllers.deleteMessage,
);

export const ChatRoutes = router;
