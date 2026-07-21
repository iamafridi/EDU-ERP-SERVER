import { Student } from '../student/student.model';
import { User } from '../user/user.model';
import { course as Course } from '../course/course.model';
import { Room } from '../room/room.model';
import { Faculty } from '../faculty/faculty.model';
import { SEARCH_LIMIT_PER_CATEGORY, SEARCH_TOTAL_LIMIT } from './globalSearch.constant';
import type { TSearchResult } from './globalSearch.interface';

const searchAll = async (query: string): Promise<TSearchResult[]> => {
  if (!query || query.trim().length === 0) return [];

  const regex = { $regex: query.trim(), $options: 'i' };

  const [students, faculties, courses, rooms, users] = await Promise.all([
    Student.find({
      $or: [
        { 'name.firstName': regex },
        { 'name.middleName': regex },
        { 'name.lastName': regex },
        { email: regex },
        { id: regex },
      ],
    })
      .select('name id email')
      .limit(SEARCH_LIMIT_PER_CATEGORY)
      .lean(),

    Faculty.find({
      $or: [
        { 'name.firstName': regex },
        { 'name.middleName': regex },
        { 'name.lastName': regex },
        { email: regex },
        { id: regex },
      ],
    })
      .select('name id email designation')
      .limit(SEARCH_LIMIT_PER_CATEGORY)
      .lean(),

    (() => {
      const courseFilter: Record<string, unknown>[] = [
        { title: regex },
      ];
      const codeNum = parseInt(query.trim(), 10);
      if (!isNaN(codeNum)) {
        courseFilter.push({ code: codeNum });
      }
      return Course.find({ $or: courseFilter });
    })()
      .select('title code credits')
      .limit(SEARCH_LIMIT_PER_CATEGORY)
      .lean(),

    Room.find({
      $or: [
        { roomNumber: regex },
        { building: regex },
        { floor: regex },
      ],
    })
      .select('roomNumber building floor capacity')
      .limit(SEARCH_LIMIT_PER_CATEGORY)
      .lean(),

    User.find({
      $or: [
        { email: regex },
        { id: regex },
      ],
    })
      .select('email role id')
      .limit(SEARCH_LIMIT_PER_CATEGORY)
      .lean(),
  ]);

  const results: TSearchResult[] = [];

  for (const s of students) {
    const fullName = [s.name?.firstName, s.name?.middleName, s.name?.lastName].filter(Boolean).join(' ');
    results.push({
      id: `student-${s._id}`,
      label: fullName || s.id,
      description: `Student · ${s.id} · ${s.email}`,
      href: `/students/${s._id}`,
      category: 'Students',
    });
  }

  for (const f of faculties) {
    const fullName = [f.name?.firstName, f.name?.middleName, f.name?.lastName].filter(Boolean).join(' ');
    results.push({
      id: `faculty-${f._id}`,
      label: fullName || f.id,
      description: `Faculty · ${f.id} · ${f.email}${f.designation ? ` · ${f.designation}` : ''}`,
      href: `/faculties/${f._id}`,
      category: 'Faculty',
    });
  }

  for (const c of courses) {
    results.push({
      id: `course-${c._id}`,
      label: c.title,
      description: `Course · ${c.code} · ${c.credits} credits`,
      href: `/courses/${c._id}`,
      category: 'Courses',
    });
  }

  for (const r of rooms) {
    results.push({
      id: `room-${r._id}`,
      label: `${r.building} — Room ${r.roomNumber}`,
      description: `Room · Floor ${r.floor} · Capacity: ${r.capacity}`,
      href: `/rooms/${r._id}`,
      category: 'Rooms',
    });
  }

  for (const u of users) {
    results.push({
      id: `user-${u._id}`,
      label: u.email,
      description: `User · ${u.id} · ${u.role}`,
      href: `/users/${u._id}`,
      category: 'Users',
    });
  }

  return results.slice(0, SEARCH_TOTAL_LIMIT);
};

export const GlobalSearchServices = {
  searchAll,
};
