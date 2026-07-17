export const AUTH_ROLES = [
  'super-admin', 'chairman', 'principal', 'vice-principal',
  'registrar', 'hod', 'admin', 'faculty', 'student',
  'guard', 'warden', 'mess-manager', 'accountant',
  'librarian', 'doctor', 'counselor', 'maintenance', 'parent',
] as const;

export const AuthSearchableFields = ['email', 'role'];
