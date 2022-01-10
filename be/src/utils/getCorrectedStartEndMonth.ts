import { endOfMonth, startOfMonth } from 'date-fns';
import HttpException from '../exceptions/HttpException';

const getCorrectedStartEndMonth = (date: Date, timezoneOffset?: number) => {
  try {
    const startMonth = startOfMonth(date);
    const endMonth = endOfMonth(date);
    const offset = timezoneOffset ? timezoneOffset : startMonth.getTimezoneOffset();
    startMonth.setTime(startMonth.getTime() - offset * 60 * 1000);
    endMonth.setTime(endMonth.getTime() - offset * 60 * 1000);
    return { startMonth, endMonth };
  } catch (error) {
    throw new HttpException(500, 'Something went wrong');
  }
};
export default getCorrectedStartEndMonth;
