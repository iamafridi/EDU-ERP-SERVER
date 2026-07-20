import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { PharmacySearchableFields } from './pharmacy.constant';
import { TDrug, TPrescription, TDispensing } from './pharmacy.interface';
import { Drug, Prescription, Dispensing } from './pharmacy.model';

const createDrugIntoDB = async (payload: TDrug) => {
    const result = await Drug.create(payload);
    return result;
};

const getAllDrugsFromDB = async (query: Record<string, unknown>) => {
    const drugQuery = new QueryBuilder(Drug.find(), query)
        .search(PharmacySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await drugQuery.modelQuery;
    const meta = await drugQuery.countTotal();
    return { data, meta };
};

const getLowStockDrugsFromDB = async () => {
    const result = await Drug.find({
        $expr: { $lte: ['$stock', '$reorderLevel'] },
    }).sort({ stock: 1 });
    return result;
};

const getSingleDrugFromDB = async (id: string) => {
    const result = await Drug.findById(id);
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Drug not found');
    return result;
};

const updateDrugIntoDB = async (id: string, payload: Partial<TDrug>) => {
    const result = await Drug.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Drug not found');
    return result;
};

const deleteDrugFromDB = async (id: string) => {
    const result = await Drug.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Drug not found');
    return result;
};

const createPrescriptionIntoDB = async (payload: TPrescription) => {
    const result = await Prescription.create(payload);
    return result;
};

const getAllPrescriptionsFromDB = async (query: Record<string, unknown>) => {
    const prescriptionQuery = new QueryBuilder(
        Prescription.find().populate('patientId doctorId drugs.drugId'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await prescriptionQuery.modelQuery;
    const meta = await prescriptionQuery.countTotal();
    return { data, meta };
};

const getPatientPrescriptionsFromDB = async (patientId: string) => {
    const result = await Prescription.find({ patientId })
        .populate('doctorId drugs.drugId')
        .sort({ date: -1 });
    return result;
};

const createDispensingIntoDB = async (payload: TDispensing) => {
    const result = await Dispensing.create(payload);
    // Decrease stock for each drug in the prescription
    const prescription = await Prescription.findById(payload.prescriptionId).populate('drugs.drugId');
    if (prescription) {
        for (const drugItem of prescription.drugs) {
            await Drug.findByIdAndUpdate(drugItem.drugId, {
                $inc: { stock: -1 },
            });
        }
    }
    return result;
};

const getAllDispensingsFromDB = async (query: Record<string, unknown>) => {
    const dispensingQuery = new QueryBuilder(
        Dispensing.find().populate({
            path: 'prescriptionId',
            populate: [{ path: 'patientId' }, { path: 'doctorId' }],
        }),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await dispensingQuery.modelQuery;
    const meta = await dispensingQuery.countTotal();
    return { data, meta };
};

export const PharmacyServices = {
    createDrugIntoDB,
    getAllDrugsFromDB,
    getLowStockDrugsFromDB,
    getSingleDrugFromDB,
    updateDrugIntoDB,
    deleteDrugFromDB,
    createPrescriptionIntoDB,
    getAllPrescriptionsFromDB,
    getPatientPrescriptionsFromDB,
    createDispensingIntoDB,
    getAllDispensingsFromDB,
};
