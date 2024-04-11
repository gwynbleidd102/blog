import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './components/app'
import { rootReducer } from './reducers/rootReducer'

import './index.scss'

const store = createStore(rootReducer, composeWithDevTools())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
// import { composeWithDevTools } from 'redux-devtools-extension'

// import App from './components/app'
// import { rootReducer } from './reducers/rootReducer'

// import './index.scss'

// const store = createStore(rootReducer, composeWithDevTools())

// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// )
