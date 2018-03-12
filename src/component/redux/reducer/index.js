/**
 * InitialState
 */
const InitialState = { feed: null, currency: "USD" };

/**
 * Reducer
 * @param {*} state 
 * @param {*} action 
 * @returns {*} nextState
 */
function Reducer(state = InitialState, action) {
    return Object.assign({}, state, action);
};

module.exports = Reducer;