import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DashboardServices } from './dashboard.service';

const getDashboard = catchAsync(async (req, res) => {
    const { role, userId, staffSubRole } = req.user;
    let result;

    switch (role) {
        case 'student':
            result = await DashboardServices.getStudentDashboardFromDB(userId);
            break;
        case 'faculty':
            result = await DashboardServices.getFacultyDashboardFromDB(userId);
            break;
        case 'staff':
            if (staffSubRole === 'accountant') {
                result = await DashboardServices.getAccountantDashboardFromDB();
            } else if (staffSubRole === 'warden') {
                result = await DashboardServices.getWardenDashboardFromDB();
            } else {
                result = await DashboardServices.getAdminDashboardFromDB();
            }
            break;
        default:
            result = await DashboardServices.getAdminDashboardFromDB();
            break;
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Dashboard data retrieved successfully',
        data: result,
    });
});

export const DashboardControllers = {
    getDashboard,
};
