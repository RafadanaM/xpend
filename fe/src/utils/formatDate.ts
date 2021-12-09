export const transactionDateFormat: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour12: false,
  hour: "numeric",
  minute: "numeric",
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
    date.getMonth()
  )}-${addLeadingZero(date.getDate())}T${addLeadingZero(
    date.getHours()
  )}:${addLeadingZero(date.getMinutes())}`;
};
