// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';
// import { BrowserRouter } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducer/index.js';
// import { HelmetProvider } from 'react-helmet-async';

// const store = configureStore({
//   reducer: rootReducer,
// });

// createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <HelmetProvider>
//       <BrowserRouter>
//         <App />
//         <Toaster />
//       </BrowserRouter>
//     </HelmetProvider>
//   </Provider>
// );


import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'; 
import rootReducer from './reducer/index.js/';

const store = configureStore({
  reducer: rootReducer,
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
  </Provider>
)
