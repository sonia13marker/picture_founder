import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { CookiesProvider } from 'react-cookie';

//убирает логи в prod сборке
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  // console.error = () => {}
  console.debug = () => {}
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  // <React.StrictMode>
  <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <Provider store={store}>
        <App ></App>
      </Provider>
      </CookiesProvider>
   /* </React.StrictMode> */
);

