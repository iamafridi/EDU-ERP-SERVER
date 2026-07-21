import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { CourseRoutes } from '../modules/course/course.route';
import { RoomRoutes } from '../modules/room/room.route';
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { FacilityRoutes } from '../modules/facility/facility.route';
import { GateEntryRoutes } from '../modules/gateEntry/gateEntry.route';
import { IncidentRoutes } from '../modules/incident/incident.route';
import { PatrolLogRoutes } from '../modules/patrolLog/patrolLog.route';
import { HandoverRoutes } from '../modules/handover/handover.route';
import { VisitorLogRoutes } from '../modules/visitorLog/visitorLog.route';
import { RoomChangeRoutes } from '../modules/roomChange/roomChange.route';
import { HostelRoutes } from '../modules/hostel/hostel.route';
import { MessRoutes } from '../modules/mess/mess.route';
import { LaundryRoutes } from '../modules/laundry/laundry.route';
import { InventoryRoutes } from '../modules/inventory/inventory.route';
import { ScheduleRoutes } from '../modules/schedule/schedule.route';
import { AttendanceRoutes } from '../modules/attendance/attendance.route';
import { ExamRoutes } from '../modules/exam/exam.route';
import { GradeRoutes } from '../modules/grade/grade.route';
import { TranscriptRoutes } from '../modules/transcript/transcript.route';
import { FeeStructureRoutes } from '../modules/feeStructure/feeStructure.route';
import { FeeRoutes } from '../modules/fee/fee.route';
import { PaymentRoutes } from '../modules/payment/payment.route';
import { ReceiptRoutes } from '../modules/receipt/receipt.route';
import { ScholarshipRoutes } from '../modules/scholarship/scholarship.route';
import { ExpenseRoutes } from '../modules/expense/expense.route';
import { BudgetRoutes } from '../modules/budget/budget.route';
import { PayrollRoutes } from '../modules/payroll/payroll.route';
import { BookRoutes } from '../modules/book/book.route';
import { LibraryRoutes } from '../modules/library/library.route';
import { EmployeeRoutes } from '../modules/employee/employee.route';
import { LeaveRoutes } from '../modules/leave/leave.route';
import { ShiftRoutes } from '../modules/shift/shift.route';
import { ClinicalRotationRoutes } from '../modules/clinicalRotation/clinicalRotation.route';
import { PatientEncounterRoutes } from '../modules/patientEncounter/patientEncounter.route';
import { SkillLabRoutes } from '../modules/skillLab/skillLab.route';
import { ResearchRoutes } from '../modules/research/research.route';
import { HealthCenterRoutes } from '../modules/healthCenter/healthCenter.route';
import { CounselingRoutes } from '../modules/counseling/counseling.route';
import { GrievanceRoutes } from '../modules/grievance/grievance.route';
import { NoticeRoutes } from '../modules/notice/notice.route';
import { CommitteeRoutes } from '../modules/committee/committee.route';
import { AlumniRoutes } from '../modules/alumni/alumni.route';
import { AccreditationRoutes } from '../modules/accreditation/accreditation.route';
import { NotificationRoutes } from '../modules/notification/notification.route';
import { DashboardRoutes } from '../modules/dashboard/dashboard.route';
import { ReportRoutes } from '../modules/report/report.route';
import { TransportRoutes } from '../modules/transport/transport.route';
import { AdmissionRoutes } from '../modules/admission/admission.route';
import { ChatRoutes } from '../modules/chat/chat.route';
import { ParentRoutes } from '../modules/parent/parent.route';
import { MaintenanceRoutes } from '../modules/maintenance/maintenance.route';
import { AccountantRoutes } from '../modules/accountant/accountant.route';
import { CounselorRoutes } from '../modules/counselor/counselor.route';
import { DoctorRoutes } from '../modules/doctor/doctor.route';
import { GuardRoutes } from '../modules/guard/guard.route';
import { LibrarianRoutes } from '../modules/librarian/librarian.route';
import { WardenRoutes } from '../modules/warden/warden.route';
import { CurriculumRoutes } from '../modules/curriculum/curriculum.route';
import { AssessmentRoutes } from '../modules/assessment/assessment.route';
import { TimetableRoutes } from '../modules/timetable/timetable.route';
import { LogbookRoutes } from '../modules/logbook/logbook.route';
import { OPDRoutes } from '../modules/opd/opd.route';
import { IPDRoutes } from '../modules/ipd/ipd.route';
import { LaboratoryRoutes } from '../modules/laboratory/laboratory.route';
import { PharmacyRoutes } from '../modules/pharmacy/pharmacy.route';
import { ReceptionistRoutes } from '../modules/receptionist/receptionist.route';
import { NurseRoutes } from '../modules/nurse/nurse.route';
import { LabTechnicianRoutes } from '../modules/labTechnician/labTechnician.route';
import { PharmacistRoutes } from '../modules/pharmacist/pharmacist.route';
import { AuditLogRoutes } from '../modules/auditLog/auditLog.route';
import { GlobalSearchRoutes } from '../modules/globalSearch/globalSearch.route';
import demoGuard from '../middlewares/demoGuard';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/rooms',
    route: RoomRoutes,
  },
  {
    path: '/semester-registrations',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/facilities',
    route: FacilityRoutes,
  },
  {
    path: '/gate-entries',
    route: GateEntryRoutes,
  },
  {
    path: '/incidents',
    route: IncidentRoutes,
  },
  {
    path: '/patrol-logs',
    route: PatrolLogRoutes,
  },
  {
    path: '/handovers',
    route: HandoverRoutes,
  },
  {
    path: '/visitor-logs',
    route: VisitorLogRoutes,
  },
  {
    path: '/room-changes',
    route: RoomChangeRoutes,
  },
  {
    path: '/hostel',
    route: HostelRoutes,
  },
  {
    path: '/mess',
    route: MessRoutes,
  },
  {
    path: '/laundry',
    route: LaundryRoutes,
  },
  {
    path: '/inventory',
    route: InventoryRoutes,
  },
  {
    path: '/schedules',
    route: ScheduleRoutes,
  },
  {
    path: '/attendance',
    route: AttendanceRoutes,
  },
  {
    path: '/exams',
    route: ExamRoutes,
  },
  {
    path: '/grades',
    route: GradeRoutes,
  },
  {
    path: '/transcripts',
    route: TranscriptRoutes,
  },
  {
    path: '/fee-structures',
    route: FeeStructureRoutes,
  },
  {
    path: '/fees',
    route: FeeRoutes,
  },
  {
    path: '/payments',
    route: PaymentRoutes,
  },
  {
    path: '/receipts',
    route: ReceiptRoutes,
  },
  {
    path: '/scholarships',
    route: ScholarshipRoutes,
  },
  {
    path: '/expenses',
    route: ExpenseRoutes,
  },
  {
    path: '/budgets',
    route: BudgetRoutes,
  },
  {
    path: '/payrolls',
    route: PayrollRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/library',
    route: LibraryRoutes,
  },
  {
    path: '/employees',
    route: EmployeeRoutes,
  },
  {
    path: '/leaves',
    route: LeaveRoutes,
  },
  {
    path: '/shifts',
    route: ShiftRoutes,
  },
  {
    path: '/clinical-rotations',
    route: ClinicalRotationRoutes,
  },
  {
    path: '/patient-encounters',
    route: PatientEncounterRoutes,
  },
  {
    path: '/skill-labs',
    route: SkillLabRoutes,
  },
  {
    path: '/research',
    route: ResearchRoutes,
  },
  {
    path: '/health-center',
    route: HealthCenterRoutes,
  },
  {
    path: '/counseling',
    route: CounselingRoutes,
  },
  {
    path: '/grievances',
    route: GrievanceRoutes,
  },
  {
    path: '/notices',
    route: NoticeRoutes,
  },
  {
    path: '/committees',
    route: CommitteeRoutes,
  },
  {
    path: '/alumni',
    route: AlumniRoutes,
  },
  {
    path: '/accreditations',
    route: AccreditationRoutes,
  },
  {
    path: '/notifications',
    route: NotificationRoutes,
  },
  {
    path: '/dashboard',
    route: DashboardRoutes,
  },
  {
    path: '/reports',
    route: ReportRoutes,
  },
  {
    path: '/transport',
    route: TransportRoutes,
  },
  {
    path: '/admissions',
    route: AdmissionRoutes,
  },
  {
    path: '/chat',
    route: ChatRoutes,
  },
  {
    path: '/parents',
    route: ParentRoutes,
  },
  {
    path: '/maintenance',
    route: MaintenanceRoutes,
  },
  {
    path: '/accountants',
    route: AccountantRoutes,
  },
  {
    path: '/counselors',
    route: CounselorRoutes,
  },
  {
    path: '/doctors',
    route: DoctorRoutes,
  },
  {
    path: '/guards',
    route: GuardRoutes,
  },
  {
    path: '/librarians',
    route: LibrarianRoutes,
  },
  {
    path: '/wardens',
    route: WardenRoutes,
  },
  {
    path: '/curriculum',
    route: CurriculumRoutes,
  },
  {
    path: '/assessments',
    route: AssessmentRoutes,
  },
  {
    path: '/timetables',
    route: TimetableRoutes,
  },
  {
    path: '/logbook',
    route: LogbookRoutes,
  },
  {
    path: '/opd',
    route: OPDRoutes,
  },
  {
    path: '/ipd',
    route: IPDRoutes,
  },
  {
    path: '/laboratory',
    route: LaboratoryRoutes,
  },
  {
    path: '/pharmacy',
    route: PharmacyRoutes,
  },
  {
    path: '/receptionists',
    route: ReceptionistRoutes,
  },
  {
    path: '/nurses',
    route: NurseRoutes,
  },
  {
    path: '/lab-technicians',
    route: LabTechnicianRoutes,
  },
  {
    path: '/pharmacists',
    route: PharmacistRoutes,
  },
  {
    path: '/audit-logs',
    route: AuditLogRoutes,
  },
  {
    path: '/search',
    route: GlobalSearchRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, demoGuard, route.route));

export default router;
