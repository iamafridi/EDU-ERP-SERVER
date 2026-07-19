import { Schema, model } from 'mongoose';
import { TVehicle, TTransportRoute, TTransportFee, TRouteStop } from './transport.interface';
import { VehicleStatus } from './transport.constant';

const vehicleSchema = new Schema<TVehicle>(
    {
        vehicleNumber: { type: String, required: true, unique: true, trim: true },
        registrationNumber: { type: String, required: true, unique: true, trim: true },
        model: { type: String, required: true, trim: true },
        capacity: { type: Number, required: true },
        driverName: { type: String, required: true, trim: true },
        driverContact: { type: String, required: true, trim: true },
        status: { type: String, enum: VehicleStatus, default: 'active' },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

vehicleSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
vehicleSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const routeStopSchema = new Schema<TRouteStop | object>(
    {
        stopName: { type: String, required: true, trim: true },
        arrivalTime: { type: String, required: true },
        order: { type: Number, required: true },
    },
    { _id: false },
);

const transportRouteSchema = new Schema<TTransportRoute>(
    {
        routeName: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
        stops: { type: [routeStopSchema], required: true },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

transportRouteSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
transportRouteSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const transportFeeSchema = new Schema<TTransportFee>(
    {
        route: { type: Schema.Types.ObjectId, ref: 'TransportRoute', required: true },
        amount: { type: Number, required: true },
        academicYear: { type: String, required: true },
        semester: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

transportFeeSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
transportFeeSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Vehicle = model<TVehicle>('Vehicle', vehicleSchema);
export const TransportRoute = model<TTransportRoute>('TransportRoute', transportRouteSchema);
export const TransportFee = model<TTransportFee>('TransportFee', transportFeeSchema);
