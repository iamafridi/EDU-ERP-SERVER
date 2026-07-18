import { Student } from '../student/student.model';
import { Faculty } from '../faculty/faculty.model';
import { Fee } from '../fee/fee.model';
import { Attendance } from '../attendance/attendance.model';
import { Room } from '../room/room.model';

const getAdminDashboardFromDB = async () => {
    const totalStudents = await Student.countDocuments({ isDeleted: false });
    const totalFaculty = await Faculty.countDocuments({ isDeleted: false });
    const totalRevenue = await Fee.aggregate([
        { $match: { isDeleted: false } },
        { $group: { _id: null, total: { $sum: '$paidAmount' } } },
    ]);
    const pendingDues = await Fee.aggregate([
        { $match: { isDeleted: false, status: { $ne: 'paid' } } },
        { $group: { _id: null, total: { $sum: '$dueAmount' } } },
    ]);
    const totalRooms = await Room.countDocuments({ isDeleted: false });

    return {
        metrics: [
            { label: 'Total Students', value: totalStudents },
            { label: 'Total Faculty', value: totalFaculty },
            {
                label: 'Total Revenue Collected',
                value: totalRevenue[0]?.total || 0,
            },
            {
                label: 'Pending Dues',
                value: pendingDues[0]?.total || 0,
            },
            { label: 'Total Rooms', value: totalRooms },
        ],
    };
};

const getStudentDashboardFromDB = async (userId: string) => {
    const student = await Student.findOne({ user: userId, isDeleted: false });
    if (!student) return { metrics: [] };

    const feeRecord = await Fee.findOne({ student: student._id, isDeleted: false });
    const attendanceRecords = await Attendance.countDocuments({
        student: student._id,
        isDeleted: false,
    });
    const presentRecords = await Attendance.countDocuments({
        student: student._id,
        present: true,
        isDeleted: false,
    });

    return {
        metrics: [
            {
                label: 'Total Fee',
                value: feeRecord?.totalAmount || 0,
            },
            {
                label: 'Paid Amount',
                value: feeRecord?.paidAmount || 0,
            },
            {
                label: 'Due Amount',
                value: feeRecord?.dueAmount || 0,
            },
            {
                label: 'Attendance %',
                value: attendanceRecords > 0
                    ? Math.round((presentRecords / attendanceRecords) * 100)
                    : 0,
            },
        ],
    };
};

const getFacultyDashboardFromDB = async (userId: string) => {
    const faculty = await Faculty.findOne({ user: userId, isDeleted: false });
    if (!faculty) return { metrics: [] };

    return {
        metrics: [
            { label: 'Courses Assigned', value: faculty.academicDepartment ? 1 : 0 },
        ],
    };
};

const getAccountantDashboardFromDB = async () => {
    const totalCollected = await Fee.aggregate([
        { $match: { isDeleted: false } },
        { $group: { _id: null, total: { $sum: '$paidAmount' } } },
    ]);
    const totalDue = await Fee.aggregate([
        { $match: { isDeleted: false, status: { $ne: 'paid' } } },
        { $group: { _id: null, total: { $sum: '$dueAmount' } } },
    ]);

    return {
        metrics: [
            { label: 'Total Collected', value: totalCollected[0]?.total || 0 },
            { label: 'Total Due', value: totalDue[0]?.total || 0 },
        ],
    };
};

const getWardenDashboardFromDB = async () => {
    const totalRooms = await Room.countDocuments({ isDeleted: false });
    const occupiedRooms = await Room.countDocuments({
        isDeleted: false,
        status: 'occupied',
    });

    return {
        metrics: [
            { label: 'Total Rooms', value: totalRooms },
            { label: 'Occupied Rooms', value: occupiedRooms },
            { label: 'Available Rooms', value: totalRooms - occupiedRooms },
        ],
    };
};

const getParentDashboardFromDB = async (userId: string) => {
    const student = await Student.findOne({ user: userId, isDeleted: false });
    if (!student) return { metrics: [] };

    const feeRecord = await Fee.findOne({ student: student._id, isDeleted: false });
    const attendanceRecords = await Attendance.countDocuments({
        student: student._id,
        isDeleted: false,
    });
    const presentRecords = await Attendance.countDocuments({
        student: student._id,
        present: true,
        isDeleted: false,
    });

    return {
        metrics: [
            {
                label: 'Due Amount',
                value: feeRecord?.dueAmount || 0,
            },
            {
                label: 'Attendance %',
                value: attendanceRecords > 0
                    ? Math.round((presentRecords / attendanceRecords) * 100)
                    : 0,
            },
        ],
    };
};

export const DashboardServices = {
    getAdminDashboardFromDB,
    getStudentDashboardFromDB,
    getFacultyDashboardFromDB,
    getAccountantDashboardFromDB,
    getWardenDashboardFromDB,
    getParentDashboardFromDB,
};
