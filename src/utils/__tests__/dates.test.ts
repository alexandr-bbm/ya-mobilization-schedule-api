import { stringsToDate } from '../dates';

describe('stringsToDate', () => {
  it('Converts date dd.mm.yyyy and time hh:mm to js date', () => {
    const actual = stringsToDate('31.05.2017', '10:00');
    expect(actual.getMinutes()).toBe(0);
    expect(actual.getHours()).toBe(10);
    expect(actual.getMonth()).toBe(4);
    expect(actual.getDate()).toBe(31);
    expect(actual.getFullYear()).toBe(2017);
  })
});