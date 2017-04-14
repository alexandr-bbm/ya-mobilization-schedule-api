import { IScheduleData } from './model';

export class ScheduleInterface {

  private scheduleData: IScheduleData;

  constructor(data = testData) {
    this.scheduleData = data;
  }
}

import { testData } from './testData/index';

console.log(testData);