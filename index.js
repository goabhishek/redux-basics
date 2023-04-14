import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import axios from 'axios';
import thunk from 'redux-thunk';

// action name constants
const init = 'init';
const inc = 'increment';
const dec = 'decrement';
const incByAmt = 'incrementByAmount';

const store = createStore(
  combineReducers({
    account: Accreducer,
    bonus: Bonusreducer,
  }),
  applyMiddleware(logger.default, thunk.default)
);

const history = [];

// Reducer

function Accreducer(state = { amount: 1 }, action) {
  switch (action.type) {
    case inc:
      return { amount: state.amount + 1 };
    case dec:
      return { amount: state.amount - 1 };
    case incByAmt: {
      return { amount: state.amount + action.payload };
    }
    case init: {
      return { amount: action.payload };
    }
    default: {
      return state;
    }
  }
}

function Bonusreducer(state = { points: 0 }, action) {
  switch (action.type) {
    case incByAmt:
      if (action.payload >= 100) return { points: state.points + 1 };

    default: {
      return state;
    }
  }
}

// global state
console.log(store.getState());

store.dispatch({
  type: inc,
});
console.log(store.getState());

// Async API call
// async function getUser() {
//   console.log(data);
// }

// getUser();
//Action creators
function getUser(id) {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
    dispatch(initUser(data.amount));
  };
}
function initUser(value) {
  return { type: init, payload: value };
}

function increment() {
  return { type: inc };
}
function decrement() {
  return { type: dec };
}
function incrementByAmount(value) {
  return { type: incByAmt, payload: value };
}

setInterval(() => {
  //   store.dispatch(getUser(2));
  store.dispatch(incrementByAmount(200));
}, 2000);
