import ejs from '../ejercicios/Ej01_Funciones.js';
import isFunction from 'lodash/isFunction';

describe('01 - #identity', () => {
	test('debe retornar el mismo argumento con el que fue llamado', () => {
		expect(ejs.identity(3)).toEqual(3);
		expect(ejs.identity('3')).toEqual('3');
		expect(ejs.identity(true)).toEqual(true);
		expect(ejs.identity(false)).toEqual(false);
		expect(ejs.identity(undefined)).toEqual(undefined);
		expect(ejs.identity(null)).toEqual(null);
	});
});

describe('03 - #add, #sub, #mul', () => {

	test('#sum debe sumar dos valores', () => {
		expect(ejs.add(1, 2)).toEqual(3);
	});

	test('#mul debe multiplicar dos valores', () => {
		expect(ejs.mul(1, 2)).toEqual(2);
	});

	test('#sub debe restar dos valores', () => {
		expect(ejs.sub(1, 2)).toEqual(-1);
	})
});

describe('04 - #identityf', () => {
	test('deber retornar una función', () => {
		expect(isFunction(ejs.identityf(3))).toEqual(true);
	});

	test('debe retornar el valor original al llamar a la función resultante', () => {
		expect(ejs.identityf(3)()).toEqual(3);
		expect(ejs.identityf('3')()).toEqual('3');
		expect(ejs.identityf(true)()).toEqual(true);
		expect(ejs.identityf(false)()).toEqual(false);
		expect(ejs.identityf(undefined)()).toEqual(undefined);
		expect(ejs.identityf(null)()).toEqual(null);
	});
});

describe('05 - #addf', () => {
	test('deber retornar una función', () => {
		expect(isFunction(ejs.addf(3))).toEqual(true);
	});

	test('debe sumar dos valores en dos invocaciones', () => {
		expect(ejs.addf(3)(2)).toEqual(5);
	});
});

describe('06 - #liftf', () => {
	var mulf = ejs.liftf((a, b) => a * b);

	test('deber retornar una función', () => {
		expect(isFunction(mulf)).toEqual(true);
	});

	test('debe retornar el valor de la función binaria tras dos invocaciones', () => {
		expect(mulf(3)(2)).toEqual(6);
	});
});

describe('07 - #curry', () => {
	var add3 = ejs.curry(ejs.add, 3);

	test('deber retornar una función', () => {
		expect(isFunction(add3)).toEqual(true);
	});

	test('debe retornar el valor de la función binaria luego de ser invocada', () => {
		expect(add3(3)).toEqual(6);
	});
});

describe('08 - #incX', () => {
	test('#incA debe incrementar un valor en 1', () => {
		expect(ejs.incA(3)).toEqual(4);
	});
	test('#incB debe incrementar un valor en 1', () => {
		expect(ejs.incB(3)).toEqual(4);
	});
	test('#incC debe incrementar un valor en 1', () => {
		expect(ejs.incC(3)).toEqual(4);
	});
});

describe('09 - #twice', () => {
	var double = ejs.twice(ejs.add);

	test('debe retornar una función', () => {
		expect(isFunction(double)).toEqual(true);
	});

	test('invocar la función resultante debe retornar lo mismo que llamar la función origina con el mismo argumento repetido', () => {
		expect(double(11)).toEqual(ejs.add(11, 11));
	});
});

describe('10 - #reverse', () => {
	var bus = ejs.reverse(ejs.sub);

	test('debe retornar una función', () => {
		expect(isFunction(bus)).toEqual(true);
	});

	test('debe retornar una función que llama la función original con los argumentos invertidos.', () => {
		expect(bus(3, 2)).toEqual(ejs.sub(2, 3));
	});
});

describe('11 - #composeu', () => {

	var double = ejs.twice(ejs.add);
	var square = ejs.twice(ejs.mul);
	var doubleSquare = ejs.composeu(double, square);

	test('debe retornar una función', () => {
		expect(isFunction(doubleSquare)).toEqual(true);
	});

	test('debe llamar a ambas funciones pasando el argumento', () => {
		expect(doubleSquare(5)).toEqual(100);
	});

});

describe('12 - #composeb', () => {

	test('debe retornar una función', () => {
		expect(isFunction(ejs.composeb(ejs.add, ejs.mul))).toEqual(true);
	});

	test('debe llamar a ambas funciones pasando los argumentos', () => {
		expect(ejs.composeb(ejs.add, ejs.mul)(2, 3, 7)).toEqual(35);
	});

});

describe('13 - #limit', () => {

	var add_ltd = ejs.limit(ejs.add, 1);

	test('debe retornar una función', () => {
		expect(isFunction(add_ltd)).toEqual(true);
	});

	test('la función resultante debe poder ser llamada solo una vez', () => {
		expect(add_ltd(3, 4)).toEqual(7);
		expect(add_ltd(3, 4)).toEqual(undefined);
	});

});

describe('14 - #from', () => {

	var INITIAL = 1;
	var index = ejs.from(INITIAL);

	test('debe retornar una función', () => {
		expect(isFunction(index)).toEqual(true);
	});

	test('la función resultante debe devolver el número inicial al ser invocada por primera vez', () => {
		expect(index()).toEqual(INITIAL);
		expect(index()).toEqual(INITIAL + 1);
	});

	test('la función resultante debe retornar un número incremental con cada nueva invocación', () => {
		expect(index()).toEqual(INITIAL + 2);
		expect(index()).toEqual(INITIAL + 3);
		expect(index()).toEqual(INITIAL + 4);
	});

});

describe('15 - #to', () => {

	var INITIAL = 1;
	var FINAL = 5;
	var index = ejs.to(ejs.from(1), FINAL);

	test('debe retornar una función', () => {
		expect(isFunction(index)).toEqual(true);
	});

	test('la función resultante debe devolver el número inicial al ser invocada por primera vez', () => {
		expect(index()).toEqual(INITIAL);
		expect(index()).toEqual(INITIAL + 1);
	});

	test('la función resultante debe retornar un número incremental con cada nueva invocación', () => {
		expect(index()).toEqual(INITIAL + 2);
		expect(index()).toEqual(INITIAL + 3);
		expect(index()).toEqual(INITIAL + 4);
	});

	test('la función resultante debe parar de emitir mensajes cuando llega al valor límite', () => {
		expect(index()).toEqual(undefined);
	});

});

describe('16 - #fromTo', () => {

	var INITIAL = 0;
	var FINAL = 5;
	var index = ejs.fromTo(INITIAL, FINAL);

	test('debe retornar una función', () => {
		expect(isFunction(index)).toEqual(true);
	});

	test('la función resultante debe devolver el número inicial al ser invocada por primera vez', () => {
		expect(index()).toEqual(INITIAL);
		expect(index()).toEqual(INITIAL + 1);
	});

	test('la función resultante debe retornar un número incremental con cada nueva invocación', () => {
		expect(index()).toEqual(INITIAL + 2);
		expect(index()).toEqual(INITIAL + 3);
		expect(index()).toEqual(INITIAL + 4);
	});

	test('la función resultante debe parar de emitir mensajes cuando llega al valor límite', () => {
		expect(index()).toEqual(undefined);
	});

});

describe('17 y 18 - #element', () => {

	var LIST = ['a', 'b', 'c'];
	var INITIAL = 1;
	var FINAL = 3;
	var ele = ejs.element(LIST, ejs.fromTo(1, 3));

	test('debe retornar una función', () => {
		expect(isFunction(ele)).toEqual(true);
	});

	test('la función resultante debe retornar el primer elemento de la lista.', () => {
		expect(ele()).toEqual(LIST[1]);
	});

	test('la función resultante debe retornar los siguientes elementos de la lista cuando es vuelta a invocar.', () => {
		expect(ele()).toEqual(LIST[2]);
	});

	test('la función resultante debe parar de emitir mensajes cuando llega al valor límite', () => {
		expect(ele()).toEqual(undefined);
	});

	test('Si no se pasa un generador se crea uno por defecto que devuelve toda la lista', () => {
		var ele = ejs.element(LIST);
		expect(ele()).toEqual(LIST[0]);
		expect(ele()).toEqual(LIST[1]);
		expect(ele()).toEqual(LIST[2]);
		expect(ele()).toEqual(undefined);
	});

});

describe('19 - #collect', () => {

	var INITIAL = 0;
	var FINAL = 2;
	var array = [];
	var col = ejs.collect(ejs.fromTo(INITIAL, FINAL), array);

	test('debe retornar una función', () => {
		expect(isFunction(col)).toEqual(true);
	});

	test('debe almacenar el resultado del generador en la lista', () => {
		col();
		col();
		expect(col()).toEqual(undefined);
		expect(array).toEqual([0, 1]);
	});

});

describe('20 - #filter', () => {

	var INITIAL = 0;
	var FINAL = 5;
	var fil = ejs.filter(ejs.fromTo(INITIAL, FINAL), (x) => x % 3 === 0);

	test('debe retornar una función', () => {
		expect(isFunction(fil)).toEqual(true);
	});

	test('la función resultante debe retornar valores según el filtro predicado', () => {
		expect(fil()).toEqual(0);
		expect(fil()).toEqual(3);
		expect(fil()).toEqual(undefined);
	});

});

describe('21 - #concat', () => {

	var INITIAL = 0;
	var MID = 3;
	var FINAL = 2;
	var con = ejs.concat(ejs.fromTo(INITIAL, MID), ejs.fromTo(INITIAL, FINAL));

	test('debe retornar una función', () => {
		expect(isFunction(con)).toEqual(true);
	});

	test('la función resultante debe retornar los valores de ambos generadores concatenados', () => {
		expect(con()).toEqual(0);
		expect(con()).toEqual(1);
		expect(con()).toEqual(2);
		expect(con()).toEqual(0);
		expect(con()).toEqual(1);
		expect(con()).toEqual(undefined);
	});

});

describe('22 - #repeat', () => {

	var array = [];
	ejs.repeat(ejs.collect(ejs.fromTo(0, 4), array));

	test('el generador se debe haber llamado hasta finalizar', () => {
		expect(array).toEqual([0, 1, 2, 3]);
	});

});


