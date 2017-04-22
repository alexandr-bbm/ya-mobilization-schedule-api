import ScheduleError, { ScheduleErrorMessages } from './errors';

export interface IDateRange {
  min: Date;
  max: Date;
}

export interface IInputDateRange {
  min: {
    date: string;
    time?: string;
  };
  max: {
    date: string;
    time?: string;
  };
}

export function parseHoursMinutes (time: string) {
  const parsedTimeStart = time.match(/^(\d{2}):(\d{2})$/);
  if (!parsedTimeStart) {
    throw new ScheduleError(ScheduleErrorMessages.parseHoursMinutes(time));
  }
  const [unused, hours, minutes] = parsedTimeStart;
  return {
    hours: +hours,
    minutes: +minutes
  };
}

export function parseDate (date: string) {
  const parsedDate = date.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!parsedDate) {
    throw new ScheduleError(ScheduleErrorMessages.parseDate(date));
  }
  const [unused, day, month, year] = parsedDate;
  return {
    day: +day,
    month: +month,
    year: +year
  };
}

export function stringsToDate (date: string, time: string): Date {
  const { day, month, year } = parseDate(date);
  const { hours, minutes } = parseHoursMinutes(time);
  const jsDate = new Date(year, month - 1, day, hours, minutes);
  // jsDate.setTime( jsDate.getTime() + jsDate.getTimezoneOffset() * 60 * 1000);
  if (isNaN(jsDate.getTime())) {
    throw new ScheduleError(`Can't create date with passed options \
${JSON.stringify({year, month, day, hours, minutes})}`);
  }
  return jsDate;
}

export const inputDateRangeToDateRange = (inputDateRange: IInputDateRange): IDateRange => {
  return {
    min: stringsToDate(inputDateRange.min.date, inputDateRange.min.time || '00:00'),
    max: stringsToDate(inputDateRange.max.date, inputDateRange.max.time || '23:59'),
  }
};