export interface SensitiveFieldConfig {
  fields: string[];
  allowedRoles: string[];
}

const SENSITIVE_FIELD_ACCESS: Record<string, SensitiveFieldConfig> = {
  'health-center': {
    fields: ['+diagnosis', '+prescription'],
    allowedRoles: ['admin', 'super-admin', 'doctor'],
  },
  'opd-appointment': {
    fields: ['+chiefComplaint', '+notes'],
    allowedRoles: ['admin', 'super-admin', 'doctor'],
  },
  'opd-visit': {
    fields: ['+diagnosis', '+prescription', '+notes'],
    allowedRoles: ['admin', 'super-admin', 'doctor'],
  },
  'ipd-admission': {
    fields: ['+diagnosis'],
    allowedRoles: ['admin', 'super-admin', 'doctor'],
  },
  'ipd-discharge': {
    fields: ['+dischargeSummary', '+followUpInstructions'],
    allowedRoles: ['admin', 'super-admin', 'doctor'],
  },
  counseling: {
    fields: ['+privateNotes', '+checkIn'],
    allowedRoles: ['admin', 'super-admin', 'counselor'],
  },
  prescription: {
    fields: ['+drugs.instructions', '+notes'],
    allowedRoles: ['admin', 'super-admin', 'doctor', 'pharmacist'],
  },
  'lab-result': {
    fields: ['+resultValue', '+remarks'],
    allowedRoles: ['admin', 'super-admin', 'doctor', 'lab-technician'],
  },
  payroll: {
    fields: ['+basicSalary', '+grossPay', '+netPay', '+allowances', '+deductions'],
    allowedRoles: ['admin', 'super-admin', 'accountant'],
  },
  payment: {
    fields: ['+transactionId'],
    allowedRoles: ['admin', 'super-admin', 'accountant'],
  },
};

export function canAccessSensitiveField(module: string, role: string): boolean {
  const config = SENSITIVE_FIELD_ACCESS[module];
  if (!config) return false;
  return config.allowedRoles.includes(role);
}

export function getSensitiveSelect(module: string, role: string): string[] {
  const config = SENSITIVE_FIELD_ACCESS[module];
  if (!config) return [];
  if (config.allowedRoles.includes(role)) {
    return config.fields;
  }
  return [];
}

export function addSensitiveSelect<T>(query: T, module: string, role: string): T {
  const fields = getSensitiveSelect(module, role);
  if (fields.length > 0) {
    return (query as any).select(fields.join(' '));
  }
  return query;
}

export function stripSensitiveData(data: any, module: string, role: string): any {
  const config = SENSITIVE_FIELD_ACCESS[module];
  if (!config) return data;
  if (config.allowedRoles.includes(role)) return data;

  if (Array.isArray(data)) {
    return data.map((item) => stripSensitiveData(item, module, role));
  }

  if (data && typeof data === 'object') {
    const stripped = { ...data };
    for (const field of config.fields) {
      const cleanField = field.replace(/^\+/, '');
      const parts = cleanField.split('.');
      if (parts.length === 1 && cleanField in stripped) {
        delete stripped[cleanField];
      }
    }
    return stripped;
  }

  return data;
}
