import { IScheduleData } from '../model';

import { lessons } from './lessons';

const testClassrooms = [
  {
    id: '1',
    title: 'ауд. Синия кит',
    capacity: 23,
    locationDescription: 'Прямо направо по лестнице в синий кит',
  },
  {
    id: '2',
    title: 'ауд. Серый карп',
    capacity: 23,
    locationDescription: 'Прямо направо по лестнице в Серый карп',
  },
  {
    id: '3',
    title: 'ауд. Красный окунь',
    capacity: 23,
    locationDescription: 'Прямо направо по лестнице в Красный окунь',
  },
  {
    id: '4',
    title: 'ауд. Желтый желтохвостик',
    capacity: 23,
    locationDescription: 'Прямо направо по лестнице в Желтый желтохвостик',
  },
];

const testSchools = [
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

export const testData: IScheduleData = {
  lessons,
  schools: testSchools,
  classrooms: testClassrooms,
};