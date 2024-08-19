function sumSalary(salaries) {
  let salary = 0;

  for (key in salaries) {
    let specialValue = salaries[key] !== Infinity && salaries[key] !== -Infinity && !isNaN(salaries[key]);
    if (typeof(salaries[key]) === 'number' && specialValue) {
      salary += salaries[key];
    }
  }
  return salary;
}

