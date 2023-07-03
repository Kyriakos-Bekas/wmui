// Return the date in minutes relative from now
export const getStartTimeFromDate = (time: Date) => {
  const now = new Date();

  const nowInMinutes = now.getHours() * 60 + now.getMinutes();
  const timeInMinutes = time.getHours() * 60 + time.getMinutes();

  // If the time is before now, add 24 hours
  const result =
    timeInMinutes < nowInMinutes
      ? timeInMinutes + 24 * 60 - nowInMinutes
      : timeInMinutes - nowInMinutes;

  return result;
};
