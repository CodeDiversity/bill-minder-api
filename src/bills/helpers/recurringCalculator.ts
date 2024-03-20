import { RecurringFrequency } from '../entities/bill.entity';
import { addMonths, addWeeks, add } from 'date-fns';

export const recurringCalculator = (
  date: Date,
  frequency: RecurringFrequency = RecurringFrequency.MONTHLY,
) => {
  switch (frequency) {
    case RecurringFrequency.BIMONTHLY:
      return addMonths(date, 2);
    case RecurringFrequency.WEEKLY:
      return addWeeks(date, 1);
    case RecurringFrequency.MONTHLY:
      return addMonths(date, 1);
    case RecurringFrequency.QUARTERLY:
      return addMonths(date, 3);
    case RecurringFrequency.SEMIANNUALLY:
      return addMonths(date, 6);
    case RecurringFrequency.ANNUALLY:
      return add(date, { years: 1 });
    default:
      return add(date, { months: 1 });
  }
};
