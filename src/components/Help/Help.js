import React from 'react';
import { Link, Outlet, Routes, Route } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import AddTask from './AddTask';
import RemoveTask from './RemoveTask';
import ChangeStatus from './ChangeStatus';

function Help() {
  return (
    <div>
      <h2>Help Page</h2>
      <p>This is the help page. You can find assistance here.</p>
      <nav>
        <ul>
          <li><Link to="add">Adding Tasks</Link></li>
          <li><Link to="remove">Removing Tasks</Link></li>
          <li><Link to="change">Changing Status</Link></li>
          <li><Link to="*">TestPage</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

function PageNotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>The requested page could not be found.</p>
    </div>
  );
}

function HelpPage() {
  return (
    <Routes>
      <Route path="/" element={<Help />} />
      <Route path="add" element={<AddTask />} />
      <Route path="remove" element={<RemoveTask />} />
      <Route path="change" element={<ChangeStatus />} />
      <Route path="*" element={<PageNotFound />} /> {/* Catch-all route for any undefined routes */}
    </Routes>
  );
}

export default HelpPage;
