function isEmpty(obj) {
  let isKey = true;
  for (let key in obj) isKey = false;

  return isKey;
}
