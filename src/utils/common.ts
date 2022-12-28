export const capitalizeString = (str: string) => {
  if (!str) return '';
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};
export const getMarkColor = (mark: number) => {
  return mark >= 8 ? 'green' : mark >= 5 ? 'orange' : 'red';
};
