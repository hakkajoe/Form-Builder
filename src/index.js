import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import './index.css';
import App from './App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import reportWebVitals from './reportWebVitals';

// Creating a root using ReactDOM.createRoot for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrapping the app with DndProvider and rendering it with createRoot
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </React.StrictMode>
);

// Measuring performance if needed
reportWebVitals();
