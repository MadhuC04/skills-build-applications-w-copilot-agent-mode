import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState({ teams: [], users: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load leaderboard.');
        }
        return response.json();
      })
      .then((json) => {
        setLeaderboard({
          teams: Array.isArray(json.teams) ? json.teams : [],
          users: Array.isArray(json.users) ? json.users : [],
        });
      })
      .catch((err) => {
        setError(err.message || 'Unable to load leaderboard.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      <p className="text-muted">Shows top teams and top users from aggregated activity data.</p>

      {loading && <div className="alert alert-info">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row gy-4">
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-header">Top Teams</div>
              <div className="card-body p-0">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Team</th>
                      <th>Calories</th>
                      <th>Duration</th>
                      <th>Sessions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.teams.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-3">
                          No team leaderboard data.
                        </td>
                      </tr>
                    ) : (
                      leaderboard.teams.map((entry, index) => (
                        <tr key={entry._id || entry.id || index}>
                          <td>{index + 1}</td>
                          <td>{entry.team?.name || 'Unknown team'}</td>
                          <td>{entry.totalCalories}</td>
                          <td>{entry.totalDuration}</td>
                          <td>{entry.sessions}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-header">Top Users</div>
              <div className="card-body p-0">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>User</th>
                      <th>Calories</th>
                      <th>Duration</th>
                      <th>Sessions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.users.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-3">
                          No user leaderboard data.
                        </td>
                      </tr>
                    ) : (
                      leaderboard.users.map((entry, index) => (
                        <tr key={entry._id || entry.id || index}>
                          <td>{index + 1}</td>
                          <td>{entry.user?.name || 'Unknown user'}</td>
                          <td>{entry.totalCalories}</td>
                          <td>{entry.totalDuration}</td>
                          <td>{entry.sessions}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Leaderboard;
