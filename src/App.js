
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Routeer from './routes';
// import ErrorBoundary from './components/ErrorBoundary';
import { Provider } from 'react-redux';
function App() {
  return (
    <React.Suspense fallback={
      <div className='flex flex-col items-center justify-center h-screen'>
      {/* <img src={Loader} alt="Loading..." className='max-w-md' /> */}
      <h6 className='text-xs'>Loading...</h6>
      </div>
    }>
      {/* <ErrorBoundary> */}
    <div className="App">
      
       <Routeer />
     
     
    </div>
    {/* </ErrorBoundary> */}
    </React.Suspense>
  );
}

export default App;
