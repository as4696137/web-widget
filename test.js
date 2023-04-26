var isPalindrome = function (x) {
  if (x < 0) {
    return false;
  }
  for (let i = 0; i < (x.length - 1) / 2; x++) {
    if (x[i] !== x[x.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

let y = 100;

console.log(y[1]);
