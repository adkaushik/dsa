const WEIGHTS_BY_VALUE = {
  1: 5,
  2: 3,
  4: 5,
  2: 3,
  5: 2
};

const CAPACITY = 10;

const weights = Object.keys(WEIGHTS_BY_VALUE);
const values = Object.values(WEIGHTS_BY_VALUE);

const maximizeValue = (n, c) => {
  if (n === 0 || c === 0) return 0;

  if (WEIGHTS_BY_VALUE[n] > c) return maximizeValue()
} 