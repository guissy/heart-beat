/** 拼接字符串 或 累加数字 */
export function curry(this: unknown, ...args: any[]) {
  const cache = Array.isArray(this) ? this : [];
  const array = cache.concat(args);
  const fn = curry.bind(array) as Function;
  fn.toString = () => array.reduce((s, v) => s += String(v), '');
  fn.valueOf = () => array.reduce((s, v) => s += v, 0);
  return fn;
}

console.log(curry(1)(2)(3).toString());
console.log(curry(1)(2)(3).valueOf());