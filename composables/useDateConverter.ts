export const useDateConverter = () => {
  function toDateString(dateTimeString: string): string {
    return dateTimeString ? new Date(dateTimeString).toLocaleDateString() : '-';
  }

  return {
    toDateString,
  }
}