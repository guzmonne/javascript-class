// 01.
function identity(arg) {
  return arg;
}
// 03.
var add = (a, b) => a + b;
var sub = (a, b) => a - b;
var mul = (a, b) => a * b;
// 04.
var identityf = (x) => () => x;
// 05.
var addf = (a) => (b) => a + b;
// 06.
var liftf = (binary) => (a) => (b) => binary(a, b); 
// 07.
var curry = (func, ...first) => (...second) => func(...first, ...second);
// 08.
var incA = addf(1);
var incB = liftf(add)(1);
var incC = curry(add, 1);
// 09.
var twice = (binary) => (a) => binary(a, a);
// 10.
var reverse = (binary) => (a, b) => binary(b, a);
// 11.
var composeu = (f, g) => (x) => g(f(x));
// 12.
var composeb = (f, g) => (x, y, z) => g(f(x, y), z);
// 13.
var limit = (binary, count) => (x, y) => {
  if (count >= 1) {
    count -= 1;
    return binary(x, y);
  }
  return undefined;
}
// 14.
const from = (start) => () => {
  var next = start;
  start += 1;
  return next;
}
// 15.
var to = (generator, end) => limit(generator, end);
// 16.
var fromTo = (start, end) => to(from(start), end);
// 17.
function element(list, generator) {
  generator || (generator = fromTo(0, list.length + 1));
  return () => {
    var index = generator();
    return index !== undefined ? list[index] : undefined
  }
}
// 18.
function collect(generator, array) {
  return function() {
    var value = generator();
    if (value !== undefined) {
      array.push(value);
    }
    return value;
  }
}
// 19.
function filter(generator, predicate) {
  return function recursive() {
    var value = generator();
    if (value === undefined || predicate(value) === true) {
      return value;
    }
    return recursive()
  }
}
// 20.
function concat(...gens) {
  var next = element(gens);
  var gen = next();
  return function recursive() {
    var value = gen();
    if (value === undefined) {
      gen = next();
      if (gen !== undefined) {
        return recursive();
      }
    }
    return value;
  }
}

var repeat = (gen) => gen() !== undefined ? repeat(gen) : undefined;

// ****************************************************** //
// --- No modificar el codigo debajo de estas líneas. --- //
// ****************************************************** //
export default {
	identity,
	add,
	sub,
	mul,
	identityf,
	addf,
	liftf,
	curry,
	incA,
	incB,
	incC,
	twice,
	reverse,
	composeu,
	composeb,
	limit,
	from,
	to,
	fromTo,
	element,
	collect,
	filter,
	concat,
	repeat,
};