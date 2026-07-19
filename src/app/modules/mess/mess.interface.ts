import { Types } from 'mongoose';

export type TMealType = 'breakfast' | 'lunch' | 'snacks' | 'dinner';

export type TMealMenu = {
    day: string;
    mealType: TMealType;
    items: string[];
    date?: Date;
    isDeleted: boolean;
};

export type TMealPlanType = 'vegetarian' | 'non-vegetarian' | 'vegan';

export type TMealPlan = {
    student: Types.ObjectId;
    plan: TMealPlanType;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    isDeleted: boolean;
};

export type TMealFeedback = {
    student: Types.ObjectId;
    menu: Types.ObjectId;
    rating: number;
    comment?: string;
    date: Date;
    isDeleted: boolean;
};

export type TMessBill = {
    student: Types.ObjectId;
    month: number;
    year: number;
    totalMeals: number;
    ratePerMeal: number;
    totalAmount: number;
    paid: boolean;
    paidAt?: Date;
    dueDate: Date;
    isDeleted: boolean;
};
