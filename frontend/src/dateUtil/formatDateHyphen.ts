export const formatDateHyphen = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return (
    ("0000" + year).slice(-4) +
    "-" +
    ("00" + month).slice(-2) +
    "-" +
    ("00" + day).slice(-2)
  );
};
