import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TAttendance } from './attendance.interface';
import { Attendance } from './attendance.model';
import { Faculty } from '../faculty/faculty.model';

const createAttendanceIntoDB = async (payload: TAttendance) => {
    const existing = await Attendance.findOne({
        student: payload.student,
        course: payload.course,
        date: payload.date,
    });
    if (existing) {
        throw new AppError(
            httpStatus.CONFLICT,
            'Attendance already marked for this student on this date',
        );
    }
    const result = await Attendance.create(payload);
    return result;
};

const bulkCreateAttendanceIntoDB = async (
    payload: { course: string; date: Date; records: { student: string; status: string }[] },
    facultyUserId: string,
    academicSemesterId: string,
) => {
    const faculty = await Faculty.findOne({ user: facultyUserId });
    if (!faculty) throw new AppError(httpStatus.NOT_FOUND, 'Faculty profile not found');

    const attendanceRecords = payload.records.map((r) => ({
        student: r.student,
        course: payload.course,
        faculty: faculty._id.toString(),
        academicSemester: academicSemesterId,
        date: payload.date,
        status: r.status,
    }));

    const result = await Attendance.insertMany(attendanceRecords, {
        ordered: false,
    });
    return result;
};

const getAllAttendanceFromDB = async (query: Record<string, unknown>) => {
    const attendanceQuery = new QueryBuilder(
        Attendance.find().populate('student course faculty academicSemester'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await attendanceQuery.modelQuery;
    const meta = await attendanceQuery.countTotal();
    return { data, meta };
};

const getSingleAttendanceFromDB = async (id: string) => {
    const result = await Attendance.findById(id).populate('student course faculty academicSemester');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Attendance record not found');
    return result;
};

const getAttendanceReportFromDB = async (query: {
    student?: string;
    course?: string;
    academicSemester?: string;
}) => {
    const filter: Record<string, unknown> = { isDeleted: false };
    if (query.student) filter.student = query.student;
    if (query.course) filter.course = query.course;
    if (query.academicSemester) filter.academicSemester = query.academicSemester;

    const records = await Attendance.find(filter).populate('student course');
    const total = records.length;
    const present = records.filter((r) => r.status === 'present').length;
    const absent = records.filter((r) => r.status === 'absent').length;
    const late = records.filter((r) => r.status === 'late').length;
    const leave = records.filter((r) => r.status === 'leave').length;
    const percentage = total > 0 ? ((present + late) / total) * 100 : 0;

    return {
        total,
        present,
        absent,
        late,
        leave,
        percentage: Math.round(percentage * 100) / 100,
        lowAttendance: percentage < 75,
        records,
    };
};

const updateAttendanceIntoDB = async (id: string, payload: Partial<TAttendance>) => {
    const result = await Attendance.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Attendance record not found');
    return result;
};

const deleteAttendanceFromDB = async (id: string) => {
    const result = await Attendance.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Attendance record not found');
    return result;
};

const bulkDateRangeCreateAttendanceIntoDB = async (
    payload: {
        course: string;
        startDate: string;
        endDate: string;
        students: { student: string; status: string }[];
    },
    facultyUserId: string,
) => {
    const faculty = await Faculty.findOne({ user: facultyUserId });
    if (!faculty) throw new AppError(httpStatus.NOT_FOUND, 'Faculty profile not found');

    const start = new Date(payload.startDate);
    const end = new Date(payload.endDate);
    const days: Date[] = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        days.push(new Date(d));
    }

    const records: {
        student: string;
        course: string;
        faculty: string;
        date: Date;
        status: string;
    }[] = [];

    for (const date of days) {
        for (const s of payload.students) {
            records.push({
                student: s.student,
                course: payload.course,
                faculty: faculty._id.toString(),
                date,
                status: s.status,
            });
        }
    }

    const result = await Attendance.insertMany(records, { ordered: false });
    return result;
};

export const AttendanceServices = {
    createAttendanceIntoDB,
    bulkCreateAttendanceIntoDB,
    bulkDateRangeCreateAttendanceIntoDB,
    getAllAttendanceFromDB,
    getSingleAttendanceFromDB,
    getAttendanceReportFromDB,
    updateAttendanceIntoDB,
    deleteAttendanceFromDB,
};
