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

let salaries = {
  John: 1000,
  Ann: 1600,
  Pete: 1300,
  Vasya: Infinity,
  month: 'December',
  currency: 'USD',
  isPayed: false
}

let salaryObj = {}

const m = Infinity;
console.log(typeof(m));

console.log(sumSalary(salaries));
console.log(sumSalary(salaryObj));


