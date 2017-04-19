const shortid = require('shortid');

export interface IClassroom {
  id: string;
  title: string;
  capacity: number;
  locationDescription: string;
}

export class Classroom {
  id: string;
  title: string;
  capacity: number;
  locationDescription: string;

  constructor (classroom: IClassroom) {
    const id = classroom.id ? classroom.id : shortid.generate();
    Object.assign(this, {
      ...classroom,
      id,
    });
  }
}
