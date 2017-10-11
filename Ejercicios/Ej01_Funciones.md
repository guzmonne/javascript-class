# Ejercicios 01 - Funciones

## 1.

Escriba una función llamada identidad que tome un argumento y lo devuelva.

```javascript
identity(3);
// >>> 3
```

<details>
<summary>Solución</summary>

```javascript
function identity(arg) {
  return arg;
}
```

</details>

## 2.

Estudie los siguiente bloques de codigo, e intente determinar que retornara la función `log`.

```javascript
function funky(o) { o = null; }

var x = [];
funky(x);
log(x);
```

<details>
<summary>Solución</summary>

```javascript
// >>> []
```

</details>

```javascript
function swap(a, b) {
  var temp = a;
  a = b;
  b = temp;
}

var x = 1, y = 2;
swap(x, y);
log(x);
```

<details>
<summary>Solución</summary>

```javascript
// >>> 1
```

</details>

## 3.

Escriba tres funciones, `add`, `sub`, y `mul`, que tomen dos números y retornen su suma, diferencia, y producto respectivamente.

```javascript
add(3, 4);
// >>> 7
sub(3, 4);
// >>> -1
mul(3, 4);
// >>> 12
```

<details>
<summary>Solución</summary>

```javascript
var add = (a, b) => a + b;
var sub = (a, b) => a - b;
var mul = (a, b) => a * b;
```

</details>

## 4.

Escriba una función `identityf` que tome un argumento y retorne una función que retorna dicho argumento.

```javascript
var three = identityf(3);
three();
// >>> 3
```
<details>
<summary>Solución</summary>

```javascript
var identityf = (x) => () => x;
// O de forma tradicional.
function identityf(x) {
  return function() {
    return x;
  }
}
```

</details>

# 5.

Cree una función `addf` que sume dos argumentos a través de dos invocaciones.

```javascript
addf(3)(4);
// >>> 7
```

<details>
<summary>Solución</summary>

```javascript
var addf = (a) => (b) => a + b;
// O de forma tradicional
function addf(b) {
  return function(a) {
    return a + b;
  }
}
```

</details>

## 6.

Escriba una función `liftf` que tome una función binaria (función que consume dos argumentos), y la transforma en una función llamable con dos invocaciones.

```javascript
var mulf = liftf(mul);
mulf(3)(4);
// >>> 12
liftf(sub)(5)(6);
// >>> -1
```

<details>
<summary>Solución</summary>

```javascript
var liftf = (binary) => (a) => (b) => binary(a, b); 
```

</details>

## 7.

Escriba una función llamada `curry` que tome una función binaria más un argumento, y retorne una función que puede tomar un argumento y devolver el resultado de la función binaria original.

**OBS: recuerde que puede aprovechar funciones ya escritas para simplificar la tarea de crear funciones más complejas.**

```javascript
var add3 = curry(add, 3);
add3(4);
// >>> 7
curry(mul, 5)(6);
// >>> 30
```

<details>
<summary>Solución</summary>

```javascript
// Solución con sintaxis tradicional
function curry(binary, a) {
  return function (b) {
    return binary(a, b);
  }
}

// Función compatible con ES6.
var curry = (binary, a) => (b) => binary(a, b);

// Misma solución pero consumiendo la función liftf
// previamente implementada
var curry = (binary, a) => liftf(binary)(a);

// Utilizando el operador ... podemos extender esta
// función y permitir utilizar una cantidad indefinda
// de argumentos con ambas funciones.
var curry = (func, ...first) => (...second) => func(...firs, ...second);
```

</details>

## 8.

Utilizando las funciones creadas hasta ahora, construya tres versiones distintas de una función llamada `inc` que tome un número y lo incremente por 1.

```javascript
inc(5);
// >>> 6
inc(inc(5));
// >>> 7
```

<details>
<summary>Solución</summary>

```javascript
// 1.
var inc = addf(1);
// 2.
var inc = liftf(add)(1);
// 3.
var inc = curry(add, 1);
```

</details>

## 9.

Escribir una función llamada `twice` que tome una función binaria como argumento y devuelva una nueva función que tome un argumento, y devuelva el resultado de la función binaria, cuando le pasamos dicho argumento dos veces.

```javascript
add(11, 11);
// >>> 22
var doubl = twice(add);
doubl(11);
// >>> 22
var square = twice(mul);
square(11);
// >>> 121
```

<details>
<summary>Solución</summary>

```javascript
function twice(binary) {
  return function (a) {
    return binary(a, a);
  } 
}

const twice = (binary) => (a) => binary(a, a);
```

</details>

## 10.

Escriba una función llamada `reverse`, invierta los argumentos que consume una función binaria.

```javascript
var bus = reverse(sub);
bus(3, 2);
// >>> -1
```

<details>
<summary>Solución</summary>

```javascript
var reverse = (binary) => (a, b) => binary(b, a);

// Podemos hacer algo similar para una cantidad indeterminada de argumentos.
var reverse = (func) => (...args) => func(...args.reverse);
```

</details>

## 11.

Escriba una función llamada `composeu` que tome dos funciones unitarias (funciones que toman solo un argumento), y retorna una función unitaria que llama a las dos.

```javascript
composeu(doubl, square)(5);
// >>> 100
```

<details>
<summary>Solución</summary>

```javascript
function composeu(f, g) {
  return function(x) {
    return g(f(x));
  }
}

// O utilizando funciones tipo flecha:
var composeu = (f, g) => (x) => g(f(x));
```

</details>

## 12.

Escriba una función `composeb` que tome dos funciones binarias y retorne una función que llame a ambas.

```javascript
composeb(add, mul)(2, 3, 7);
// >>> 35
```

<details>
<summary>Solución</summary>

```javascript
var composeb = (f, g) => (x, y, z) => g(f(x, y), z);
```

</details>

## 13.

Escribir una función llamada `limit` que permita que una función binaria sea llamada una cantidad limitada de veces.

```javascript
var add_ltd = limit(add, 1);
add_ltd(3, 4);
// >>> 7
add_ltd(3, 4);
// >>> undefined
```

<details>
<summary>Solución</summary>

```javascript
var limit = (binary, count) => (x, y) => {
  if (count >= 1) {
    count -= 1;
    return binary(x, y);
  }
  return undefined;
}
```

</details>

## 14.

Escribir una función `from` que retorne un **generador** que produce una serie de valores a partir del valor de inicio.

```javascript
var index = from(0);
index();
// >>> 1
index();
// >>> 2
index();
// >>> 3
```

<details>
<summary>Solución</summary>

```javascript
const from = (start) => () => {
  var next = start;
  start += 1;
  return next;
}
```

</details>

## 15.

Escribir una función llamada `to`, que tome un generador y un valor final, y regrese un generador que producira valores hasta el valor límite.

**OBS: Recuerde que puede utilizar funciones creadas previamente para construir esta funcionalidad.**

```javascript
var index = to(from(1), 3);
index();
// >>> 1
index();
// >>> 2
index();
// undefined
```

<details>
<summary>Solución</summary>

```javascript
function to(generator, end) {
  return function() {
    var value = gen();
    if (value < end) return value;
    return undefined
  }
}

// Podemos re-utilizar la función `limit`
var to = (generator, end) => limit(generator, end);
```

</details>

## 16.

Escriba una función `fromTo` que retorne un generador que produzca valores dentro del rango especificado.

```javascript
var index = fromTo(0, 3);
index();
// >>> 0
// >>> 1
// >>> 2
```

<details>
<summary>Solución</summary>

```javascript
var fromTo = (start, end) => to(from(start), end);
```

</details>

## 17.

Escriba una función llamada `element` que tome una lista y un generador, y devuelva un generador que producira elementos de dicha lista.

```javascript
var ele = element(['a', 'b', 'c'], fromTo(1, 3));
ele();
// >>> 'b'
ele();
// >>> 'c'
ele();
// >>> undefined
```

<details>
<summary>Solución</summary>

```javascript
var element = (list, generator) => () => {
  var index = generator();
  return index !== undefined ? list[index] : undefined
}

// El operador ? seguido por el operador : funciona como un if...else..
// Por ejemplo, podríamos haber escrito la misma función de la siguiente
// manera:
function element(list, generator) {
  var index = generator();
  if (index !== undefined) {
    return array[index];
  } else {
    return undefined;
  }
}
```

</details>

## 18.

Modifique la función `element` para que el generador sea opcional. En caso de que no se pase el argumento, el generado devuelto iterara por toda la lista.

```javascript
var ele = element(['a', 'b', 'c']);
ele();
// >>> 'a'
ele();
// >>> 'b'
ele();
// >>> 'c'
ele();
// >>> undefined
```

<details>
<summary>Solución</summary>

```javascript
var element = (list, generator) => {
  generator || (generator = fromTo(0, list.length));
  return () => {
    var index = generator();
    return index !== undefined ? list[index] : undefined
  }
}
```

</details>

## 19.

Escribir una función llamada `collect` que tome un generador y una lista, para producir una función que colecte los resultados en una lista.

```javascript
var array = [];
var col = collect(fromTo(0, 2), array);

col();
// >>> 0
col();
// >>> 1
col();
// >>> undefined
log(array);
// >>> [0, 1]
```

<details>
<summary>Solución</summary>

```javascript
function collect(generator, array) {
  return function() {
    var value = generator();
    if (value !== undefined) {
      array.push(value);
    }
    return value;
  }
}
```

</details>

## 20.

Escriba una función llamada `filter` que tome un generador y una función (muchas veces nombrada "predicate function") que produzca un generador que devuelva solo los valores aprovados por la función predicado.

```javascript
var fil = filter(fromTo(0, 5), (x) => x % 3 === 0);

fil();
// >>> 0
fil();
// >>> 3
fil();
// >>> undefined
```

<details>
<summary>Solución</summary>

```javascript
var filter = (generator, predicate) => {
  return function recursive() {
    var value = generator();
    if (value === undefined || predicate(value) === true) {
      return value;
    }
    return recursive()
  }
}
```

</details>

## 21.

Escribir una función llamada `concat` que tome dos generadores y produzca un generador que combine ambas secuencias.

```javascript
var con = concat(fromTo(0, 3), fromTo(0, 2));
con();
// >>> 0
con();
// >>> 1
con();
// >>> 2
con();
// >>> 0
con();
// >>> 1
con();
// >>> undefined
```

<details>
<summary>Solución</summary>

```javascript
function concat(gen1, gen2) {
  var gen = gen1;
  return function() {
    var value = gen();
    if (value !== undefined) {
      return value;
    }
    gen = gen2;
    return gen();
  }
}

// Podemos extender esta función para tomar un número
// indefinido de generadores. Utilizamos la función
// `element` para crear un generador de generadores a
// partir de la lista de generadores producida por el
// operador ...
function concat(...gens) {
  var next = element(gens);
  var gen = next();
  return function recursive() {
    var value = gen();
    if (value === undefined) {
      gen = next();
      if (gen !== undefined) {
        return recur();
      }
    }
    return value;
  }
}
```

</details>

## 22.

Escribir un función llamada `repeat` que tome un generador y lo llame hasta que devuelva `undefined`.

```javascript
var array = [];
repeat(collect(fromTo(0, 4), array));
log(array);
// >>> 0, 1, 2, 3
```

<details>
<summary>Solución</summary>

```javascript
var repeat = (gen) => gen() !== undefined ? repeat(gen) : undefined;
```

</details>
