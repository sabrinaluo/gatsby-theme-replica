// yyyy-MM-dd
export const getDateString = (date: Date | string | number) =>
  new Date(date).toLocaleDateString('fr-CA');
