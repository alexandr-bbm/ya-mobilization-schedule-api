export interface IScheduleData {
  lessons: ILesson[],
  schools: ISchool[],
  classrooms: IClassroom[];
}

export interface ILesson {
  id: string;
  title: string;
  teacherName: string;
  dateStart: string;
  dateEnd: string;
  classRoom: string;
  schools: string[];
}

export interface ISchool {
  id: string;
  title: string;
  studentsNumber: number;
}

export interface IClassroom {
  id: string;
  title: string;
  capacity: number;
  locationDescription: string;
}