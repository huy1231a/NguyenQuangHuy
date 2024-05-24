// solution1 su dung vong lap
function solution1(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

console.log(solution1(1));

// solution2 su dung de quy 

function solution2(n) {
    if (n === 1) {
      return 1;
    } else {
      return n + solution2(n - 1);
    }
  }

console.log(solution2(3));


//solution 3 su dung phep tinh
function solution3(n) {
    return (n * (n + 1)) / 2;
  }

console.log(solution3(3));