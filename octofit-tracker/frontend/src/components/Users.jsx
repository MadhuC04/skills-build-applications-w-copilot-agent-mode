import React, { useEffect, useState } from 'react';
import { fetchResource } from '../api.js';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResource('users')
      .then(({ list }) => {
        setUsers(list);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load users.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      <p className="text-muted">Loaded from <code>/api/users</code>.</p>

      {loading && <div className="alert alert-info">Loading users...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && users.length === 0 && (
        <div className="alert alert-secondary">No users were found.</div>
      )}

      {users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id}>
                  <td>{user.name || 'Unknown'}</td>
                  <td>{user.email || 'Unknown'}</td>
                  <td>{user.role || 'athlete'}</td>
                  <td>{user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Users;
