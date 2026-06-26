import React from 'react';
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { getCodespaceName } from './api.js';

const App = () => {
  const codespaceName = getCodespaceName();
  const hasCodespace = Boolean(codespaceName);

  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="mb-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div>
              <h1 className="h3">OctoFit Tracker</h1>
              <p className="text-muted mb-0">
                React 19 + Vite frontend with client-side navigation and GitHub.dev preview API routing.
              </p>
            </div>
          </div>

          {!hasCodespace && (
            <div className="alert alert-warning mt-3" role="alert">
              <strong>VITE_CODESPACE_NAME is not defined.</strong> The app is falling back to local API requests at <code>http://localhost:8000/api</code>.
              Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for GitHub.dev preview support.
            </div>
          )}

          <nav className="nav nav-pills flex-column flex-sm-row gap-2 mt-3">
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-body-secondary'}`} to="/activities">
              Activities
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-body-secondary'}`} to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-body-secondary'}`} to="/teams">
              Teams
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-body-secondary'}`} to="/users">
              Users
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-body-secondary'}`} to="/workouts">
              Workouts
            </NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Navigate replace to="/activities" />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate replace to="/activities" />} />
          </Routes>
        </main>

        <footer className="mt-5 pt-4 border-top text-muted small">
          <p className="mb-1">
            API endpoint template: <code>https://{`<VITE_CODESPACE_NAME>`}-8000.app.github.dev/api/[component]/</code>
          </p>
          <p className="mb-0">Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> or <code>.env</code> for GitHub.dev preview routing.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
