function checkSpam(str) {
  let spam = str.toLowerCase()

  if (spam.includes('xxx')) return true;
  if (spam.includes('1xbet')) return true;

  return false;
}
