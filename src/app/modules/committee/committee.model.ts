import { Schema, model } from 'mongoose';
import { TCommittee, TCommitteeMember } from './committee.interface';
import { CommitteeTypes } from './committee.constant';

const committeeMemberSchema = new Schema<TCommitteeMember>(
    {
        member: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        role: { type: String, required: true, trim: true },
    },
    { _id: false },
);

const committeeSchema = new Schema<TCommittee>(
    {
        name: { type: String, required: true, trim: true },
        type: { type: String, enum: CommitteeTypes, required: true },
        members: [committeeMemberSchema],
        description: { type: String, trim: true },
        convenor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

committeeSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
committeeSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Committee = model<TCommittee>('Committee', committeeSchema);
