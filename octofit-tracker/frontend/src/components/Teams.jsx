import React, { useEffect, useState } from 'react';
import { fetchResource } from '../api.js';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResource('teams')
      .then(({ list }) => {
        setTeams(list);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load teams.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      <p className="text-muted">Data comes from <code>/api/teams</code>.</p>

      {loading && <div className="alert alert-info">Loading teams...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && teams.length === 0 && (
        <div className="alert alert-secondary">No teams found.</div>
      )}

      {teams.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {teams.map((team) => (
            <div key={team._id || team.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h5">{team.name}</h3>
                  <p className="text-muted mb-2">{team.description || 'No description available.'}</p>
                  <p className="mb-1">
                    <strong>Members:</strong> {Array.isArray(team.members) ? team.members.length : 'Unknown'}
                  </p>
                  <p className="mb-0 text-muted">Created: {team.createdAt ? new Date(team.createdAt).toLocaleDateString() : 'Unknown'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Teams;
