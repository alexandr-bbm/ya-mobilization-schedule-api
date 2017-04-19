import { Lesson } from '../lesson';
import ScheduleError, { ScheduleErrorMessages } from '../../utils/errors';

const baseLessonOptions = {
  id: '123',
  title: 'Qwert',
  teacherName: 'test',
  date: '14.12.2016',
  timeStart: '12:10',
  timeEnd: '14:00',
  classroomId: 'test',
  schoolIds: ['test'],
};

describe('Lesson class', () => {
  it('creates new Lesson with correct date', () => {
    const lesson = new Lesson(baseLessonOptions);
    expect(lesson.dateStart.getHours()).toBe(12);
    expect(lesson.dateStart.getMinutes()).toBe(10);
    expect(lesson.dateEnd.getHours()).toBe(14);
    expect(lesson.dateEnd.getMinutes()).toBe(0);
  });

  it('throws an exception if time passed in a wrong format', () => {
    const lessonOptions = {
      ...baseLessonOptions,
      timeStart: '1:25',
    };
    const f = () => new Lesson(lessonOptions);

    expect(f).toThrowError(ScheduleErrorMessages.parseHoursMinutes('1:25'));
  });

  it('throws an exception if timeStart less timeEnd', () => {
    const lessonOptions = {
      ...baseLessonOptions,
      timeStart: '11:25',
      timeEnd: '10:25',
    };
    const f = () => new Lesson(lessonOptions);

    expect(f).toThrowError(ScheduleErrorMessages.timeEndLessTimeStart);
  });

  it('throws an exception if date passed in wrong format', () => {
    const lessonOptions = {
      ...baseLessonOptions,
      date: '21/22/2015',
    };
    const f = () => new Lesson(lessonOptions);

    expect(f).toThrowError(ScheduleErrorMessages.parseDate('21/22/2015'));
  });
});

