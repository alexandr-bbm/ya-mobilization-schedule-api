// import * as ExtendableError from 'es6-error';

class ScheduleError {
  status: string;
  message: string;

  constructor(message) {
    this.message = message;
    return this;
  }
}

export const ScheduleErrorMessages = {
  classroomCapacity (classroomId: string, classroomCapacity: number, requiredCapacity: number) {
    return `The capacity of classroom with id=${classroomId} is ${classroomCapacity} \
which is not enough for ${requiredCapacity} students`
  },
  oneLessonForSchoolAtTime: `New lesson overlaps with existing lesson for school.`,
  oneLessonInOneClassroomAtTime (classroomId: string, ocuppiedLessonId: string) {
    return `Classroom with id=${classroomId} at this time is occupied by existing lesson \
with id=${ocuppiedLessonId}`
  },
  timeEndLessTimeStart: 'timeStart should be less than timeEnd.',
  parseHoursMinutes (time: string) {
    return `Time should be hh:mm format. You passed ${time}`;
  },
  parseDate (date: string) {
    return `Date should be dd.mm.yyyy format. You passed ${date}`;
  }
};

export default ScheduleError;