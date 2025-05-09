import { Student } from '../types';

// Mock student data
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    course: 'Computer Science',
    enrollmentDate: '2023-09-01',
    grade: 'A',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.j@example.com',
    course: 'Data Science',
    enrollmentDate: '2023-08-15',
    grade: 'B+',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    course: 'Cybersecurity',
    enrollmentDate: '2023-09-10',
    grade: 'A-',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    course: 'Computer Science',
    enrollmentDate: '2023-07-20',
    grade: 'B',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david.k@example.com',
    course: 'Web Development',
    enrollmentDate: '2023-08-05',
    grade: 'A+',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
  },
  {
    id: '6',
    name: 'Jessica Martinez',
    email: 'jessica.m@example.com',
    course: 'Data Science',
    enrollmentDate: '2023-09-20',
    grade: 'B-',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
  },
  {
    id: '7',
    name: 'Daniel Thompson',
    email: 'daniel.t@example.com',
    course: 'Cybersecurity',
    enrollmentDate: '2023-08-12',
    grade: 'A',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
  },
  {
    id: '8',
    name: 'Rachel Lee',
    email: 'rachel.l@example.com',
    course: 'Web Development',
    enrollmentDate: '2023-07-30',
    grade: 'B+',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
  }
];

// Mock API call to fetch students
export const mockFetchStudents = (): Promise<Student[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(mockStudents);
    }, 1500);
  });
};