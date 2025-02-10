// NOTE: use live server to see the result

const MIN = 1;
const MAX = 1341000000; // Maximum input for calculations to reach MAX INTEGER

function sum_to_n_a(n) {
  // loop Formula
  if (n < MIN || n > MAX) return 0;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

function sum_to_n_b(n) {
  // Gauss
  try {
    if (n < MIN || n > MAX) return 0;
    if (n <= 0) return 0;
    return (BigInt(n) * BigInt(n + 1)) / BigInt(2);
  } catch (error) {
    console.error('Error:', error.message);
    return -1;
  }
}

function sum_to_n_c(n) {
  try {
    if (n < MIN || n > MAX) return 0;
    return Array.from({ length: n }, (_, i) => i + 1).reduce((sum, num) => sum + num, 0);
  } catch (error) {
    console.error('Error:', error.message);
    return -1;
  }
}

document.getElementById('calculateBtn').addEventListener('click', function () {
  const inputElement = document.getElementById('inputN');
  const inputValue = parseInt(inputElement.value);

  //validate N
  if (inputElement.value.trim() === '' || inputValue < MIN || inputValue > MAX) {
    alert('N should be between 1 and 10,000 and cannot be empty.');
    return; // stop when N is invalid
  }

  const methods = [
    { name: 'Using For Loop', func: sum_to_n_a },
    { name: 'Using Gauss', func: sum_to_n_b },
    { name: 'Using Reduce', func: sum_to_n_c },
  ];

  methods.forEach((method) => {
    const start = performance.now();
    const result = method.func(inputValue);
    const end = performance.now();
    const time = end - start;

    document.getElementById(
      method.name === 'Using For Loop'
        ? 'forLoopResult'
        : method.name === 'Using Gauss'
        ? 'formulaResult'
        : 'recursionResult'
    ).innerHTML = `
      <h3>${method.name}</h3>
      <p>Result: ${result !== -1 ? result : 'Error during calculation'}</p>
      <p>Execution time: ${time.toFixed(3)} ms</p>
    `;
  });
});
