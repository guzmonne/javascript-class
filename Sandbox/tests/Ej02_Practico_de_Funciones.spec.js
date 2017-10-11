import createCesarCipherFrom from '../ejercicios/Ej02_Practico_de_Funciones.js';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';

describe('#createCesarCipherFrom', () => {
	const cesar = createCesarCipherFrom(7);

	test('debe retornar un objeto', () => {
		expect(isObject(cesar)).toBe(true);
	});

	test('el objeto debe tener solo dos propiedades', () => {
		expect(Object.keys(cesar).length).toEqual(2);
	});

	describe('.cipher', () => {

		test('debe ser una función', () => {
			expect(isFunction(cesar.cipher)).toBe(true);
		});

		test('debe codificar un mensjar correctamente', () => {
			const message = 'conatel iot';
			const expected = 'xjhvñzfucjñ';
			const actual = cesar.cipher(message);
			expect(actual).toEqual(expected);
		});

		test('debe sustituir los carácteres desconocidos por `*`', () => {
			const message = 'Conatel S.A. IoT';
			const expected = '*jhvñzfu****u*j*';
			const actual = cesar.cipher(message);
			expect(actual).toEqual(expected);
		});

	});

	describe('.decipher', () => {

		test('debe ser una función', () => {
			expect(isFunction(cesar.decipher)).toBe(true);
		});

		test('debe decodificar un mensjar correctamente', () => {
			const message = 'xjhvñzfucjñ';
			const expected = 'conatel iot';
			const actual = cesar.decipher(message);
			expect(actual).toEqual(expected);
		});

		test('debe sustituir los carácteres desconocidos por `*`', () => {
			const message = '*jhvñzfu****u*j*';
			const expected = '*onatel **** *o*';
			const actual = cesar.decipher(message);
			expect(actual).toEqual(expected);
		});

	});

});