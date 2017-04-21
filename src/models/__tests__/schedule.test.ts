import { Schedule } from '../schedule';
import ScheduleError, { ScheduleErrorMessages } from '../../utils/errors';

const testLesson = {
  title: 'Адаптивная вёрстка',
  teacherName: 'Дмитрий Душкин',
  id: 'testLesson',
  schoolIds: ['frontend'],
  classroomId: '1',
  date: '08.05.2017',
  timeStart: '14:00',
  timeEnd: '16:00'
};

const testData = {
  lessons: [
    testLesson,
  ],
  schools: [
    {
      id: 'frontend',
      title: 'Школа разработки интерфейсов',
      studentsNumber: 21,
    },
    {
      id: 'design',
      title: 'Школа мобильного дизайна',
      studentsNumber: 22,
    },

  ],
  classrooms: [
    {
      id: '1',
      title: 'ауд. Желтый желтохвостик',
      capacity: 23,
      locationDescription: 'Прямо направо по лестнице в Желтый желтохвостик',
    },
    {
      id: 'littleClassroomId',
      title: 'ауд. Желтый желтохвостик',
      capacity: 1,
      locationDescription: 'Прямо направо по лестнице в Желтый желтохвостик',
    },
    {
      id: 'bigClassroomId',
      title: 'ауд. Желтый желтохвостик',
      capacity: 100,
      locationDescription: 'Прямо направо по лестнице в Желтый желтохвостик',
    },
  ],
};

const testSchedule = new Schedule({ data: testData });

const getIDs = items => items.map(i => i.id);

describe('Schedule class', () => {

  beforeEach(() => {
    testSchedule.reset(testData);
  });

  it('creates schedule from initial data', () => {
    const data = { ...testData };
    const schedule = new Schedule({ data });

    const actual = JSON.stringify(schedule);
    const expected = JSON.stringify(data);

    expect(actual).toEqual(expected);
  });

  describe('Validation', () => {
    describe('checkClassroomCapacityForLesson', () => {
      it('should throw if classroom capacity less than number of students 1', () => {
        const newLesson = {
          ...testLesson,
          id: 'test',
          classroomId: 'littleClassroomId',
        };
        const t = () => testSchedule.addLesson(newLesson);

        expect(t).toThrowError(
          ScheduleErrorMessages.classroomCapacity('littleClassroomId', 1, 21),
        );
      });

      it('should throw if classroom capacity less than number of students 2', () => {
        const newLesson = {
          ...testLesson,
          id: 'test',
          classroomId: '1',
          schoolIds: [
            'frontend',
            'design'
          ],
        };
        const t = () => testSchedule.addLesson(newLesson);

        expect(t).toThrowError(
          ScheduleErrorMessages.classroomCapacity('1', 23, 43),
        );
      });
    });

    describe('checkOneLessonForSchoolAtTime', () => {
      it('should throw when add the lesson with the same time and school 1', () => {
        const newLesson = {
          ...testLesson,
          id: 'test',
        };
        const t = () => testSchedule.addLesson(newLesson);

        expect(t).toThrowError(ScheduleErrorMessages.oneLessonForSchoolAtTime);
      });
      it('should throw when add the lesson with the same time and school 2', () => {
        const newLesson = {
          ...testLesson,
          classroomId: 'bigClassroomId',
          id: 'test',
          schoolIds: [
            'design',
            'frontend'
          ],
        };
        const t = () => testSchedule.addLesson(newLesson);
        expect(t).toThrowError(ScheduleErrorMessages.oneLessonForSchoolAtTime);
      });
      it('should throw when add the lesson with the same school and overlapping time 1', () => {
        const newLesson = {
          ...testLesson,
          id: 'test',
          timeStart: '15:00',
          timeEnd: '17:00',
        };
        const t = () => testSchedule.addLesson(newLesson);
        expect(t).toThrowError(ScheduleErrorMessages.oneLessonForSchoolAtTime);
      });
      it('should throw when add the lesson with the same school and overlapping time 2', () => {
        const newLesson = {
          ...testLesson,
          id: 'test',
          timeStart: '13:00',
          timeEnd: '14:01',
        };
        const t = () => testSchedule.addLesson(newLesson);
        expect(t).toThrowError(ScheduleErrorMessages.oneLessonForSchoolAtTime);
      });
      it('should not throw when add the lesson with the same time but another school', () => {
        const newLesson = {
          ...testLesson,
          id: 'test',
          schoolIds: ['design'],
        };
        const t = () => testSchedule.addLesson(newLesson);
        expect(t).not.toThrowError(ScheduleErrorMessages.oneLessonForSchoolAtTime);
      });
    });

    describe('checkOneLessonInOneClassroomAtTime', () => {

      it('should throw when add lesson with classroom that is already occupied at time', () => {
        const newLesson = {
          ...testLesson,
          id: 'test',
          schoolIds: ['design'],
        };
        const t = () => testSchedule.addLesson(newLesson);
        expect(t).toThrowError(ScheduleErrorMessages.oneLessonInOneClassroomAtTime('1', 'testLesson'));
      });
    });
  });

  describe('addLesson', () => {
    it('adds lesson', () => {
      const newLesson = {
        ...testLesson,
        id: 'test',
        timeStart: '17:00',
        timeEnd: '19:00',
      };
      testSchedule.addLesson(newLesson);

      const actual = getIDs(testSchedule.getScheduleForSchool('frontend'));
      const expected = getIDs([
        testLesson,
        newLesson
      ]);

      expect(actual).toEqual(expected);
    });
  });

  describe('getScheduleForSchool', () => {
    const frontendLesson = {
      ...testLesson,
      id: 'test1',
      'date': '10.05.2017',
      timeStart: '17:00',
      timeEnd: '19:00',
    };
    const newLessons = [
      frontendLesson,
      {
        ...testLesson,
        id: 'test2',
        schoolIds: ['design'],
        timeStart: '11:00',
        timeEnd: '12:00',
      },
      {
        ...testLesson,
        id: 'test3',
        schoolIds: ['design'],
        timeStart: '13:00',
        timeEnd: '14:00',
      },
    ];

    beforeEach(() => {
      newLessons.forEach(lesson => {
        testSchedule.addLesson(lesson);
      });
    });

    it('return lessons for specific school', () => {
      const actual = getIDs(testSchedule.getScheduleForSchool('frontend'));
      const expected = [
        'testLesson',
        'test1'
      ];

      expect(actual).toEqual(expected);
    });

    it('return lessons for specific school and date 1', () => {
      const actual = getIDs(
        testSchedule.getScheduleForSchool('design', {
          min: {
            date: '07.05.2017',
          },
          max: {
            date: '09.05.2017',
          },
        })
      );
      const expected = [
        'test2',
        'test3'
      ];

      expect(actual).toEqual(expected);
    });

    it('return lessons for specific school and date 2', () => {
      const actual = getIDs(
        testSchedule.getScheduleForSchool('design', {
          min: {
            date: '08.05.2017',
          },
          max: {
            date: '11.05.2017',
          },
        })
      );
      const expected = [
        'test2',
        'test3'
      ];

      expect(actual).toEqual(expected);
    });
  });


  describe('getScheduleForClassroom', () => {
    const newLessons = [
      {
        ...testLesson,
        id: 'test1',
        schoolIds: ['design'],
        timeStart: '10:00',
        timeEnd: '11:00',
        classroomId: '1'
      },
      {
        ...testLesson,
        id: 'test2',
        schoolIds: ['design'],
        timeStart: '11:00',
        timeEnd: '12:00',
        classroomId: 'bigClassroomId'
      },
      {
        ...testLesson,
        id: 'test3',
        schoolIds: ['design'],
        timeStart: '13:00',
        timeEnd: '14:00',
        classroomId: 'bigClassroomId'

      },
    ];

    beforeEach(() => {
      newLessons.forEach(lesson => {
        testSchedule.addLesson(lesson);
      });
    });

    it('return lessons for specific classroom 1', () => {
      const actual = getIDs(testSchedule.getScheduleForClassroom('1'));
      const expected = [
        'test1',
        'testLesson',
      ];
      expect(actual).toEqual(expected);
    });

    it('return lessons for specific classroom 2', () => {
      const actual = getIDs(testSchedule.getScheduleForClassroom('bigClassroomId'));
      const expected = [
        'test2',
        'test3',
      ];
      expect(actual).toEqual(expected);
    });
  });

  describe('lessonsToData', () => {
    it('maps lessons to lessons with expanded data about schools and classrooms', () => {
      const actual = testSchedule.getLessons();

      const expected = [{
        title: 'Адаптивная вёрстка',
        teacherName: 'Дмитрий Душкин',
        id: 'testLesson',
        schools: [
          {
            id: 'frontend',
            title: 'Школа разработки интерфейсов',
            studentsNumber: 21,
          }
        ],
        classroom: {
          id: '1',
          title: 'ауд. Желтый желтохвостик',
          capacity: 23,
          locationDescription: 'Прямо направо по лестнице в Желтый желтохвостик',
        },
        date: '08.05.2017',
        timeStart: '14:00',
        timeEnd: '16:00'
      }];

      expect(actual).toEqual(expected);
    })
  });
});

