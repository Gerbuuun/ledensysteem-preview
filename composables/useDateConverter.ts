export const useDateConverter = () => {
  function toDateString(dateTimeString?: string): string {
    if (!dateTimeString) return '-';
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  function toFormkitString(dateTimeString?: string): string {
    if (!dateTimeString) return undefined;
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month >= 10 ? month : `0${month}` }-${day >= 10 ? day : `0${day}`}`;
  }

  return {
    toDateString,
    toFormkitString,
  }
}