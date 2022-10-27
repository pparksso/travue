export const preMove = (start) => {
  if (start > 5) return true;
};

export const nextMove = (end, total) => {
  if (total > 5 && total !== end) return true;
};

export const pageArr = (start, end) => {
  let pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
};
