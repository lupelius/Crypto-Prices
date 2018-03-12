const { createStore } = require('redux');
const Reducer = require('../reducer');

/**
 * Redux Store
 */
const Store = createStore(Reducer);

module.exports = Store;