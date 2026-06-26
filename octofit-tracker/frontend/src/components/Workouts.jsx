import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load workouts.');
        }
        return response.json();
      })
      .then((data) => {
        setWorkouts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load workouts.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      <p className="text-muted">Data comes from <code>/api/workouts</code>.</p>

      {loading && <div className="alert alert-info">Loading workouts...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && workouts.length === 0 && (
        <div className="alert alert-secondary">No workouts available.</div>
      )}

      {workouts.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {workouts.map((workout) => (
            <div key={workout._id || workout.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h5">{workout.title || 'Untitled workout'}</h3>
                  <p className="text-muted mb-2">{workout.description || 'No description provided.'}</p>
                  <p className="mb-1">
                    <strong>Difficulty:</strong> {workout.difficulty || 'beginner'}
                  </p>
                  <p className="mb-0 text-muted">Duration: {workout.duration ?? 'Unknown'} minutes</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Workouts;
