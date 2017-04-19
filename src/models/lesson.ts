import ScheduleError, { ScheduleErrorMessages } from '../utils/errors';
import { stringsToDate } from '../utils/dates';
const shortid = require('shortid');


export interface ILesson {
  id: string;
  title: string;
  teacherName: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  classroomId: string;
  schoolIds: string[];
}

export class Lesson implements ILesson {
  id: string;
  title: string;
  teacherName: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  classroomId: string;
  schoolIds: string[];

  constructor(lesson: ILesson) {
    const {
      title,
      teacherName,
      date,
      timeStart,
      timeEnd,
      classroomId,
      schoolIds,
      id,
    } = lesson;

    const dateStart = stringsToDate(date, timeStart);
    const dateEnd = stringsToDate(date, timeEnd);

    if (dateStart.getTime() >= dateEnd.getTime()) {
      throw new ScheduleError(ScheduleErrorMessages.timeEndLessTimeStart);
    }

    Object.assign(this, {
      title,
      teacherName,
      id: id ? id : shortid.generate(),
      schoolIds,
      classroomId,
      date,
      timeStart,
      timeEnd,
    });
  }

  public get dateStart () {
    return stringsToDate(this.date, this.timeStart);
  }

  public get dateEnd () {
    return stringsToDate(this.date, this.timeEnd);
  }

  public static isOverlap (lesson1: Lesson, lesson2: Lesson): boolean {
    const a = lesson1.dateStart.getTime();
    const b = lesson1.dateEnd.getTime();
    const c = lesson2.dateStart.getTime();
    const d = lesson2.dateEnd.getTime();
    return (
      (a >= c && a < d)
      || (b > c && b <= d)
    )
  };
}