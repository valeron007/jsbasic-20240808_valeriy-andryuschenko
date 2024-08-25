function getMinMax(str) {
  let data = str.split(' ').filter(item => {
    return Number(item);
  }).map(item => Number(item));

  return {
    min: Math.min(...data),
    max: Math.max(...data),
  }
}
