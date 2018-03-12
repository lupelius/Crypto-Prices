exports.SetCurrency = (currency = null) => Object.assign({
    currency
}, {
    type: 'SET_CURRENCY'
});
