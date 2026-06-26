import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load activities.');
        }
        return response.json();
      })
      .then((data) => {
        setActivities(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load activities.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      <p className="text-muted">Loaded from <code>/api/activities</code>.</p>

      {loading && <div className="alert alert-info">Loading activities...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && activities.length === 0 && (
        <div className="alert alert-secondary">No activities found.</div>
      )}

      {activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>User</th>
                <th>Team</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id || `${activity.user}-${activity.date}`}> 
                  <td>{activity.user?.name || activity.user || 'Unknown'}</td>
                  <td>{activity.team?.name || activity.team || '—'}</td>
                  <td>{activity.type}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.calories}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Activities;
