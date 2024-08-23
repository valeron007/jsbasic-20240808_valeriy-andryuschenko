function showSalary(users, age) {
  let salaries = users.filter(item => item.age <= age);
  let result = '';

  salaries.forEach((item, index) => {
    if (index === (salaries.length - 1)) {
      return result += `${item.name}, ${item.balance}`;
    }

    result += `${item.name}, ${item.balance}\n`;
  });

  return result;
}
