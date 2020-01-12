import { createStore, combineReducers } from "redux";
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'

const todo = (state = {}, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: action.completed
      };

    case "TOGGLE_TODO":
      return state.id === action.id
        ? { ...state, completed: !state.completed }
        : state;

    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case "ADD_TODO":
    case "TOGGLE_TODO":
      return {...state, [action.id]: todo(state[action.id], action)};

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.id]
    default:
      return state;
  }
}


const todos = combineReducers({
  byId,
  allIds
});


const getAllTodos = state => 
  state.allIds.map(id => state.byId[id])


export const getVisibleTodos = (state, filter) => {

  const allTodos = getAllTodos(state)

  switch (filter) {
    case "all":
      return allTodos;
    case "completed":
      return allTodos.filter(t => t.completed);
    case "active":
      return allTodos.filter(t => !t.completed);
  }
};

const addLoggingToDispatch = store => {
  const next = store.dispatch
  return action => {
    console.group(action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    const returnValue = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)

    return returnValue;
  }
}


const addPromiseSupportToDispatch = store => {
  const next = store.dispatch;

  return action => {
    if(typeof action.then === 'function') {
      return action.then(next)
    }
    return next(action)
  }
}


const configureStore = () => {
  const middlewares = []
  const persistedState = loadState();
  const store = createStore(todos, persistedState);
  middlewares.push(addLoggingToDispatch(store))
  middlewares.push( addPromiseSupportToDispatch(store) )

  const wrapDispatchWithMiddlewares = (store, middlewares) => {

  }

  store.subscribe(throttle(() => saveState({todos: store.getState().todos})))
  return store;
}

export default configureStore;
