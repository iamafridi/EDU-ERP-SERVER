import { Types } from 'mongoose';

export type TMessage = {
    conversation: Types.ObjectId;
    sender: Types.ObjectId;
    content: string;
    attachments?: { name: string; url: string }[];
    readBy: Types.ObjectId[];
    isDeleted: boolean;
};

export type TConversation = {
    participants: Types.ObjectId[];
    lastMessage?: string;
    lastMessageAt?: Date;
    lastMessageBy?: Types.ObjectId;
    isDeleted: boolean;
};
