import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id.slice(-4) : undefined;
};

export const generateStudentId = async (payload?: TAcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload?.code;
  const currentYear = payload?.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  if (payload) {
    incrementId = `${payload.year}${payload.code}${incrementId}`;
  } else {
    const year = new Date().getFullYear().toString();
    incrementId = `${year}${incrementId}`;
  }

  return incrementId;
};

export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    { role: 'faculty' },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `F-${incrementId}`;

  return incrementId;
};

export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    { role: 'admin' },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `A-${incrementId}`;

  return incrementId;
};

const rolePrefixMap: Record<string, string> = {
  guard: 'G',
  warden: 'W',
  'mess-manager': 'MM',
  accountant: 'ACC',
  librarian: 'L',
  doctor: 'DR',
  counselor: 'C',
  maintenance: 'M',
  parent: 'P',
  receptionist: 'REC',
  nurse: 'N',
  'lab-technician': 'LT',
  pharmacist: 'PH',
};

export const findLastStaffId = async (role: string) => {
  const prefix = rolePrefixMap[role] || 'ST';
  const lastStaff = await User.findOne(
    { role },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStaff?.id ? lastStaff.id.substring(prefix.length + 1) : undefined;
};

export const generateStaffId = async (role: string) => {
  const prefix = rolePrefixMap[role] || 'ST';
  let currentId = (0).toString();
  const lastStaffId = await findLastStaffId(role);

  if (lastStaffId) {
    currentId = lastStaffId;
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${prefix}-${incrementId}`;

  return incrementId;
};
