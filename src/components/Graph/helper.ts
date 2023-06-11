export const maxMultiDim = (table: Array<Array<number>>) => {
  return Math.max(...table.map((data) => Math.max(...data)));
};
