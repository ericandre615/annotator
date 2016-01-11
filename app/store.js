import { createStore, combineReducers, applyMiddleware } from 'redux';
//import thunk from 'redux-thunk';
import reducers from './reducers';

const reducer = combineReducers({
  documents: reducers.documentsReducer,
  annotations: reducers.annotationsReducer,
  categories: reducers.categoriesReducer
});

//const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

let initialState = {};

// check sessionStorage and hydrate state from server or elsewhere that needs to persist across reloads
if('sessionStorage' in window) {
  let appStorage = sessionStorage.getItem('appState');
  if(appStorage) {
    appStorage = JSON.parse(appStorage);
    initialState = {
      documents: appStorage.documents,
      categories: appStorage.categories,
      annotations: appStorage.annotations
    };
  }
}

const store = createStore(reducer, initialState);

export default store;
