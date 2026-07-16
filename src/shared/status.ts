export type TStatusBadge = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

// ── Entity-specific statuses ──
export const ENTITY_STATUS = {
  leave: ['pending', 'approved', 'rejected', 'completed'] as const,
  grade: ['draft', 'published', 'revised'] as const,
  fee: ['unpaid', 'partial', 'paid', 'overdue'] as const,
  admission: ['applied', 'reviewed', 'accepted', 'rejected', 'enrolled'] as const,
  incident: ['reported', 'in-review', 'resolved', 'closed'] as const,
  'book-issue': ['issued', 'renewed', 'returned', 'overdue', 'lost'] as const,
  'room-allocation': ['requested', 'approved', 'checked-in', 'checked-out'] as const,
  scholarship: ['applied', 'verified', 'approved', 'rejected', 'disbursed'] as const,
  'delete-request': ['requested', 'approved', 'rejected', 'deleted'] as const,
  user: ['active', 'blocked', 'pending'] as const,
  enrollment: ['active', 'completed', 'withdrawn'] as const,
  notice: ['draft', 'published', 'archived'] as const,
  payment: ['pending', 'completed', 'failed', 'refunded'] as const,
  library: ['available', 'issued', 'lost', 'damaged'] as const,
  maintenance: ['open', 'in-progress', 'resolved', 'closed'] as const,
} as const;

// ── Badge color mapping ──
export const STATUS_BADGE: Record<string, TStatusBadge> = {
  // Success (green)
  active: 'success',
  approved: 'success',
  paid: 'success',
  published: 'success',
  completed: 'success',
  enrolled: 'success',
  resolved: 'success',
  returned: 'success',
  checked_in: 'success',
  disbursed: 'success',
  verified: 'success',

  // Warning (yellow)
  pending: 'warning',
  partial: 'warning',
  draft: 'warning',
  'in-review': 'warning',
  applied: 'warning',
  requested: 'warning',
  renewed: 'warning',
  issued: 'warning',
  reviewed: 'warning',
  'in-progress': 'warning',

  // Danger (red)
  rejected: 'danger',
  overdue: 'danger',
  suspended: 'danger',
  blocked: 'danger',
  failed: 'danger',
  deleted: 'danger',
  lost: 'danger',
  withdrawn: 'danger',

  // Info (blue)
  'checked-in': 'info',
  accepted: 'info',
  'checked-out': 'info',
  open: 'info',

  // Neutral (gray)
  archived: 'neutral',
  closed: 'neutral',
  refunded: 'neutral',
  available: 'neutral',
  damaged: 'neutral',
  resigned: 'neutral',
  graduated: 'neutral',
};

export function getBadgeColor(status: string): TStatusBadge {
  return STATUS_BADGE[status.toLowerCase().replace(/ /g, '_')] || 'neutral';
}
