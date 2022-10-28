function preMove(start) {
  if (start > 5) return true;
}

function nextMove(end, total) {
  if (total > 5 && total !== end) return true;
}

function pageArr(start, end) {
  let pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
}

const calcPage = {preMove, nextMove, pageArr};
export default calcPage;
