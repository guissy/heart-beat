console.log('script start')

async function async1() {
  await async2();
  console.log('async1 end')
}

async function async2() {
  console.log('async2 end')
}

async1()

setTimeout(function () {
  console.log('setTimeout');
  console.log(Date.now());
}, 0);

new Promise(resolve => {
  console.log('Promise');
  console.log(Date.now());
  resolve()
})
  .then(function () {
    console.log('promise1')
    console.log(Date.now());
  })
  .then(function () {
    console.log('promise2')
    console.log(Date.now());
  })
console.log('script end');

export {}