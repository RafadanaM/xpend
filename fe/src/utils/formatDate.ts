export const transactionDateFormat: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour12: false,
  hour: "numeric",
  minute: "numeric",
};

export const getCorrectDate = (date: string) => {
  const newDate = new Date(date);
  newDate.setTime(newDate.getTime() - newDate.getTimezoneOffset() * 60 * 1000);
  return newDate;
};

export const isMonthYearSameWithCurrent = (firstDate: Date) => {
  const currentDate = new Date();
  currentDate.setTime(
    currentDate.getTime() - currentDate.getTimezoneOffset() * 60 * 1000
  );

  return (
    currentDate.getMonth() === firstDate.getMonth() &&
    currentDate.getFullYear() === firstDate.getFullYear()
  );
};

export const formatDate = (
  stringDate: string,
  options?: Intl.DateTimeFormatOptions | undefined
): string => {
  try {
    const date = new Date(stringDate);
    return date.toLocaleString("en-GB", options);
  } catch (error) {
    return "";
  }
};

const addLeadingZero = (value: number) => {
  if (value < 10) {
    return `${0}${value}`;
  }
  return value;
};

export const formatToInput = (stringDate: string): string => {
  const date = new Date(stringDate);

  return `${date.getFullYear()}-${addLeadingZero(
    date.getMonth() + 1
  )}-${addLeadingZero(date.getDate())}T${addLeadingZero(
    date.getHours()
  )}:${addLeadingZero(date.getMinutes())}`;
};
