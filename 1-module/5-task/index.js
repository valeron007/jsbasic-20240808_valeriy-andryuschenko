function truncate(str, maxlength) {
  if (str.length < maxlength) {
    return str;
  } else if (str.length > maxlength) {
    return str.slice(0, maxlength - 1) + String.fromCharCode(8230);
  }

  return str.slice(0, maxlength - 1) + String.fromCharCode(8230);
}

let str1 = truncate('Вот, что мне хотелось бы сказать на эту тему:', 20);
console.log(str1)
let str2 = truncate('Всем привет!', 20);
console.log(str2)

let str3 = truncate('Вот, что мне хотелось бы сказать на эту тему:', 10);
console.log(str3)


//console.log(truncate('Всем привет!', 20));
// console.log(truncate('Вот, что мне хотелось бы сказать на эту тему:', 20));
//console.log('Всем привет!'.length >= 2);
