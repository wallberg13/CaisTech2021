const { isEqual } = require("lodash");

module.exports = {
  /**
   * Montando um novo array a partir dos campos requeridos, alem de adicionar um
   * campo estatico. (basicamente, é desestruturando todos os itens de um array)
   *
   * Isso não é nada mais, nada menos, que um map.
   * @template T1, T2
   * @param {Array<T1>} array
   * @param {String<T2>[]} fields
   * @param {Object} add
   * @returns {Array<T2>}
   */
  GET_AND_ADD_FIELDS_INTO_ARRAY(array, fields, add) {
    const newArray = array.map((item) => {
      let newItem = add !== undefined ? { ...add } : {};
      for (let x of fields) {
        newItem = { ...newItem, [x]: item[`${x}`] };
      }

      return newItem;
    });

    return newArray;
  },

  /**
   * Função que recebe dois vetores de mesmo tamanho, e obtem somente os
   * objetos que quando pesquisados por uma chave
   * @template T
   * @param {Array<T>} array_a
   * @param {Array<T>} array_b
   * @param {string} key
   * @returns {Array<T>}
   */
  FILTER_THE_DIFFENT(array_a, array_b, key) {
    const out_array = [];

    for (let a of array_a) {
      const b = array_b.find((b) => b[key] === a[key]);

      b && !isEqual(a, b) && out_array.push(a);
    }

    return out_array;
  },
};
