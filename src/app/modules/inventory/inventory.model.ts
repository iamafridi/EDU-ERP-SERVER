import { Schema, model } from 'mongoose';
import { TInventoryItem } from './inventory.interface';
import { InventoryCategory, ItemCondition } from './inventory.constant';

const inventorySchema = new Schema<TInventoryItem>(
    {
        name: { type: String, required: true, trim: true },
        category: {
            type: String,
            enum: InventoryCategory,
            required: true,
        },
        room: { type: Schema.Types.ObjectId, ref: 'Room' },
        quantity: { type: Number, required: true, min: 0 },
        condition: {
            type: String,
            enum: ItemCondition,
            default: 'new',
        },
        notes: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

inventorySchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
inventorySchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Inventory = model<TInventoryItem>(
    'Inventory',
    inventorySchema,
);
