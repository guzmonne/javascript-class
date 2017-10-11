/**
 * Crea un objeto que permite cifar y decifrar mensajes de texto utilizando
 * el "cifrado de cesar", con la capacidad de configurarle el offset del
 * cifrado.
 * @param  {object} options Objeto de opciones.
 *  @param  {number} .offset   Offset del algoritmo de cifrado.
 *  @param  {string} .alphabet Alfabeto utilizado por el algoritmo.
 * @return {object}         Objeto de cifrado.
 */
function createCesarCipherFrom(options) {
    // Combinamos las opciones con opciones por defecto.
    options = Object.assign({
        offset: 4,
        alphabet: 'abcdefhhijklmnñopqrstuvwxyz ',
    }, options);
    // Extraemos los valores del objeto options .
    var offset = options.offset,
        alphabet = options.alphabet;
    // Declaramos las variables en las primeras lineas de la función
    // por convención. 
    var cipherKey, decipherKey;
    // Definimos un valor por defecto de `offset` igual a 4.
    offset || (offset = 4);
    // El valor del offset no puede superar el largo del alfabeto.
    // Giramos en circulo el valor del offset en ese caso.
    if (offset > alphabet.length) {
        offset = offset % alphabet.length;
    }
    /**
     * Función que permite llamar una función sobre cada cáracter de un string,
     * acumulando el valor devuelto en cada iteración.
     * @param  {string}   string  String sobre el cual iterar.
     * @param  {function} fn      Función para correr en cada iteración. Cada
     *                            llamada a la función contará con:
     *                              1.- El valor actualmente acumulado.
     *                              2.- El carácter correspondiente.
     *                              3.- El índice de la iteración.
     * @param  {any}   initial    Valor inicial de la iteración.
     * @return {any}              Resultado de aplicar la función a cada
     *                            cáracter del string.
     */
    function reduce(string, fn, initial) {
        var accumulator = initial;
        for (var i = 0; i < string.length; i++) {
            accumulator = fn(accumulator, string[i], i);
        }
        return accumulator;
    }
    /**
     * Crea un objeto que contiene la clave correspondiente al offset.
     * @param  {number} offset Offset del alfabeto.
     * @return {object}        Clave según offset.
     */
    function createKeyFrom(offset) {
        return reduce(alphabet, function(acc, char, i) {
            var index = i - (offset - 1);
            if (index < 0) {
                index = index + alphabet.length;
            }
            acc[char] = alphabet[index];
            return acc;
        }, {});
    }
    /**
     * Reemplaza cada cáracter de un string por el correspondiente según
     * la clave utilizada.
     * @param  {string} message Mensaje a trascodificar.
     * @param  {object} key     Clave a utilizar.
     * @return {string}         Mensaje transcodificado..
     */
    function transcode(message, key) {
        return reduce(message, function(acc, char, i) {
            var correspondingChar = key[char];
            acc += (correspondingChar !== undefined) ? correspondingChar : '*';
            return acc;
        }, "");
    }
    // Claves para codificar y decodificar.
    cipherKey = createKeyFrom(offset);
    decipherKey = createKeyFrom(alphabet.length - offset + 2);
    // Objeto público para interactuar con las claves.
    return {
        cipher: function(message) {
            return transcode(message, cipherKey);
        },
        decipher: function(message) {
            return transcode(message, decipherKey);
        },
    }
}
// ---
export default createCesarCipherFrom;