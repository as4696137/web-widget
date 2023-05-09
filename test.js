var isPalindrome = function (x) {
  if (x < 0) {
    return false;
  }
  let xDigit = Math.floor(Math.log(x) / Math.log(10)) + 1;
  let xToArray = [];
  let costNumber = x;
  for (let i = 0; i < xDigit; i++) {
    let leftN = x % Math.pow(10, xDigit - i - 1);
    let pushN = (costNumber - leftN) / Math.pow(10, xDigit - i - 1);
    xToArray.push(pushN);
    costNumber = leftN;
  }

  for (let j = 0; j <= Math.floor(xToArray.length / 2) - 1; j++) {
    if (xToArray[j] !== xToArray[xToArray.length - j - 1]) {
      return false;
    }
  }

  return true;
};

console.log(isPalindrome(321));
