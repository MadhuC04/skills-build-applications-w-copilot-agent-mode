import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => (
  <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
    <h1>OctoFit Tracker</h1>
    <p>Welcome to the OctoFit Tracker frontend.</p>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
