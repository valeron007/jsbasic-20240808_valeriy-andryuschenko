function makeDiagonalRed(table) {
  let tableRows = Array.from(table.rows);

  tableRows.forEach(function (tableRow, index) {
    tableRow.cells[index].style.backgroundColor = 'red';
  });
}
