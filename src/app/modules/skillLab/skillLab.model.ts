import { Schema, model } from 'mongoose';
import { TSkillLab } from './skillLab.interface';
import { SkillStatuses } from './skillLab.constant';

const skillLabSchema = new Schema<TSkillLab>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        skillName: { type: String, required: true, trim: true },
        category: { type: String, required: true, trim: true },
        status: { type: String, enum: SkillStatuses, default: 'not-attempted' },
        assessedBy: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
        assessedDate: { type: Date },
        remarks: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

skillLabSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
skillLabSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const SkillLab = model<TSkillLab>('SkillLab', skillLabSchema);
