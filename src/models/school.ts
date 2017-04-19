const shortid = require('shortid');

export interface ISchool {
  id: string;
  title: string;
  studentsNumber: number;
}

export class School implements ISchool {
  id: string;
  title: string;
  studentsNumber: number;

  constructor (school: ISchool) {
    const id = school.id ? school.id : shortid.generate();
    Object.assign(this, {
      ...school,
      id,
    });
  }
}
