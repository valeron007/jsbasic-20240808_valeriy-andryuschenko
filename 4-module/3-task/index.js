function isAge(cell) {
  return Number(cell.innerText) < 18;
}

function isGender(cell) {
  return cell.innerText === 'm';
}

function isStatusUndefined(cell) {
  return cell.dataset.available === undefined;
}

function isStatus(cell) {
  return cell.dataset.available === 'true';
}

function highlight(table) {
  let tableRows = Array.from(table.rows).slice(1);

  const indexAge = 1;
  const indexGender = 2;
  const indexStatus = 3;

  tableRows.forEach((tableRow) => {
    if (isAge(tableRow.cells[indexAge])) {
      tableRow.style.cssText = "text-decoration: line-through";
    }

    if (isGender(tableRow.cells[indexGender])) {
      tableRow.classList.add('male');
    } else {
      tableRow.classList.add('female');
    }

    if (isStatusUndefined(tableRow.cells[indexStatus])) {
      tableRow.setAttribute('hidden', true);
    } else {
      console.log(isStatus(tableRow.cells[indexStatus]));
      isStatus(tableRow.cells[indexStatus]) ? tableRow.classList.add('available') : tableRow.classList.add('unavailable');
    }

  })

}
