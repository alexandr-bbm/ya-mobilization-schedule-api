import { ILesson, Lesson } from './lesson';
import { ISchool, School } from './school';
import { Classroom, IClassroom } from './classroom';
import { mockData } from '../mock/index';
import ScheduleError, { ScheduleErrorMessages } from '../utils/errors';
import { IDateRange, IInputDateRange, inputDateRangeToDateRange } from '../utils/dates';

export interface ISchedule {
  lessons: ILesson[],
  schools: ISchool[],
  classrooms: IClassroom[];
}

interface IScheduleConstructorOptions {
  data?: ISchedule; // creates schedule with your data
  mockMode?: boolean; // creates schedule with mock data
}

export class Schedule {

  private lessons: Lesson[] = [];
  private schools: School[] = [];
  private classrooms: Classroom[] = [];

  constructor(options?: IScheduleConstructorOptions) {
    if (options && options.data) {
      this.initialize(options.data);
    } else if (options && options.mockMode) {
      this.initialize(mockData);
    }
  }

  private initialize = (data: ISchedule) => {
    data.classrooms.forEach(this.addClassroom);
    data.schools.forEach(this.addSchool);
    data.lessons.forEach(this.addLesson);
  };

  private getScheduleForDateRange =
    (inputDateRange?: IInputDateRange, externalPredicate?: (lesson: ILesson) => boolean): ILesson[] => {
      let datePredicate = (lesson) => true;

      if (inputDateRange) {
        const dateRange = inputDateRangeToDateRange(inputDateRange);
        if (!dateRange.min && !dateRange.max) {
          throw new ScheduleError(`dateRange должно содержать поля min или max`);
        } else if (!dateRange.min) {
          dateRange.min = new Date(0);
        } else if (!dateRange.max) {
          dateRange.max = {
            getTime() {
              return Infinity;
            }
          } as Date;
        }

        if (dateRange.min.getTime() >= dateRange.max.getTime()) {
          throw new ScheduleError('`dateRange.min` should be less `dateRange.max`');
        }

        datePredicate = lesson =>
        lesson.dateStart.getTime() > dateRange.min.getTime()
        && lesson.dateEnd.getTime() < dateRange.max.getTime();
      }

      let predicate = datePredicate;

      if (typeof externalPredicate === 'function') {
        predicate = lesson => datePredicate(lesson) && externalPredicate(lesson);
      }


      const lessons = this.lessons
        .filter(predicate)
        .sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());

      return this.lessonsToData(lessons)
    };

  /**
   * Просмотр расписания школы в заданный интервал дат.
   */
  public getScheduleForSchool = (schoolId: string, dateRange?: IInputDateRange): ILesson[] => {
    if (schoolId === undefined) {
      throw new ScheduleError(`Required parameter schoolId is undefined`);
    }

    const school = this.schools.find(school => school.id === schoolId);
    if (!school) {
      throw new ScheduleError(`There is no school with id=${schoolId} `);
    }

    return this.getScheduleForDateRange(
      dateRange,
      lesson => lesson.schoolIds.includes(schoolId)
    );
  };

  /**
   * Просмотр графика лекций в аудитории в заданный интервал дат.
   */
  public getScheduleForClassroom = (classroomId: string, dateRange?: IInputDateRange): ILesson[] => {
    if (classroomId === undefined) {
      throw new ScheduleError(`Обязательный параметр classRoomId=${classroomId}`);
    }

    const classroom = this.classrooms.find(classroom => classroom.id === classroomId);
    if (!classroom) {
      throw new ScheduleError(`Не существует аудитории с id=${classroomId} `);
    }

    return this.getScheduleForDateRange(
      dateRange,
      lesson => lesson.classroomId === classroomId,
    );
  };

  public getLessons = () => this.lessonsToData(this.lessons);

  public getClassrooms = () => this.classrooms;

  public addLesson = (lesson: ILesson) => {
    this.checkClassroomIdExists(lesson.classroomId);
    lesson.schoolIds.forEach(id => this.checkSchoolIdExists(id));
    this.checkDuplicateItemId(lesson.id, this.lessons, 'Lesson');

    const newLesson = new Lesson(lesson);
    this.checkClassroomCapacityForLesson(newLesson);
    this.checkOneLessonForSchoolAtTime(newLesson);
    this.checkOneLessonInOneClassroomAtTime(newLesson);
    this.lessons.push(new Lesson(lesson));
  };

  public addSchool = (school: ISchool) => {
    this.checkDuplicateItemId(school.id, this.schools, 'School');
    this.schools.push(new School(school));
  };

  public addClassroom = (classroom: IClassroom) => {
    this.checkDuplicateItemId(classroom.id, this.classrooms, 'Classroom');
    this.classrooms.push(new Classroom(classroom));
  };

  public updateLesson(id, lesson: ILesson) {
    this.updateItem(id, lesson, this.lessons);
  }

  public updateSchool(id: string, school: ISchool) {
    this.updateItem(id, school, this.schools);
  }

  public updateClassroom(id: string, classroom: IClassroom) {
    this.updateItem(id, classroom, this.classrooms);
  }

  private updateItem<T extends { id: string }>(id: string, patchItem: T, currentItems: T[]) {
    const existingItem = currentItems.find(item => item.id === id);
    if (!existingItem) {
      throw new ScheduleError(`Item with id=${id} does not exist`);
    }

    Object.keys(patchItem).forEach(key => {
      if (!existingItem.hasOwnProperty(key)) {
        throw new ScheduleError(`Attempted to update unknown field ${key}`);
      }
      existingItem[key] = patchItem[key];
    });
  }

  private checkClassroomIdExists = (id: string) => {
    if (!this.classroomsIds.includes(id)) {
      throw new ScheduleError(`Can't add Lesson with unknown classroomId=${id}`);
    }
  };

  private checkSchoolIdExists = (id: string) => {
    if (!this.schoolsIds.includes(id)) {
      throw new ScheduleError(`Can't add Lesson with unknown schoolId=${id}`);
    }
  };

  /** Вместимость аудитории должна быть больше или равной количеству студентов на лекции. */
  private checkClassroomCapacityForLesson = (newLesson: Lesson) => {
    const requiredCapacity = newLesson.schoolIds.reduce((prev, next) =>
      prev + this.getSchoolById(next).studentsNumber,
      0
    );

    const classroomCapacity = this.getClassroomById(newLesson.classroomId).capacity;

    if (requiredCapacity > classroomCapacity) {
      throw new ScheduleError(
        ScheduleErrorMessages.classroomCapacity(newLesson.classroomId, classroomCapacity, requiredCapacity),
      );
    }
  };

  /** Для одной школы не может быть двух лекций одновременно.*/
  private checkOneLessonForSchoolAtTime = (newLesson: Lesson) => {
    this.lessons
      .filter(l => l.schoolIds.some(id => newLesson.schoolIds.includes(id)))
      .forEach(existingLesson => {
        if (Lesson.isOverlap(newLesson, existingLesson)) {
          throw new ScheduleError(ScheduleErrorMessages.oneLessonForSchoolAtTime)
        }
      });
  };

  /** В одной аудитории не может быть одновременно двух разных лекций. */
  private checkOneLessonInOneClassroomAtTime = (newLesson: Lesson) => {
    this.lessons
      .filter(l => l.classroomId === newLesson.classroomId)
      .forEach(existingLesson => {
        if (Lesson.isOverlap(newLesson, existingLesson)) {
          throw new ScheduleError(
            ScheduleErrorMessages.oneLessonInOneClassroomAtTime(
              newLesson.classroomId,
              existingLesson.id,
            )
          );
        }
      })
  };

  private checkDuplicateItemId<T extends {id: string}> (id: string, items: T[], itemName: string) {
    if (items.find(l => l.id === id)) {
      throw new ScheduleError(`${itemName} with id=${id} exists.`)
    }
  };

  public reset (data: ISchedule) {
    this.lessons = [];
    this.classrooms = [];
    this.schools = [];
    if (data) {
      this.initialize(data);
    }
  }

  get classroomsIds() {
    return this.classrooms.map(c => c.id);
  }
  get schoolsIds() {
    return this.schools.map(c => c.id);
  }

  getSchoolById = (id: string): School => {
    return this.schools.find(school => school.id === id);
  };

  getClassroomById(id: string): Classroom {
    return this.classrooms.find(classroom => classroom.id === id);
  }

  public lessonsToData = (lessons: ILesson[]) => {
    return lessons.map(lesson => {
      const dataLesson = ({
        ...lesson,
        classroom: this.getClassroomById(lesson.classroomId),
        schools: lesson.schoolIds.map(this.getSchoolById),
      });
      delete dataLesson.classroomId;
      delete dataLesson.schoolIds;
      return dataLesson;
    });
  }
}

