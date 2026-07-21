import mongoose from 'mongoose';
import { randomUUID } from 'crypto';
import { getAuth } from 'firebase-admin/auth';
import '../config/firebase';
import { User } from '../modules/user/user.model';
import { Faculty } from '../modules/faculty/faculty.model';
import { Student } from '../modules/student/student.model';
import { Admin } from '../modules/admin/admin.model';
import { Employee } from '../modules/employee/employee.model';
import { course as Course } from '../modules/course/course.model';
import { AcademicDepartment } from '../modules/academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../modules/academicFaculty/academicFaculty.model';
import { AcademicSemester } from '../modules/academicSemester/academicSemester.model';
import { Room } from '../modules/room/room.model';
import { SemesterRegistration } from '../modules/semesterRegistration/semesterRegistration.model';
import { Schedule } from '../modules/schedule/schedule.model';
import { Attendance } from '../modules/attendance/attendance.model';
import { Exam } from '../modules/exam/exam.model';
import { Grade } from '../modules/grade/grade.model';
import { Transcript } from '../modules/transcript/transcript.model';
import { Timetable } from '../modules/timetable/timetable.model';
import { CourseOutcome, ProgramOutcome, CurriculumMap } from '../modules/curriculum/curriculum.model';
import { Assessment, AssessmentScore, GradeBook } from '../modules/assessment/assessment.model';
import { ClinicalProcedure, LogEntry } from '../modules/logbook/logbook.model';
import { ClinicalRotation } from '../modules/clinicalRotation/clinicalRotation.model';
import { SkillLab } from '../modules/skillLab/skillLab.model';
import { Counseling } from '../modules/counseling/counseling.model';
import { PatientEncounter } from '../modules/patientEncounter/patientEncounter.model';
import { HealthCenter } from '../modules/healthCenter/healthCenter.model';
import { OPDAppointment, OPDVisit } from '../modules/opd/opd.model';
import { IPDAdmission, IPDDischarge } from '../modules/ipd/ipd.model';
import { LabTest, LabRequest, LabResult } from '../modules/laboratory/laboratory.model';
import { Drug, Prescription, Dispensing } from '../modules/pharmacy/pharmacy.model';
import { Fee } from '../modules/fee/fee.model';
import { Payment } from '../modules/payment/payment.model';
import { FeeStructure } from '../modules/feeStructure/feeStructure.model';
import { Receipt } from '../modules/receipt/receipt.model';
import { Scholarship } from '../modules/scholarship/scholarship.model';
import { Expense } from '../modules/expense/expense.model';
import { Book } from '../modules/book/book.model';
import { Library } from '../modules/library/library.model';
import { Notice } from '../modules/notice/notice.model';
import { Notification } from '../modules/notification/notification.model';
import { Grievance } from '../modules/grievance/grievance.model';
import { Incident } from '../modules/incident/incident.model';
import { MaintenanceComplaint } from '../modules/maintenance/maintenance.model';
import { GateEntry } from '../modules/gateEntry/gateEntry.model';
import { VisitorLog } from '../modules/visitorLog/visitorLog.model';
import { PatrolLog } from '../modules/patrolLog/patrolLog.model';
import { Handover } from '../modules/handover/handover.model';
import { RoomChange } from '../modules/roomChange/roomChange.model';
import { Hostel } from '../modules/hostel/hostel.model';
import { Laundry } from '../modules/laundry/laundry.model';
import { Facility } from '../modules/facility/facility.model';
import { Inventory } from '../modules/inventory/inventory.model';
import { MealMenu, MealPlan, MealFeedback, MessBill } from '../modules/mess/mess.model';
import { Vehicle, TransportRoute, TransportFee } from '../modules/transport/transport.model';
import { Report } from '../modules/report/report.model';
import { Committee } from '../modules/committee/committee.model';
import { Accreditation } from '../modules/accreditation/accreditation.model';
import { Research } from '../modules/research/research.model';
import { Payroll } from '../modules/payroll/payroll.model';
import { Shift } from '../modules/shift/shift.model';
import { Leave } from '../modules/leave/leave.model';
import { Alumni, AlumniEvent, AlumniDonation } from '../modules/alumni/alumni.model';
import { AdmissionApplication, MeritList } from '../modules/admission/admission.model';

const DEMO_USER = {
  email: 'demo.student@erp.demo',
  password: 'Demo@123',
  role: 'student' as const,
  profileType: 'Student' as const,
  id: '99999999',
  name: { firstName: 'Demo', lastName: 'Student' },
  gender: 'male',
  contactNo: '+8801700000003',
  emergencyContactNo: '+8801700000097',
  presentAddress: '789 Student Hall, Campus',
  permanentAddress: '789 Main Street, Dhaka',
  guardian: {
    fatherName: 'Mr. Demo Father',
    fatherOccupation: 'Business',
    fatherContactNo: '+8801700000100',
    motherName: 'Mrs. Demo Mother',
    motherOccupation: 'Teacher',
    motherContactNo: '+8801700000101',
  },
  localGuardian: {
    name: 'Mr. Local Guardian',
    occupation: 'Service',
    contactNo: '+8801700000102',
    address: 'Campus Area',
  },
};

const MOCK_STUDENT_DATA = [
  { id: 'STU-001', name: { firstName: 'Marcus', lastName: 'Chen' }, email: 'marcus.c@college.edu', contactNo: '+1 555-0192', gender: 'male' },
  { id: 'STU-002', name: { firstName: 'Sophia', lastName: 'Martinez' }, email: 'sophia.m@college.edu', contactNo: '+1 555-0283', gender: 'female' },
  { id: 'STU-003', name: { firstName: 'Ethan', lastName: 'Gallagher' }, email: 'ethan.g@college.edu', contactNo: '+1 555-0374', gender: 'male' },
  { id: 'STU-004', name: { firstName: 'Aria', lastName: 'Takahashi' }, email: 'aria.t@college.edu', contactNo: '+1 555-0465', gender: 'female' },
  { id: 'STU-005', name: { firstName: 'Liam', lastName: "O'Connor" }, email: 'liam.o@college.edu', contactNo: '+1 555-0556', gender: 'male' },
];

const MOCK_FACULTY_DATA = [
  { id: 'FAC-001', name: { firstName: 'James', lastName: 'Sterling' }, email: 'j.sterling@college.edu', contactNo: '+1 555-9831', designation: 'Professor', gender: 'male' },
  { id: 'FAC-002', name: { firstName: 'Clara', lastName: 'Oswald' }, email: 'c.oswald@college.edu', contactNo: '+1 555-9832', designation: 'Assistant Professor', gender: 'female' },
  { id: 'FAC-003', name: { firstName: 'Alistair', lastName: 'Who' }, email: 'a.who@college.edu', contactNo: '+1 555-9833', designation: 'Associate Professor', gender: 'male' },
];

const MOCK_DOMAIN_ADMIN_DATA = [
  { id: 'DA-000', name: { firstName: 'System', lastName: 'Administrator' }, email: 'super.admin@college.edu', contactNo: '+1 555-7100', designation: 'Super Administrator', gender: 'male' },
  { id: 'DA-001', name: { firstName: 'Rajesh', lastName: 'Khanna' }, email: 'faculty.admin@college.edu', contactNo: '+1 555-7101', designation: 'Faculty Admin', domainAdminType: 'faculty-admin' as const, gender: 'male' },
  { id: 'DA-002', name: { firstName: 'Meera', lastName: 'Desai' }, email: 'finance.admin@college.edu', contactNo: '+1 555-7102', designation: 'Finance Admin', domainAdminType: 'finance-admin' as const, gender: 'female' },
  { id: 'DA-003', name: { firstName: 'Arun', lastName: 'Patel' }, email: 'medical.admin@college.edu', contactNo: '+1 555-7103', designation: 'Medical Admin', domainAdminType: 'medical-admin' as const, gender: 'male' },
  { id: 'DA-004', name: { firstName: 'Sunita', lastName: 'Sharma' }, email: 'staff.admin@college.edu', contactNo: '+1 555-7104', designation: 'Staff Admin', domainAdminType: 'staff-admin' as const, gender: 'female' },
];

const MOCK_STAFF_DATA = [
  { id: 'STF-001', name: { firstName: 'Priya', lastName: 'Verma' }, email: 'priya.v@college.edu', contactNo: '+1 555-8101', staffSubRole: 'doctor' as const, category: 'medical' as const, designation: 'Staff Physician' },
  { id: 'STF-002', name: { firstName: 'Anita', lastName: 'Nair' }, email: 'anita.n@college.edu', contactNo: '+1 555-8102', staffSubRole: 'nurse' as const, category: 'medical' as const, designation: 'Senior Nurse' },
  { id: 'STF-003', name: { firstName: 'Vikram', lastName: 'Joshi' }, email: 'vikram.j@college.edu', contactNo: '+1 555-8103', staffSubRole: 'lab-technician' as const, category: 'medical' as const, designation: 'Lab Technician' },
  { id: 'STF-004', name: { firstName: 'Suresh', lastName: 'Reddy' }, email: 'suresh.r@college.edu', contactNo: '+1 555-8104', staffSubRole: 'pharmacist' as const, category: 'medical' as const, designation: 'Pharmacist' },
  { id: 'STF-005', name: { firstName: 'Ravi', lastName: 'Gupta' }, email: 'ravi.g@college.edu', contactNo: '+1 555-8105', staffSubRole: 'accountant' as const, category: 'finance' as const, designation: 'Accountant' },
  { id: 'STF-006', name: { firstName: 'Dinesh', lastName: 'Kumar' }, email: 'dinesh.k@college.edu', contactNo: '+1 555-8106', staffSubRole: 'guard' as const, category: 'security' as const, designation: 'Security Guard' },
  { id: 'STF-007', name: { firstName: 'Manoj', lastName: 'Singh' }, email: 'manoj.s@college.edu', contactNo: '+1 555-8107', staffSubRole: 'warden' as const, category: 'security' as const, designation: 'Hostel Warden' },
  { id: 'STF-008', name: { firstName: 'Ramesh', lastName: 'Khan' }, email: 'ramesh.k@college.edu', contactNo: '+1 555-8108', staffSubRole: 'maintenance' as const, category: 'facility' as const, designation: 'Maintenance Technician' },
  { id: 'STF-009', name: { firstName: 'Sarita', lastName: 'Yadav' }, email: 'sarita.y@college.edu', contactNo: '+1 555-8109', staffSubRole: 'librarian' as const, category: 'library' as const, designation: 'Librarian' },
  { id: 'STF-010', name: { firstName: 'Neha', lastName: 'Kapoor' }, email: 'neha.k@college.edu', contactNo: '+1 555-8110', staffSubRole: 'receptionist' as const, category: 'frontdesk' as const, designation: 'Receptionist' },
  { id: 'STF-011', name: { firstName: 'Ayesha', lastName: 'Mirza' }, email: 'ayesha.m@college.edu', contactNo: '+1 555-8111', staffSubRole: 'counselor' as const, category: 'frontdesk' as const, designation: 'Student Counselor' },
  { id: 'STF-012', name: { firstName: 'Gopal', lastName: 'Das' }, email: 'gopal.d@college.edu', contactNo: '+1 555-8112', staffSubRole: 'mess-manager' as const, category: 'mess' as const, designation: 'Mess Manager' },
];

async function createFirebaseUser(email: string, _password: string): Promise<string> {
  return `seed-${randomUUID()}`;
}

async function createDemoUser(): Promise<{
  studentUser: any; studentProfile: any;
}> {
  const u = DEMO_USER;
  console.log(`  Creating demo student: ${u.email}`);
  const uid = await createFirebaseUser(u.email, u.password);

  const [user] = await User.create([{
    id: u.id,
    firebaseUid: uid,
    email: u.email,
    password: u.password,
    role: u.role,
    status: 'active',
    needsPasswordChange: false,
    isDemo: true,
  }]);

  const [profile] = await Student.create([{
    id: u.id,
    user: user._id,
    email: u.email,
    name: u.name,
    gender: u.gender,
    contactNo: u.contactNo,
    emergencyContactNo: u.emergencyContactNo,
    presentAddress: u.presentAddress,
    permanentAddress: u.permanentAddress,
    guardian: u.guardian,
    localGuardian: u.localGuardian,
  }]);

  await User.findByIdAndUpdate(user._id, {
    profileRef: profile._id,
    profileType: u.profileType,
  });

  return { studentUser: user, studentProfile: profile };
}

async function seedCoreData() {
  console.log('  Seeding academic faculties...');
  const facs = await AcademicFaculty.insertMany([
    { name: 'Faculty of Science & Engineering' },
    { name: 'Faculty of Business Administration' },
    { name: 'Faculty of Arts & Humanities' },
  ]);

  console.log('  Seeding academic departments...');
  const depts = await AcademicDepartment.insertMany([
    { name: 'Computer Science & Engineering', academicFaculty: facs[0]._id, code: 'CSE' },
    { name: 'Electrical & Electronic Engineering', academicFaculty: facs[0]._id, code: 'EEE' },
    { name: 'Pharmacy', academicFaculty: facs[0]._id, code: 'PHARM' },
    { name: 'Bachelor of Business Administration', academicFaculty: facs[1]._id, code: 'BBA' },
    { name: 'English Literature', academicFaculty: facs[2]._id, code: 'ENG' },
    { name: 'Nursing Science', academicFaculty: facs[0]._id, code: 'NURS' },
  ]);

  console.log('  Seeding academic semesters...');
  const sems = await AcademicSemester.insertMany([
    { name: 'Fall', code: '03', year: '2026', startMonth: 'September', endMonth: 'December' },
    { name: 'Summer', code: '02', year: '2026', startMonth: 'May', endMonth: 'August' },
    { name: 'Autumn', code: '01', year: '2026', startMonth: 'January', endMonth: 'April' },
    { name: 'Fall', code: '03', year: '2025', startMonth: 'September', endMonth: 'December' },
  ]);

  console.log('  Seeding courses...');
  const courseData = [
    { title: 'Advanced Database Systems', prefix: 'CS', code: 301, credits: 3 },
    { title: 'Linear Algebra', prefix: 'MATH', code: 201, credits: 3 },
    { title: 'English Composition', prefix: 'ENG', code: 101, credits: 2 },
    { title: 'Pharmacology', prefix: 'PHARM', code: 301, credits: 4 },
    { title: 'Nursing Fundamentals', prefix: 'NURS', code: 201, credits: 3 },
    { title: 'Principles of Management', prefix: 'BBA', code: 101, credits: 3 },
    { title: 'Data Structures & Algorithms', prefix: 'CS', code: 201, credits: 3 },
    { title: 'Operating Systems', prefix: 'CS', code: 202, credits: 3 },
    { title: 'Digital Logic Design', prefix: 'EEE', code: 201, credits: 3 },
    { title: 'Circuit Analysis', prefix: 'EEE', code: 202, credits: 3 },
    { title: 'Biochemistry', prefix: 'PHARM', code: 201, credits: 3 },
    { title: 'Financial Accounting', prefix: 'BBA', code: 201, credits: 3 },
    { title: 'Marketing Management', prefix: 'BBA', code: 202, credits: 3 },
    { title: 'Microbiology', prefix: 'PHARM', code: 202, credits: 3 },
    { title: 'Anatomy & Physiology', prefix: 'NURS', code: 101, credits: 4 },
    { title: 'Pharmacology II', prefix: 'PHARM', code: 302, credits: 3 },
    { title: 'Software Engineering', prefix: 'CS', code: 302, credits: 3 },
    { title: 'Economics', prefix: 'BBA', code: 301, credits: 3 },
    { title: 'Pathophysiology', prefix: 'NURS', code: 202, credits: 3 },
    { title: 'Database Management Lab', prefix: 'CS', code: 303, credits: 1 },
  ];
  const courses = await Course.insertMany(courseData.map(c => ({ ...c, credits: c.credits, isDeleted: false })));

  console.log('  Seeding rooms...');
  const roomEntries = [];
  for (let i = 1; i <= 15; i++) {
    const block = String.fromCharCode(64 + Math.ceil(i / 5));
    roomEntries.push({
      roomNumber: `${block}-${100 + i}`,
      building: `Block ${block}`,
      floor: Math.ceil(i / 3),
      type: i % 3 === 0 ? 'single' : i % 3 === 1 ? 'double' : 'dorm',
      capacity: i % 3 === 0 ? 1 : i % 3 === 1 ? 2 : 4,
      status: i <= 12 ? 'occupied' : 'available',
      monthlyRent: 1000 + (i * 50),
    });
  }
  const rooms = await Room.insertMany(roomEntries);

  return { facs, depts, sems, courses, rooms };
}

async function seedAdditionalUsers(
  depts: any[], sems: any[], rooms: any[]
): Promise<{
  mockStudents: any[]; mockFaculties: any[]; mockStudentUsers: any[]; mockFacultyUsers: any[];
  mockDomainAdminUsers: any[]; mockDomainAdminProfiles: any[]; mockStaffUsers: any[]; mockStaffProfiles: any[];
}> {
  const mockFacultyUsers: any[] = [];
  const mockFaculties: any[] = [];

  console.log('  Creating mock faculty users and profiles...');
  for (const fd of MOCK_FACULTY_DATA) {
    const uid = await createFirebaseUser(fd.email, 'Demo@123');
    const [user] = await User.create([{
      id: fd.id,
      firebaseUid: uid,
      email: fd.email,
      password: 'Demo@123',
      role: 'faculty',
      status: 'active',
      needsPasswordChange: false,
      isDemo: false,
    }]);
    const [profile] = await Faculty.create([{
      id: fd.id, user: user._id, email: fd.email, name: fd.name,
      gender: fd.gender, contactNo: fd.contactNo,
      emergencyContactNo: '+1 555-0000', presentAddress: 'Faculty Office', permanentAddress: 'Faculty Home',
      designation: fd.designation, academicDepartment: depts[0]._id,
    }]);
    await User.findByIdAndUpdate(user._id, { profileRef: profile._id, profileType: 'Faculty' });
    mockFacultyUsers.push(user);
    mockFaculties.push(profile);
  }

  console.log('  Creating mock student users and profiles...');
  const mockStudentUsers: any[] = [];
  const mockStudents: any[] = [];
  for (const sd of MOCK_STUDENT_DATA) {
    const uid = await createFirebaseUser(sd.email, 'Demo@123');
    console.log(`    → Creating user id=${sd.id} email=${sd.email} uid=${uid}`);
    const [user] = await User.create([{
      id: sd.id,
      firebaseUid: uid,
      email: sd.email,
      password: 'Demo@123',
      role: 'student',
      status: 'active',
      needsPasswordChange: false,
      isDemo: false,
    }]);
    console.log(`    ✓ User created id=${user.id} _id=${user._id}`);
    const roomIdx = MOCK_STUDENT_DATA.indexOf(sd) % rooms.length;
    const [profile] = await Student.create([{
      id: sd.id, user: user._id, email: sd.email, name: sd.name,
      gender: sd.gender, contactNo: sd.contactNo,
      emergencyContactNo: '+1 555-9999', presentAddress: 'Student Hall', permanentAddress: 'Student Home',
      guardian: {
        fatherName: `Mr. ${sd.name.lastName}`, fatherOccupation: 'Business',
        fatherContactNo: '+1 555-1111', motherName: `Mrs. ${sd.name.lastName}`,
        motherOccupation: 'Teacher', motherContactNo: '+1 555-2222',
      },
      localGuardian: {
        name: `Guardian of ${sd.name.firstName}`, occupation: 'Service',
        contactNo: '+1 555-3333', address: 'Local Address',
      },
      admissionSemester: sems[0]._id,
      academicDepartment: depts[sd.id === 'STU-001' || sd.id === 'STU-004' ? 0 : sd.id === 'STU-002' ? 2 : sd.id === 'STU-003' ? 1 : 0]._id,
    }]);
    await User.findByIdAndUpdate(user._id, { profileRef: profile._id, profileType: 'Student' });
    mockStudentUsers.push(user);
    mockStudents.push(profile);
  }

  console.log('  Creating mock domain-admin users and profiles...');
  const mockDomainAdminUsers: any[] = [];
  const mockDomainAdminProfiles: any[] = [];
  for (const dd of MOCK_DOMAIN_ADMIN_DATA) {
    const uid = await createFirebaseUser(dd.email, 'Demo@123');
    const [user] = await User.create([{
      id: dd.id,
      firebaseUid: uid,
      email: dd.email,
      password: 'Demo@123',
      role: 'domain-admin',
      domainAdminType: dd.domainAdminType,
      status: 'active',
      needsPasswordChange: false,
      isDemo: false,
    }]);
    const [profile] = await Admin.create([{
      id: dd.id, user: user._id, email: dd.email, name: dd.name,
      gender: dd.gender, contactNo: dd.contactNo,
      designation: dd.designation,
      emergencyContactNo: '+1 555-0000', presentAddress: 'Admin Office', permanentAddress: 'Admin Home',
    }]);
    await User.findByIdAndUpdate(user._id, { profileRef: profile._id, profileType: 'DomainAdmin' });
    mockDomainAdminUsers.push(user);
    mockDomainAdminProfiles.push(profile);
  }

  console.log('  Creating mock staff users and profiles...');
  const mockStaffUsers: any[] = [];
  const mockStaffProfiles: any[] = [];
  for (const sd of MOCK_STAFF_DATA) {
    let uid: string;
    let user: any;
    let retries = 0;
    while (retries < 3) {
      try {
        uid = await createFirebaseUser(sd.email, 'Demo@123');
        [user] = await User.create([{
          id: sd.id,
          firebaseUid: uid,
          email: sd.email,
          password: 'Demo@123',
          role: 'staff',
          staffCategory: sd.category,
          staffSubRole: sd.staffSubRole,
          status: 'active',
          needsPasswordChange: false,
          isDemo: false,
        }]);
        break;
      } catch (err: any) {
        if (err.code === 11000 && retries < 2) {
          retries++;
          console.warn(`  ⚠ Duplicate key for ${sd.id}, retrying with new UID (${retries}/3)...`);
          continue;
        }
        throw err;
      }
    }
    const [profile] = await Employee.create([{
      user: user._id,
      employeeId: sd.id,
      firstName: sd.name.firstName,
      lastName: sd.name.lastName,
      email: sd.email,
      department: depts[0]._id,
      designation: sd.designation,
      employmentType: 'permanent',
      joiningDate: new Date('2024-01-01'),
      phone: sd.contactNo,
    }]);
    await User.findByIdAndUpdate(user._id, { profileRef: profile._id, profileType: 'Staff' });
    mockStaffUsers.push(user);
    mockStaffProfiles.push(profile);
  }

  return { mockStudents, mockFaculties, mockStudentUsers, mockFacultyUsers, mockDomainAdminUsers, mockDomainAdminProfiles, mockStaffUsers, mockStaffProfiles };
}

async function seedModuleData(
  depts: any[], sems: any[], courses: any[], rooms: any[],
  mockStudents: any[], mockFaculties: any[],
  mockStudentUsers: any[], mockFacultyUsers: any[],
  mockDomainAdminUsers: any[],
  mockStaffUsers: any[],
  refUser: any, demoProfile: any
) {
  const now = new Date();
  const day = (offset: number) => { const d = new Date(now); d.setDate(d.getDate() + offset); return d; };

  // Semester Registrations
  console.log('  Seeding semester registrations...');
  await SemesterRegistration.insertMany([
    { academicSemester: sems[0]._id, status: 'ONGOING', startDate: day(-30), endDate: day(30), minCredit: 3, maxCredit: 16 },
    { academicSemester: sems[1]._id, status: 'ENDED', startDate: day(-120), endDate: day(-60), minCredit: 3, maxCredit: 16 },
  ]);

  // Schedules
  console.log('  Seeding schedules...');
  await Schedule.insertMany([
    { course: courses[0]._id, faculty: mockFaculties[0]._id, academicDepartment: depts[0]._id, academicSemester: sems[0]._id, day: 'Monday', startTime: '09:00', endTime: '10:30', room: 'LH-3', building: 'Block A', type: 'lecture' },
    { course: courses[13]._id, faculty: mockFaculties[1]._id, academicDepartment: depts[2]._id, academicSemester: sems[0]._id, day: 'Tuesday', startTime: '11:00', endTime: '12:30', room: 'Lab A', building: 'Block B', type: 'lab' },
  ]);

  // Attendance
  console.log('  Seeding attendance...');
  for (let i = 0; i < mockStudents.length; i++) {
    await Attendance.create({
      student: mockStudents[i]._id, course: courses[i % courses.length]._id,
      faculty: mockFaculties[i % mockFaculties.length]._id, academicSemester: sems[0]._id,
      date: day(-1), status: i === 1 ? 'absent' : i === 3 ? 'late' : 'present', period: 1,
    });
  }
  await Attendance.create({
    student: demoProfile._id, course: courses[0]._id,
    faculty: mockFaculties[0]._id, academicSemester: sems[0]._id,
    date: day(-2), status: 'present', period: 1,
  });
  await Attendance.create({
    student: demoProfile._id, course: courses[4]._id,
    faculty: mockFaculties[1]._id, academicSemester: sems[1]._id,
    date: day(-1), status: 'present', period: 2,
  });

  // Exams
  console.log('  Seeding exams...');
  const exams = await Exam.insertMany([
    { title: 'Advanced Database Systems - Midterm', course: courses[0]._id, academicSemester: sems[0]._id, type: 'midterm', date: day(14), startTime: '09:00', endTime: '12:00', totalMarks: 100 },
    { title: 'Microbiology - Final', course: courses[13]._id, academicSemester: sems[0]._id, type: 'final', date: day(19), startTime: '09:00', endTime: '12:00', totalMarks: 100 },
    { title: 'Fundamentals of Cardiology - Quiz 1', course: courses[4]._id, academicSemester: sems[1]._id, type: 'quiz', date: day(9), startTime: '10:00', endTime: '11:00', totalMarks: 20 },
  ]);

  // Grades
  console.log('  Seeding grades...');
  await Grade.insertMany([
    { student: mockStudents[0]._id, course: courses[0]._id, exam: exams[0]._id, academicSemester: sems[0]._id, marksObtained: 92, totalMarks: 100, grade: 'A', gradePoint: 4.0 },
    { student: mockStudents[1]._id, course: courses[0]._id, exam: exams[0]._id, academicSemester: sems[0]._id, marksObtained: 85, totalMarks: 100, grade: 'B+', gradePoint: 3.5 },
    { student: mockStudents[2]._id, course: courses[13]._id, exam: exams[1]._id, academicSemester: sems[0]._id, marksObtained: 88, totalMarks: 100, grade: 'A-', gradePoint: 3.7 },
    { student: demoProfile._id, course: courses[2]._id, exam: exams[0]._id, academicSemester: sems[0]._id, marksObtained: 78, totalMarks: 100, grade: 'B+', gradePoint: 3.3 },
  ]);

  // Transcript
  console.log('  Seeding transcripts...');
  const gradeDocs = await Grade.find({ student: mockStudents[0]._id });
  await Transcript.create({
    student: mockStudents[0]._id, academicSemester: sems[0]._id, totalCredits: 15, earnedCredits: 15,
    sgpa: 3.85, cgpa: 3.85, grades: gradeDocs.map(g => g._id), generatedAt: now, verified: true, verifiedBy: refUser._id,
  });
  const demoGradeDocs = await Grade.find({ student: demoProfile._id });
  await Transcript.create({
    student: demoProfile._id, academicSemester: sems[0]._id, totalCredits: 15, earnedCredits: 12,
    sgpa: 3.3, cgpa: 3.3, grades: demoGradeDocs.map(g => g._id), generatedAt: now, verified: true, verifiedBy: refUser._id,
  });

  // Timetable
  console.log('  Seeding timetables...');
  await Timetable.create({
    academicSemester: sems[0]._id, department: depts[0]._id, year: 3, section: 'A',
    entries: [
      { day: 'monday', startTime: '09:00', endTime: '10:30', course: courses[0]._id, faculty: mockFaculties[0]._id, room: 'LH-3', type: 'lecture' },
      { day: 'monday', startTime: '11:00', endTime: '12:30', course: courses[13]._id, faculty: mockFaculties[1]._id, room: 'LH-1', type: 'lecture' },
      { day: 'tuesday', startTime: '09:00', endTime: '11:00', course: courses[0]._id, faculty: mockFaculties[0]._id, room: 'LAB-2', type: 'lab' },
      { day: 'wednesday', startTime: '10:00', endTime: '11:00', course: courses[4]._id, faculty: mockFaculties[2]._id, room: 'LH-2', type: 'lecture' },
      { day: 'thursday', startTime: '14:00', endTime: '15:30', course: courses[13]._id, faculty: mockFaculties[1]._id, room: 'LH-1', type: 'tutorial' },
      { day: 'friday', startTime: '08:00', endTime: '10:00', course: courses[4]._id, faculty: mockFaculties[2]._id, room: 'LAB-3', type: 'lab' },
    ],
  });

  // Course Outcomes
  console.log('  Seeding course outcomes...');
  const cos = await CourseOutcome.insertMany([
    { course: courses[0]._id, code: 'CO1', description: 'Design and implement normalized relational database schemas', cognitiveLevel: 'apply' },
    { course: courses[0]._id, code: 'CO2', description: 'Evaluate NoSQL database solutions for specific use cases', cognitiveLevel: 'evaluate' },
    { course: courses[13]._id, code: 'CO1', description: 'Identify pathogenic micro-organisms using laboratory techniques', cognitiveLevel: 'apply' },
  ]);

  // Program Outcomes
  console.log('  Seeding program outcomes...');
  await ProgramOutcome.insertMany([
    { code: 'PO1', description: 'Engineering knowledge: Apply mathematics and science fundamentals' },
    { code: 'PO2', description: 'Problem analysis: Identify and analyze complex engineering problems' },
    { code: 'PO3', description: 'Design/development of solutions: Design solutions for complex problems' },
  ]);

  // Curriculum Maps
  console.log('  Seeding curriculum maps...');
  await CurriculumMap.create({
    academicSemester: sems[0]._id, course: courses[0]._id,
    courseOutcomes: [cos[0]._id, cos[1]._id],
    topics: [
      { title: 'Relational Algebra', hours: 4, cos: [cos[0]._id] },
      { title: 'Normalization', hours: 6, cos: [cos[0]._id] },
      { title: 'NoSQL Overview', hours: 3, cos: [cos[1]._id] },
    ],
    textbooks: ['Database Systems: The Complete Book'],
    referenceBooks: ['SQL Performance Explained'],
  });

  // Assessments
  console.log('  Seeding assessments...');
  const assessments = await Assessment.insertMany([
    { course: courses[0]._id, academicSemester: sems[0]._id, title: 'Normalization Quiz', type: 'quiz', maxMarks: 20, weightage: 15, date: day(11) },
    { course: courses[0]._id, academicSemester: sems[0]._id, title: 'SQL Assignment 1', type: 'assignment', maxMarks: 50, weightage: 25, date: day(18) },
    { course: courses[13]._id, academicSemester: sems[0]._id, title: 'Sessional Exam 1', type: 'sessional', maxMarks: 100, weightage: 40, date: day(14) },
  ]);

  // Assessment Scores
  console.log('  Seeding assessment scores...');
  await AssessmentScore.insertMany([
    { assessment: assessments[0]._id, student: mockStudents[0]._id, marksObtained: 18, gradedBy: mockFaculties[0]._id, remarks: 'Good work' },
    { assessment: assessments[0]._id, student: mockStudents[1]._id, marksObtained: 16, gradedBy: mockFaculties[0]._id },
  ]);

  // Grade Books
  console.log('  Seeding grade books...');
  await GradeBook.create({
    student: mockStudents[0]._id, course: courses[0]._id, academicSemester: sems[0]._id,
    assessments: [
      { assessment: assessments[0]._id, marksObtained: 18, weightage: 15 },
      { assessment: assessments[1]._id, marksObtained: 42, weightage: 25 },
    ],
    totalMarks: 86.25, grade: 'A', gpa: 4.0,
  });

  // Clinical Procedures
  console.log('  Seeding clinical procedures...');
  const procedures = await ClinicalProcedure.insertMany([
    { code: 'CVC-I', name: 'Central Venous Catheter Insertion', category: 'medical', minimumRequired: 5, description: 'Internal jugular or subclavian vein cannulation' },
    { code: 'APPY', name: 'Appendectomy', category: 'surgical', minimumRequired: 10, description: 'Open or laparoscopic appendectomy' },
    { code: 'NVD', name: 'Normal Vaginal Delivery', category: 'obgyn', minimumRequired: 20, description: 'Uncomplicated vaginal delivery' },
    { code: 'LP', name: 'Lumbar Puncture', category: 'medical', minimumRequired: 3, description: 'CSF collection via lumbar puncture' },
  ]);

  // Log Entries
  console.log('  Seeding log entries...');
  await LogEntry.insertMany([
    { student: mockStudents[0]._id, procedure: procedures[0]._id, patientAge: 45, patientGender: 'male', diagnosis: 'Septic shock', date: day(-5), supervisor: mockFaculties[0]._id, supervisorSignOff: true, competency: 'performed' },
    { student: mockStudents[0]._id, procedure: procedures[2]._id, patientAge: 28, patientGender: 'female', diagnosis: 'Full-term pregnancy', date: day(-3), supervisor: mockFaculties[1]._id, supervisorSignOff: false, competency: 'assisted' },
  ]);

  // Clinical Rotations
  console.log('  Seeding clinical rotations...');
  await ClinicalRotation.create({
    student: mockStudents[0]._id, department: 'Cardiology', faculty: mockFaculties[2]._id,
    startDate: day(-30), endDate: day(60), totalHours: 160, loggedHours: 40, status: 'in-progress',
  });

  // Skill Labs
  console.log('  Seeding skill labs...');
  await SkillLab.insertMany([
    { student: mockStudents[0]._id, skillName: 'Suture Techniques', category: 'surgical', status: 'achieved', assessedBy: mockFaculties[0]._id, assessedDate: day(-5), remarks: 'Completed successfully' },
    { student: mockStudents[0]._id, skillName: 'IV Intubation', category: 'medical', status: 'practicing', assessedBy: mockFaculties[0]._id },
  ]);

  // Counseling
  console.log('  Seeding counseling...');
  await Counseling.create({
    student: mockStudents[0]._id, counselor: mockFaculties[0]._id,
    sessionDate: day(5), type: 'individual', mode: 'in-person', status: 'scheduled',
    checkIn: 'First introductory session',
  });

  // Patient Encounters
  console.log('  Seeding patient encounters...');
  await PatientEncounter.insertMany([
    { student: mockStudents[0]._id, patientName: 'John Smith', patientAge: 35, patientGender: 'male', diagnosis: 'Common cold', procedures: ['Physical exam'], date: day(-1), supervisedBy: mockFaculties[0]._id, department: 'General Medicine' },
    { student: mockStudents[1]._id, patientName: 'Jane Doe', patientAge: 28, patientGender: 'female', diagnosis: 'Under observation', procedures: ['ECG'], date: now, supervisedBy: mockFaculties[2]._id, department: 'Cardiology' },
  ]);

  // Health Center Visits
  console.log('  Seeding health center visits...');
  await HealthCenter.insertMany([
    { student: mockStudents[0]._id, visitDate: day(-5), symptoms: ['Annual checkup'], diagnosis: 'Healthy', prescription: 'Vitamin supplements', doctor: mockFaculties[0]._id },
    { student: mockStudents[2]._id, visitDate: day(-3), symptoms: ['Vaccination'], diagnosis: 'Routine vaccination', prescription: 'Hepatitis B vaccine administered', doctor: mockFaculties[0]._id, followUpDate: day(27) },
    { student: demoProfile._id, visitDate: day(-2), symptoms: ['Headache', 'Fatigue'], diagnosis: 'Viral infection', prescription: 'Paracetamol 500mg', doctor: mockFaculties[0]._id },
  ]);

  // OPD Appointments
  console.log('  Seeding OPD appointments...');
  const opdAppts = await OPDAppointment.insertMany([
    { patientId: mockStudents[0]._id, doctorId: mockFaculties[1]._id, appointmentDate: day(5), timeSlot: '09:00-09:15', chiefComplaint: 'Fever and cough', status: 'scheduled' },
    { patientId: mockStudents[1]._id, doctorId: mockFaculties[2]._id, appointmentDate: day(5), timeSlot: '10:30-10:45', chiefComplaint: 'Headache for 3 days', status: 'checked-in' },
    { patientId: mockStudents[2]._id, doctorId: mockFaculties[1]._id, appointmentDate: day(4), timeSlot: '14:00-14:15', chiefComplaint: 'Abdominal pain', status: 'consulted' },
  ]);

  // OPD Visits
  console.log('  Seeding OPD visits...');
  await OPDVisit.insertMany([
    { appointmentId: opdAppts[2]._id, patientId: mockStudents[2]._id, doctorId: mockFaculties[1]._id, symptoms: 'Right lower quadrant pain', diagnosis: 'Acute appendicitis', investigations: 'CBC, USG Abdomen', prescription: 'IV antibiotics, surgery consult', followUpDate: day(11) },
    { appointmentId: opdAppts[1]._id, patientId: mockStudents[1]._id, doctorId: mockFaculties[2]._id, symptoms: 'Fever, rash', diagnosis: 'Viral exanthem', prescription: 'Antihistamines, paracetamol' },
  ]);

  // IPD Admissions
  console.log('  Seeding IPD admissions...');
  const ipdAdmissions = await IPDAdmission.insertMany([
    { patientId: mockStudents[3]._id, doctorId: mockFaculties[2]._id, ward: 'private', bedNumber: 'P-101', admissionDate: day(-1), diagnosis: 'Pneumonia', status: 'admitted' },
    { patientId: mockStudents[4]._id, doctorId: mockFaculties[1]._id, ward: 'icu', bedNumber: 'ICU-03', admissionDate: day(-2), diagnosis: 'Septic shock', status: 'admitted' },
    { patientId: mockStudents[0]._id, doctorId: mockFaculties[2]._id, ward: 'general', bedNumber: 'G-205', admissionDate: day(-6), diagnosis: 'Fractured femur', status: 'discharged' },
  ]);

  // IPD Discharges
  console.log('  Seeding IPD discharges...');
  await IPDDischarge.create({
    admissionId: ipdAdmissions[2]._id, dischargeDate: day(0), dischargeType: 'regular',
    dischargeSummary: 'Patient recovered well. Advised physiotherapy.', followUpInstructions: 'Follow up in 2 weeks',
  });

  // Lab Tests
  console.log('  Seeding lab tests...');
  const labTests = await LabTest.insertMany([
    { code: 'CBC', name: 'Complete Blood Count', category: 'hematology', sampleType: 'blood', normalRange: '4.5-11.0 x10^9/L', unit: 'x10^9/L', price: 250 },
    { code: 'LFT', name: 'Liver Function Test', category: 'biochemistry', sampleType: 'blood', normalRange: 'See individual parameters', unit: '-', price: 500 },
    { code: 'UA', name: 'Urinalysis', category: 'pathology', sampleType: 'urine', normalRange: 'See individual parameters', unit: '-', price: 150 },
    { code: 'RBS', name: 'Random Blood Sugar', category: 'biochemistry', sampleType: 'blood', normalRange: '70-140 mg/dL', unit: 'mg/dL', price: 80 },
  ]);

  // Lab Requests
  console.log('  Seeding lab requests...');
  const labReqs = await LabRequest.insertMany([
    { patientId: mockStudents[0]._id, doctorId: mockFaculties[1]._id, tests: [labTests[0]._id, labTests[1]._id], requestDate: day(-1), status: 'completed' },
    { patientId: mockStudents[3]._id, doctorId: mockFaculties[2]._id, tests: [labTests[0]._id, labTests[3]._id], requestDate: day(-3), status: 'pending' },
  ]);

  // Lab Results
  console.log('  Seeding lab results...');
  await LabResult.insertMany([
    { requestId: labReqs[0]._id, testId: labTests[0]._id, resultValue: '11.5', normalRange: '4.5-11.0 x10^9/L', remarks: 'Slightly elevated WBC', technicianId: mockFaculties[0]._id, resultDate: day(-1) },
    { requestId: labReqs[0]._id, testId: labTests[1]._id, resultValue: 'Elevated ALT/AST', normalRange: 'See individual parameters', remarks: 'Hepatic impairment suspected', technicianId: mockFaculties[0]._id, resultDate: day(-1) },
  ]);

  // Drugs
  console.log('  Seeding drugs...');
  const drugs = await Drug.insertMany([
    { code: 'AMOX-500', name: 'Amoxicillin 500mg', category: 'antibiotic', manufacturer: 'GSK', unit: 'capsule', price: 12, stock: 500, reorderLevel: 100 },
    { code: 'PARA-500', name: 'Paracetamol 500mg', category: 'analgesic', manufacturer: 'Cipla', unit: 'tablet', price: 5, stock: 1000, reorderLevel: 200 },
    { code: 'INS-R', name: 'Insulin Regular 100IU', category: 'antidiabetic', manufacturer: 'Novo Nordisk', unit: 'vial', price: 450, stock: 20, reorderLevel: 50 },
    { code: 'NS-500', name: 'Normal Saline 500ml', category: 'iv-fluid', manufacturer: 'Baxter', unit: 'bottle', price: 35, stock: 200, reorderLevel: 50 },
  ]);

  // Prescriptions
  console.log('  Seeding prescriptions...');
  const prescriptions = await Prescription.insertMany([
    {
      patientId: mockStudents[0]._id, doctorId: mockFaculties[1]._id, date: day(-1),
      drugs: [
        { drugId: drugs[0]._id, dosage: '500mg thrice daily', duration: '7 days' },
        { drugId: drugs[1]._id, dosage: '500mg SOS', duration: '3 days' },
      ],
    },
    {
      patientId: mockStudents[3]._id, doctorId: mockFaculties[2]._id, date: day(-3),
      drugs: [{ drugId: drugs[0]._id, dosage: '500mg thrice daily', duration: '10 days' }],
    },
  ]);

  // Dispensing
  console.log('  Seeding dispensings...');
  await Dispensing.create({
    prescriptionId: prescriptions[0]._id, pharmacistId: mockFaculties[0]._id, dispensedDate: day(-1),
  });

  // Fee Structures
  console.log('  Seeding fee structures...');
  const feeStructures = await FeeStructure.insertMany([
    { name: 'Tuition Fee - MBBS', amount: 500000, category: 'tuition', academicSemester: sems[0]._id, applicableTo: ['MBBS'], isOptional: false },
    { name: 'Hostel Fee', amount: 45000, category: 'hostel', academicSemester: sems[0]._id, applicableTo: ['all'], isOptional: false },
    { name: 'Transport Fee', amount: 15000, category: 'transport', academicSemester: sems[0]._id, applicableTo: ['all'], isOptional: true },
  ]);

  // Fees
  console.log('  Seeding fees...');
  const fees = await Fee.insertMany([
    { student: mockStudents[0]._id, academicSemester: sems[0]._id, totalAmount: 25000, paidAmount: 0, dueAmount: 25000, lateFee: 0, dueDate: day(14), status: 'unpaid', feeHeads: [{ head: feeStructures[1]._id, amount: 25000 }] },
    { student: mockStudents[1]._id, academicSemester: sems[0]._id, totalAmount: 120000, paidAmount: 120000, dueAmount: 0, lateFee: 0, dueDate: day(14), status: 'paid', feeHeads: [{ head: feeStructures[0]._id, amount: 120000 }] },
    { student: demoProfile._id, academicSemester: sems[0]._id, totalAmount: 60000, paidAmount: 60000, dueAmount: 0, lateFee: 0, dueDate: day(-10), status: 'paid', feeHeads: [{ head: feeStructures[0]._id, amount: 60000 }] },
    { student: demoProfile._id, academicSemester: sems[1]._id, totalAmount: 60000, paidAmount: 30000, dueAmount: 30000, lateFee: 500, dueDate: day(20), status: 'unpaid', feeHeads: [{ head: feeStructures[0]._id, amount: 60000 }] },
  ]);

  // Payments
  console.log('  Seeding payments...');
  const payments = await Payment.insertMany([
    { fee: fees[1]._id, student: mockStudents[1]._id, amount: 120000, method: 'online', transactionId: 'TXN-739281', paymentDate: day(-5), status: 'success' },
    { fee: fees[2]._id, student: demoProfile._id, amount: 60000, method: 'online', transactionId: 'TXN-DEMO-001', paymentDate: day(-10), status: 'success' },
  ]);

  // Receipts
  console.log('  Seeding receipts...');
  await Receipt.insertMany([
    { payment: payments[0]._id, fee: fees[1]._id, student: mockStudents[1]._id, receiptNumber: 'RCP-2026-0002', amount: 120000, generatedAt: day(-5) },
    { payment: payments[1]._id, fee: fees[2]._id, student: demoProfile._id, receiptNumber: 'RCP-2026-DEMO', amount: 60000, generatedAt: day(-10) },
  ]);

  // Scholarships
  console.log('  Seeding scholarships...');
  await Scholarship.insertMany([
    { student: mockStudents[0]._id, name: 'Merit Scholarship', type: 'merit', amount: 50000, academicSemester: sems[0]._id, status: 'approved' },
    { student: mockStudents[1]._id, name: 'Need-Based Grant', type: 'need-based', amount: 30000, academicSemester: sems[0]._id, status: 'pending' },
  ]);

  // Expenses
  console.log('  Seeding expenses...');
  await Expense.insertMany([
    { vendor: 'Lab Supplies Co', category: 'supplies', amount: 150000, description: 'Laboratory equipment purchase', paymentDate: day(-5), paymentMethod: 'bank-transfer', paidTo: 'Lab Supplies Co' },
    { vendor: 'Stationery Mart', category: 'supplies', amount: 5000, description: 'Stationery supplies', paymentDate: day(-3), paymentMethod: 'cash', paidTo: 'Stationery Mart' },
    { vendor: 'Power Corp', category: 'utilities', amount: 45000, description: 'Electricity bill - June', paymentDate: day(0), paymentMethod: 'bank-transfer', paidTo: 'Power Corp' },
  ]);

  // Books
  console.log('  Seeding books...');
  const books = await Book.insertMany([
    { title: "Gray's Anatomy for Students", author: 'Richard Drake', isbn: '978-0323393041', category: 'textbook', quantity: 10, availableQuantity: 8 },
    { title: 'Introduction to Algorithms', author: 'Thomas Cormen', isbn: '978-0262033848', category: 'textbook', quantity: 5, availableQuantity: 3 },
  ]);

  // Library Records
  console.log('  Seeding library records...');
  await Library.insertMany([
    { book: books[0]._id, borrower: mockStudents[0]._id, borrowerType: 'student', issueDate: day(-14), dueDate: day(0), status: 'issued' },
    { book: books[1]._id, borrower: mockStudents[1]._id, borrowerType: 'student', issueDate: day(-25), dueDate: day(-11), returnDate: day(-12), status: 'returned' },
    { book: books[0]._id, borrower: demoProfile._id, borrowerType: 'student', issueDate: day(-10), dueDate: day(10), status: 'issued' },
  ]);

  // Notices
  console.log('  Seeding notices...');
  await Notice.insertMany([
    { title: 'Exam Schedule Released', content: 'Final examination schedule for Fall 2026 has been published.', targetRoles: ['student', 'faculty'], priority: 'high', validFrom: day(-5), validTo: day(30), publishedBy: refUser._id },
    { title: 'Holiday - Independence Day', content: 'College will remain closed on August 15th.', targetRoles: [], priority: 'normal', validFrom: day(-3), validTo: day(32), publishedBy: refUser._id },
    { title: 'Faculty Meeting - June 2026', content: 'All department heads are requested to attend the monthly faculty meeting.', targetRoles: ['faculty'], priority: 'urgent', validFrom: day(-14), validTo: day(-10), publishedBy: refUser._id },
  ]);

  // Notifications
  console.log('  Seeding notifications...');
  await Notification.insertMany([
    { recipient: mockStudentUsers[0]._id, type: 'reminder', title: 'Fee Payment Reminder', message: 'Hostel fees for Fall 2026 are due by July 1st.', read: false },
    { recipient: mockStudentUsers[0]._id, type: 'alert', title: 'Maintenance Notice', message: 'Block A water supply will be interrupted on June 20th for pipe repairs.', read: false },
    { recipient: mockStudentUsers[0]._id, type: 'info', title: 'Exam Schedule Published', message: 'Final exam schedule for Spring 2026 is now available.', read: true },
    { recipient: mockStudentUsers[1]._id, type: 'info', title: 'Counseling Session Reminder', message: 'Your appointment with Dr. Jenkins is tomorrow at 3 PM.', read: true },
    { recipient: mockStudentUsers[0]._id, type: 'alert', title: 'Visitor Entry Approved', message: 'Your guest has been approved for entry.', read: false },
  ]);

  // Grievances
  console.log('  Seeding grievances...');
  await Grievance.insertMany([
    { complainant: mockStudentUsers[0]._id, isAnonymous: false, subject: 'Frequent power cuts in Block B', description: 'The electricity cuts off every evening between 7 PM and 9 PM.', category: 'hostel', status: 'under-review' },
    { complainant: mockStudentUsers[1]._id, isAnonymous: true, subject: 'Library hours are too restrictive', description: 'Requesting to extend library hours until midnight during exam weeks.', category: 'academic', status: 'resolved', resolution: 'Library hours extended to 11:30 PM during exams.', resolvedAt: day(-2) },
  ]);

  // Incidents
  console.log('  Seeding incidents...');
  await Incident.insertMany([
    { title: 'Leaking shower faucet', description: 'Water dripping constantly.', severity: 'medium', status: 'reported', location: 'Block B, Room 204', reportedBy: mockStudentUsers[0]._id },
    { title: 'AC fan making loud grinding noise', description: 'AC unit fan is grinding and not cooling properly.', severity: 'high', status: 'investigating', location: 'Block A, Room 102', reportedBy: mockStudentUsers[1]._id },
  ]);

  // Maintenance Complaints
  console.log('  Seeding maintenance complaints...');
  await MaintenanceComplaint.insertMany([
    { title: 'Broken window', description: 'Window glass cracked', location: 'B-204', reportedBy: mockStudentUsers[0]._id, priority: 'medium', status: 'reported' },
    { title: 'Leaking pipe', description: 'Water pipe leaking under sink', location: 'A-102', reportedBy: mockStudentUsers[1]._id, priority: 'high', status: 'in-progress' },
    { title: 'Light bulb replacement', description: 'Tube light not working', location: 'B-205', reportedBy: mockStudentUsers[2]._id, priority: 'low', status: 'resolved', resolvedAt: day(-5) },
  ]);

  // Gate Entries
  console.log('  Seeding gate entries...');
  await GateEntry.insertMany([
    { type: 'student', student: mockStudents[0]._id, personName: 'Marcus Chen', contactNo: '+1 555-0192', purpose: 'Returning from library', entryTime: day(-1), isLateEntry: true, lateEntryReason: 'Extended study session', authorizedBy: refUser._id },
    { type: 'visitor', personName: 'Sarah Connor', vehicleNumber: 'ABC-1234', contactNo: '+1 555-0987', purpose: 'Parent visit', entryTime: day(-1), exitTime: day(-1), authorizedBy: refUser._id },
  ]);

  // Visitor Logs
  console.log('  Seeding visitor logs...');
  await VisitorLog.create({
    visitorName: 'John Doe', contactNo: '+1 555-1122', email: 'johndoe@email.com',
    purpose: 'Delivery', vehicleNumber: 'XYZ-987', entryTime: day(-1), exitTime: day(-1), preApproved: true,
  });

  // Patrol Logs
  console.log('  Seeding patrol logs...');
  await PatrolLog.insertMany([
    { guard: refUser._id, checkpoint: 'Block A - Ground Floor', scanTime: day(-1), status: 'on-time', notes: 'All clear' },
    { guard: refUser._id, checkpoint: 'Main Gate Area', scanTime: day(-1), status: 'late', notes: 'Suspicious activity reported near parking lot' },
  ]);

  // Handovers
  console.log('  Seeding handovers...');
  await Handover.insertMany([
    { fromGuard: refUser._id, toGuard: refUser._id, shift: 'night', handoverTime: day(-1), notes: 'Patrolled all blocks, no major issues', acknowledged: true, pendingTasks: [] },
    { fromGuard: refUser._id, toGuard: refUser._id, shift: 'day', handoverTime: day(0), notes: 'Reported broken light in Block B corridor', acknowledged: false, pendingTasks: ['Fix broken light'] },
  ]);

  // Room Changes
  console.log('  Seeding room changes...');
  await RoomChange.insertMany([
    { student: mockStudents[0]._id, currentRoom: rooms[1]._id, requestedRoom: rooms[2]._id, reason: 'Need quieter study environment', status: 'pending' },
    { student: mockStudents[1]._id, currentRoom: rooms[0]._id, requestedRoom: rooms[3]._id, reason: 'Roommate conflict', status: 'approved', approvedBy: refUser._id, approvalDate: day(-2) },
  ]);

  // Hostel Records
  console.log('  Seeding hostel records...');
  await Hostel.insertMany([
    { student: mockStudents[0]._id, room: rooms[1]._id, checkInDate: day(-90), status: 'checked-in', depositAmount: 5000, depositPaid: true, inspectionChecklist: [{ item: 'Desk', condition: 'Good' }] },
    { student: mockStudents[1]._id, room: rooms[0]._id, checkInDate: day(-90), checkOutDate: day(-5), status: 'checked-out', depositAmount: 5000, depositPaid: true, depositRefunded: true, inspectionChecklist: [{ item: 'Bed', condition: 'Fair' }] },
    { student: demoProfile._id, room: rooms[2]._id, checkInDate: day(-60), status: 'checked-in', depositAmount: 5000, depositPaid: true, inspectionChecklist: [{ item: 'Table', condition: 'Good' }] },
  ]);

  // Laundry Requests
  console.log('  Seeding laundry...');
  await Laundry.insertMany([
    { student: mockStudents[0]._id, pickupDate: day(-1), items: ['Shirts (3)', 'Pants (2)'], status: 'picked-up', totalAmount: 250 },
    { student: mockStudents[1]._id, pickupDate: day(0), items: ['Lab coat (2)', 'Scrubs (1)'], status: 'pending', totalAmount: 180 },
  ]);

  // Facilities
  console.log('  Seeding facilities...');
  await Facility.insertMany([
    { name: 'Main Library', description: 'Block A, Floor 3' },
    { name: 'Computer Lab 1', description: 'Block B, Floor 1' },
    { name: 'Auditorium', description: 'Block C' },
  ]);

  // Inventory
  console.log('  Seeding inventory...');
  await Inventory.insertMany([
    { name: 'Office Chair', category: 'furniture', room: rooms[0]._id, quantity: 50, condition: 'good' },
    { name: 'Whiteboard Markers', category: 'other', quantity: 200, condition: 'new' },
    { name: 'Lab Coats', category: 'other', quantity: 30, condition: 'good' },
  ]);

  // Menu
  console.log('  Seeding menus...');
  const menus = await MealMenu.insertMany([
    { day: 'Monday', mealType: 'breakfast', items: ['Idli', 'Sambar', 'Chutney'], date: day(-1) },
    { day: 'Monday', mealType: 'lunch', items: ['Rice', 'Dal', 'Mixed Vegetables', 'Papad'], date: day(-1) },
    { day: 'Monday', mealType: 'dinner', items: ['Chapati', 'Paneer Butter Masala', 'Salad'], date: day(-1) },
    { day: 'Tuesday', mealType: 'breakfast', items: ['Poha', 'Jalebi', 'Tea'], date: day(0) },
    { day: 'Tuesday', mealType: 'lunch', items: ['Biryani', 'Raita', 'Pickle'], date: day(0) },
  ]);

  // Meal Plans
  console.log('  Seeding meal plans...');
  await MealPlan.insertMany([
    { student: mockStudents[0]._id, plan: 'vegetarian', startDate: day(-30), endDate: day(30), isActive: true },
    { student: mockStudents[1]._id, plan: 'non-vegetarian', startDate: day(-30), endDate: day(30), isActive: true },
    { student: mockStudents[2]._id, plan: 'vegetarian', startDate: day(-15), endDate: day(45), isActive: false },
    { student: demoProfile._id, plan: 'non-vegetarian', startDate: day(-30), endDate: day(30), isActive: true },
  ]);

  // Mess Feedback
  console.log('  Seeding mess feedback...');
  await MealFeedback.insertMany([
    { student: mockStudents[0]._id, menu: menus[0]._id, rating: 4, comment: 'Good quality food', date: day(-2) },
    { student: mockStudents[1]._id, menu: menus[3]._id, rating: 5, comment: 'Excellent!', date: day(-3) },
    { student: mockStudents[3]._id, menu: menus[1]._id, rating: 3, comment: 'Could be better', date: day(-4) },
  ]);

  // Mess Bills
  console.log('  Seeding mess bills...');
  await MessBill.insertMany([
    { student: mockStudents[0]._id, month: 6, year: 2026, totalMeals: 60, ratePerMeal: 42, totalAmount: 2500, paid: true, paidAt: day(-5), dueDate: day(5) },
    { student: mockStudents[1]._id, month: 6, year: 2026, totalMeals: 60, ratePerMeal: 50, totalAmount: 3000, paid: false, dueDate: day(5) },
    { student: mockStudents[2]._id, month: 6, year: 2026, totalMeals: 50, ratePerMeal: 50, totalAmount: 2500, paid: false, dueDate: day(5) },
    { student: demoProfile._id, month: 7, year: 2026, totalMeals: 55, ratePerMeal: 45, totalAmount: 2475, paid: false, dueDate: day(10) },
  ]);

  // Vehicles
  console.log('  Seeding vehicles...');
  const vehicles = await Vehicle.insertMany([
    { vehicleNumber: 'UP-14-AT-1234', registrationNumber: 'REG-001', model: 'Volvo Bus', capacity: 50, driverName: 'Rajesh Kumar', driverContact: '+91-9999900001', status: 'active' },
    { vehicleNumber: 'UP-14-AT-5678', registrationNumber: 'REG-002', model: 'Tata Bus', capacity: 40, driverName: 'Suresh Singh', driverContact: '+91-9999900002', status: 'active' },
    { vehicleNumber: 'UP-14-BC-9012', registrationNumber: 'REG-003', model: 'Force Van', capacity: 15, driverName: 'Amit Verma', driverContact: '+91-9999900003', status: 'maintenance' },
  ]);

  // Transport Routes
  console.log('  Seeding transport routes...');
  const routes = await TransportRoute.insertMany([
    { routeName: 'Route A - North Campus', description: 'North campus loop', vehicle: vehicles[0]._id, stops: [{ stopName: 'Main Gate', arrivalTime: '07:30', order: 1 }, { stopName: 'Library', arrivalTime: '07:35', order: 2 }, { stopName: 'Admin Block', arrivalTime: '07:40', order: 3 }, { stopName: 'Hostel Block A', arrivalTime: '07:50', order: 4 }, { stopName: 'Hostel Block B', arrivalTime: '08:00', order: 5 }] },
    { routeName: 'Route B - South Campus', description: 'South campus loop', vehicle: vehicles[1]._id, stops: [{ stopName: 'South Gate', arrivalTime: '07:45', order: 1 }, { stopName: 'Hospital', arrivalTime: '07:55', order: 2 }, { stopName: 'Pharmacy Block', arrivalTime: '08:05', order: 3 }, { stopName: 'Hostel Block C', arrivalTime: '08:15', order: 4 }] },
    { routeName: 'Route C - City Center', description: 'City route', vehicle: vehicles[2]._id, stops: [{ stopName: 'City Center Stop', arrivalTime: '08:00', order: 1 }, { stopName: 'Railway Station', arrivalTime: '08:15', order: 2 }, { stopName: 'Bus Stand', arrivalTime: '08:25', order: 3 }, { stopName: 'College Gate', arrivalTime: '08:45', order: 4 }] },
  ]);

  // Transport Fees
  console.log('  Seeding transport fees...');
  await TransportFee.insertMany([
    { route: routes[0]._id, amount: 5000, academicYear: '2026', semester: 'Fall' },
    { route: routes[1]._id, amount: 4500, academicYear: '2026', semester: 'Fall' },
    { route: routes[2]._id, amount: 6000, academicYear: '2026', semester: 'Fall' },
    { route: routes[0]._id, amount: 3000, academicYear: '2026', semester: 'Fall' },
  ]);

  // Reports
  console.log('  Seeding reports...');
  await Report.insertMany([
    { name: 'Monthly Attendance Summary', type: 'pdf', status: 'ready', generatedBy: 'Dr. James Sterling' },
    { name: 'Semester Fee Collection Report', type: 'pdf', status: 'ready', generatedBy: 'System' },
    { name: 'Student Performance Analysis', type: 'pdf', status: 'generating', generatedBy: 'Prof. Clara Oswald' },
    { name: 'Hostel Occupancy Report', type: 'pdf', status: 'ready', generatedBy: 'Warden' },
  ]);

  // Committees
  console.log('  Seeding committees...');
  await Committee.insertMany([
    { name: 'Disciplinary Committee', type: 'discipline', members: [{ member: refUser._id, role: 'Chairperson' }, { member: mockFacultyUsers[0]._id, role: 'Member' }, { member: mockFacultyUsers[1]._id, role: 'Member' }], convenor: refUser._id, isActive: true },
    { name: 'Research Ethics Board', type: 'ethics', members: [{ member: mockFacultyUsers[0]._id, role: 'Chairperson' }], convenor: mockFacultyUsers[0]._id, isActive: true },
  ]);

  // Accreditations
  console.log('  Seeding accreditations...');
  await Accreditation.insertMany([
    { name: 'NAAC Accreditation', body: 'other', type: 'self-study', status: 'approved', dueDate: day(365), submittedDate: day(-60) },
    { name: 'NMC Review', body: 'NMC', type: 'inspection', status: 'submitted', dueDate: day(90), submittedDate: day(-30) },
  ]);

  // Research Projects
  console.log('  Seeding research...');
  await Research.insertMany([
    { title: 'AI in Medical Diagnostics', authors: [mockFaculties[0]._id], type: 'project', status: 'under-review', grantAmount: 500000, startDate: day(-180), endDate: day(180) },
    { title: 'Antibiotic Resistance Patterns', authors: [mockFaculties[1]._id], type: 'project', status: 'under-review', grantAmount: 300000, startDate: day(-120), endDate: day(240) },
  ]);

  // Payroll
  console.log('  Seeding payroll...');
  await Payroll.insertMany([
    { employee: mockFacultyUsers[0]._id, month: 6, year: 2026, basicSalary: 85000, allowances: { hra: 17000, da: 8500, travel: 3000, medical: 2000 }, deductions: { tax: 10000, providentFund: 8500, insurance: 2000 }, grossPay: 115500, totalDeductions: 20500, netPay: 95000, paymentDate: day(0), status: 'paid' },
    { employee: mockFacultyUsers[1]._id, month: 6, year: 2026, basicSalary: 65000, allowances: { hra: 13000, da: 6500, travel: 2000, medical: 1500 }, deductions: { tax: 7000, providentFund: 6500, insurance: 1500 }, grossPay: 88000, totalDeductions: 15000, netPay: 73000, status: 'pending' },
    { employee: mockFacultyUsers[2]._id, month: 6, year: 2026, basicSalary: 72000, allowances: { hra: 14400, da: 7200, travel: 2500, medical: 1800 }, deductions: { tax: 8000, providentFund: 7200, insurance: 1800 }, grossPay: 97900, totalDeductions: 17000, netPay: 80900, status: 'pending' },
    { employee: mockStudentUsers[0]._id, month: 6, year: 2026, basicSalary: 38000, allowances: { hra: 7600, da: 3800, travel: 1500, medical: 1000 }, deductions: { tax: 3000, providentFund: 3800, insurance: 1000 }, grossPay: 51900, totalDeductions: 7800, netPay: 44100, paymentDate: day(0), status: 'paid' },
    { employee: mockStudentUsers[1]._id, month: 6, year: 2026, basicSalary: 32000, allowances: { hra: 6400, da: 3200, travel: 1500, medical: 1000 }, deductions: { tax: 2500, providentFund: 3200, insurance: 800 }, grossPay: 44100, totalDeductions: 6500, netPay: 37600, status: 'pending' },
  ]);

  // Shifts
  console.log('  Seeding shifts...');
  await Shift.insertMany([
    { employee: refUser._id, shiftDate: day(-1), startTime: '22:00', endTime: '06:00', location: 'Main Gate', shiftType: 'night', status: 'scheduled' },
    { employee: refUser._id, shiftDate: day(-1), startTime: '06:00', endTime: '14:00', location: 'Main Gate', shiftType: 'morning', status: 'scheduled' },
  ]);

  // Leave Requests
  console.log('  Seeding leave requests...');
  await Leave.insertMany([
    { employee: mockFacultyUsers[0]._id, leaveType: 'sick', startDate: day(7), endDate: day(9), totalDays: 3, reason: 'Medical appointment', status: 'pending' },
    { employee: mockFacultyUsers[1]._id, leaveType: 'casual', startDate: day(12), endDate: day(13), totalDays: 2, reason: 'Family function', status: 'approved', approvedBy: mockFacultyUsers[0]._id },
    { employee: mockFacultyUsers[2]._id, leaveType: 'earned', startDate: day(18), endDate: day(27), totalDays: 10, reason: 'Vacation', status: 'rejected', approvedBy: mockFacultyUsers[0]._id, remarks: 'Insufficient leave balance' },
  ]);

  // Alumni
  console.log('  Seeding alumni...');
  const alumni = await Alumni.insertMany([
    { firstName: 'Sarah', lastName: 'Connor', email: 'sarah.connor@alumni.edu', phone: '+1 555-0201', batch: '2020', department: depts[2]._id, graduationYear: 2020, currentPosition: 'Senior Resident at City Hospital' },
    { firstName: 'James', lastName: 'Miller', email: 'james.miller@alumni.edu', phone: '+1 555-0202', batch: '2021', department: depts[5]._id, graduationYear: 2021, currentPosition: 'Head Nurse at County Medical' },
    { firstName: 'Emily', lastName: 'Chen', email: 'emily.chen@alumni.edu', phone: '+1 555-0203', batch: '2019', department: depts[2]._id, graduationYear: 2019, currentPosition: 'Private Practitioner' },
  ]);

  // Alumni Events
  console.log('  Seeding alumni events...');
  await AlumniEvent.insertMany([
    { title: 'Annual Medical Symposium 2026', description: 'A gathering of alumni for knowledge sharing', date: day(32), location: 'Main Auditorium', organizer: refUser._id, maxAttendees: 200 },
    { title: 'Alumni Networking Dinner', description: 'Evening networking event for alumni', date: day(68), location: 'Grand Ballroom', organizer: refUser._id, maxAttendees: 100 },
    { title: 'Webinar: Advances in Cardiology', description: 'Online seminar featuring alumni speakers', date: day(-3), location: 'Virtual (Zoom)', organizer: refUser._id, maxAttendees: 500 },
  ]);

  // Alumni Donations
  console.log('  Seeding alumni donations...');
  await AlumniDonation.insertMany([
    { alumni: alumni[0]._id, amount: 5000, purpose: 'Scholarship Fund', donationDate: day(-14), paymentMethod: 'online' },
    { alumni: alumni[1]._id, amount: 2000, purpose: 'Library Renovation', donationDate: day(-10), paymentMethod: 'bank-transfer' },
    { alumni: alumni[2]._id, amount: 10000, purpose: 'Research Grant', donationDate: day(-5), paymentMethod: 'online' },
  ]);

  // Admission Applications
  console.log('  Seeding admission applications...');
  const apps = await AdmissionApplication.insertMany([
    { firstName: 'Alice', lastName: 'Johnson', email: 'alice.j@email.com', phone: '+1 555-0101', dateOfBirth: new Date('2005-05-10'), gender: 'female', address: '123 Main St', city: 'New York', state: 'NY', pincode: '10001', applyingFor: depts[2]._id, academicYear: '2026-2027', status: 'submitted' },
    { firstName: 'Bob', lastName: 'Williams', email: 'bob.w@email.com', phone: '+1 555-0102', dateOfBirth: new Date('2004-08-22'), gender: 'male', address: '456 Oak Ave', city: 'Los Angeles', state: 'CA', pincode: '90001', applyingFor: depts[5]._id, academicYear: '2026-2027', status: 'under-review' },
    { firstName: 'Carol', lastName: 'Davis', email: 'carol.d@email.com', phone: '+1 555-0103', dateOfBirth: new Date('2005-01-15'), gender: 'female', address: '789 Pine Rd', city: 'Chicago', state: 'IL', pincode: '60601', applyingFor: depts[2]._id, academicYear: '2026-2027', status: 'accepted' },
    { firstName: 'David', lastName: 'Brown', email: 'david.b@email.com', phone: '+1 555-0104', dateOfBirth: new Date('2004-11-30'), gender: 'male', address: '321 Elm St', city: 'Houston', state: 'TX', pincode: '77001', applyingFor: depts[2]._id, academicYear: '2026-2027', status: 'rejected' },
    { firstName: 'Eva', lastName: 'Martinez', email: 'eva.m@email.com', phone: '+1 555-0105', dateOfBirth: new Date('2005-03-20'), gender: 'female', address: '654 Maple Dr', city: 'Phoenix', state: 'AZ', pincode: '85001', applyingFor: depts[5]._id, academicYear: '2026-2027', status: 'submitted' },
  ]);

  // Merit List
  console.log('  Seeding merit list...');
  await MeritList.insertMany([
    { application: apps[2]._id, rank: 1, meritScore: 98.5, category: 'general', isAllotted: true, allottedSeat: depts[2]._id },
    { application: apps[0]._id, rank: 2, meritScore: 95.2, category: 'general', isAllotted: true, allottedSeat: depts[2]._id },
    { application: apps[1]._id, rank: 3, meritScore: 91.8, category: 'obc', isAllotted: false },
  ]);
}

export async function seedDemoData(): Promise<void> {
  const shouldSeed = process.env.NODE_ENV === 'development' || process.env.AUTO_SEED === 'true';
  if (!shouldSeed) {
    console.log('📦 Auto-seed disabled. Set AUTO_SEED=true to enable.');
    return;
  }

  const existingCount = await User.countDocuments();
  if (existingCount > 0) {
    console.log('📦 Clearing existing data...');
    await Promise.all([
      SemesterRegistration.deleteMany({}), Schedule.deleteMany({}),
      Attendance.deleteMany({}), Exam.deleteMany({}), Grade.deleteMany({}),
      Transcript.deleteMany({}), Timetable.deleteMany({}),
      CourseOutcome.deleteMany({}), ProgramOutcome.deleteMany({}), CurriculumMap.deleteMany({}),
      Assessment.deleteMany({}), AssessmentScore.deleteMany({}), GradeBook.deleteMany({}),
      ClinicalProcedure.deleteMany({}), LogEntry.deleteMany({}),
      ClinicalRotation.deleteMany({}), SkillLab.deleteMany({}),
      Counseling.deleteMany({}), PatientEncounter.deleteMany({}),
      HealthCenter.deleteMany({}), OPDAppointment.deleteMany({}), OPDVisit.deleteMany({}),
      IPDAdmission.deleteMany({}), IPDDischarge.deleteMany({}),
      LabTest.deleteMany({}), LabRequest.deleteMany({}), LabResult.deleteMany({}),
      Drug.deleteMany({}), Prescription.deleteMany({}), Dispensing.deleteMany({}),
      Fee.deleteMany({}), Payment.deleteMany({}), FeeStructure.deleteMany({}),
      Receipt.deleteMany({}), Scholarship.deleteMany({}), Expense.deleteMany({}),
      Book.deleteMany({}), Library.deleteMany({}),
      Notice.deleteMany({}), Notification.deleteMany({}),
      Grievance.deleteMany({}), Incident.deleteMany({}),
      MaintenanceComplaint.deleteMany({}),
      GateEntry.deleteMany({}), VisitorLog.deleteMany({}),
      PatrolLog.deleteMany({}), Handover.deleteMany({}),
      RoomChange.deleteMany({}), Hostel.deleteMany({}),
      Laundry.deleteMany({}), Facility.deleteMany({}), Inventory.deleteMany({}),
      MealMenu.deleteMany({}), MealPlan.deleteMany({}),
      MealFeedback.deleteMany({}), MessBill.deleteMany({}),
      Vehicle.deleteMany({}), TransportRoute.deleteMany({}), TransportFee.deleteMany({}),
      Report.deleteMany({}), Committee.deleteMany({}), Accreditation.deleteMany({}),
      Research.deleteMany({}), Payroll.deleteMany({}), Shift.deleteMany({}),
      Leave.deleteMany({}), Employee.deleteMany({}),
      Alumni.deleteMany({}), AlumniEvent.deleteMany({}), AlumniDonation.deleteMany({}),
      AdmissionApplication.deleteMany({}), MeritList.deleteMany({}),
      Student.deleteMany({}), Faculty.deleteMany({}), Admin.deleteMany({}),
      Room.deleteMany({}), Course.deleteMany({}),
      AcademicSemester.deleteMany({}), AcademicDepartment.deleteMany({}),
      AcademicFaculty.deleteMany({}),
      User.deleteMany({}),
    ]);
    const afterCount = await User.countDocuments();
    console.log(`📦 All seed data cleared. Users remaining: ${afterCount}`);
  }

  console.log('🌱 Seeding demo data...');
  const { studentUser, studentProfile } = await createDemoUser();
  const { facs, depts, sems, courses, rooms } = await seedCoreData();
  const { mockStudents, mockFaculties, mockStudentUsers, mockFacultyUsers, mockDomainAdminUsers, mockStaffUsers } = await seedAdditionalUsers(depts, sems, rooms);
  await seedModuleData(
    depts, sems, courses, rooms,
    mockStudents, mockFaculties,
    mockStudentUsers, mockFacultyUsers,
    mockDomainAdminUsers,
    mockStaffUsers,
    studentUser, studentProfile
  );
  console.log('✅ Demo data seeded successfully!');
  console.log('');
  console.log('📋 Demo Credentials:');
  console.log('   ┌─────────────────┬──────────────────────────────────┬──────────┐');
  console.log('   │ Role            │ Email                            │ Password │');
  console.log('   ├─────────────────┼──────────────────────────────────┼──────────┤');
  console.log('   │ Super Admin     │ super.admin@college.edu          │ Demo@123 │');
  console.log('   │ Faculty Admin   │ faculty.admin@college.edu        │ Demo@123 │');
  console.log('   │ Finance Admin   │ finance.admin@college.edu        │ Demo@123 │');
  console.log('   │ Medical Admin   │ medical.admin@college.edu        │ Demo@123 │');
  console.log('   │ Staff Admin     │ staff.admin@college.edu          │ Demo@123 │');
  console.log('   │ Faculty         │ j.sterling@college.edu           │ Demo@123 │');
  console.log('   │ Student         │ demo.student@erp.demo            │ Demo@123 │');
  console.log('   │ Staff (Doctor)  │ priya.v@college.edu              │ Demo@123 │');
  console.log('   │ Staff (Nurse)   │ anita.n@college.edu              │ Demo@123 │');
  console.log('   │ Staff (Guard)   │ dinesh.k@college.edu             │ Demo@123 │');
  console.log('   │ Staff (Warden)  │ manoj.s@college.edu              │ Demo@123 │');
  console.log('   │ Staff (Librarian)│ sarita.y@college.edu            │ Demo@123 │');
  console.log('   └─────────────────┴──────────────────────────────────┴──────────┘');
}
