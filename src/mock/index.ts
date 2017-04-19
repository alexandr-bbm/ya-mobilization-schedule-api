import { lessons } from './lessons';
import { ISchedule } from '../models/schedule';

export const testClassrooms = [
  {
    id: '1',
    title: 'ауд. Синий кит',
    capacity: 63,
    locationDescription: 'Прямо направо по лестнице в синий кит',
  },
  {
    id: '2',
    title: 'ауд. Серый карп',
    capacity: 44,
    locationDescription: 'Прямо направо по лестнице в Серый карп',
  },
  {
    id: '3',
    title: 'ауд. Красный окунь',
    capacity: 65,
    locationDescription: 'Прямо направо по лестнице в Красный окунь',
  },
  {
    id: '4',
    title: 'ауд. Желтый желтохвостик',
    capacity: 123,
    locationDescription: 'Прямо направо по лестнице в Желтый желтохвостик',
  },
];

export const testSchools = [
  {
    id: 'frontend',
    title: 'Школа разработки интерфейсов',
    studentsNumber: 43,
  },
  {
    id: 'design',
    title: 'Школа мобильного дизайна',
    studentsNumber: 25,
  },
  {
    id: 'backend',
    title: 'Школа мобильной разработки',
    studentsNumber: 12,
  },
];

export const mockData: ISchedule = {
  lessons,
  schools: testSchools,
  classrooms: testClassrooms,
};