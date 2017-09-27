var foo = "bar";

console.comment('bar');
function bar() {
  // Shadowing.
  console.log(foo);
  // >>> ¿?
  var foo = "baz";
  console.log(foo);
  // >>> "baz"
  return 123;
}

console.comment('bar()');
console.log(bar());
// >>> ¿?
console.comment('foo');
console.log(foo);

function baz(foo) {
  foo = "bam";
  bam = "yay";
  return {};
}

console.comment('IIFE');
(function IIFE(a, b, c, bar) {
  var foo = 'foo2'
  console.log(a);
  // >>> 1
  console.log(b);
  // >>> 2
  console.log(c);
  // >>> 3
  console.log(bar);
  // >>> bar
})(1, 2, 3, foo);


var foos = function bat() {
  function nas() {
    var foos = foo = bat
  }
  console.comment('bat.toString()');
  console.log(bat.toString());
  nas();
  // >>> ¿?
};

foos();

console.comment('foo.toString()');
console.log(foo.toString());

console.comment('bar.toString()');
console.log(bar.toString());

function bin() {
  return bos();
  // ---
  function bos() {
    // ...
  }
}
