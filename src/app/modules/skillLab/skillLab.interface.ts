import { Types } from 'mongoose';

export type TSkillStatus = 'not-attempted' | 'practicing' | 'achieved';

export type TSkillLab = {
    student: Types.ObjectId;
    skillName: string;
    category: string;
    status: TSkillStatus;
    assessedBy: Types.ObjectId;
    assessedDate?: Date;
    remarks?: string;
    isDeleted: boolean;
};
