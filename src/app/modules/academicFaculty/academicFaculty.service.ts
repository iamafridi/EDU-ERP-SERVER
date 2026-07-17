import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    // Checking for faculty with same name already exists
    const existingFaculty = await AcademicFaculty.findOne({
        name: payload.name,
    });

    if (existingFaculty) {
        throw new AppError(httpStatus.CONFLICT, 'Faculty with this name already exists');
    }

    const result = await AcademicFaculty.create(payload);
    return result;
};

const getAllAcademicFacultiesFromDB = async () => {
    const result = await AcademicFaculty.find();
    return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
    const result = await AcademicFaculty.findById(id);
    return result;
};

const updateAcademicFacultyIntoDB = async (
    id: string,
    payload: Partial<TAcademicFaculty>,
) => {
    const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteAcademicFacultyFromDB = async (id: string) => {
    const result = await AcademicFaculty.findByIdAndDelete(id);
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found');
    return result;
};

export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB,
    deleteAcademicFacultyFromDB,
};