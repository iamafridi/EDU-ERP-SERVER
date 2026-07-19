import { Schema, model } from 'mongoose';
import {
    TMealMenu,
    TMealPlan,
    TMealFeedback,
    TMessBill,
} from './mess.interface';
import { DaysOfWeek, MealTypes, MealPlanTypes } from './mess.constant';

const mealMenuSchema = new Schema<TMealMenu>(
    {
        day: { type: String, enum: DaysOfWeek, required: true },
        mealType: { type: String, enum: MealTypes, required: true },
        items: [{ type: String, trim: true }],
        date: { type: Date },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

mealMenuSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
mealMenuSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const mealPlanSchema = new Schema<TMealPlan>(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
            unique: true,
        },
        plan: { type: String, enum: MealPlanTypes, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

mealPlanSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
mealPlanSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const mealFeedbackSchema = new Schema<TMealFeedback>(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        menu: {
            type: Schema.Types.ObjectId,
            ref: 'MealMenu',
            required: true,
        },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, trim: true },
        date: { type: Date, required: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

mealFeedbackSchema.index({ student: 1 });

mealFeedbackSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
mealFeedbackSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const messBillSchema = new Schema<TMessBill>(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        month: { type: Number, required: true, min: 1, max: 12 },
        year: { type: Number, required: true },
        totalMeals: { type: Number, required: true },
        ratePerMeal: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
        paid: { type: Boolean, default: false },
        paidAt: { type: Date },
        dueDate: { type: Date, required: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

messBillSchema.index({ student: 1 });

messBillSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
messBillSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const MealMenu = model<TMealMenu>('MealMenu', mealMenuSchema);
export const MealPlan = model<TMealPlan>('MealPlan', mealPlanSchema);
export const MealFeedback = model<TMealFeedback>(
    'MealFeedback',
    mealFeedbackSchema,
);
export const MessBill = model<TMessBill>('MessBill', messBillSchema);
