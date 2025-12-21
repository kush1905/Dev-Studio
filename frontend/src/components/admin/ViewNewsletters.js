import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';
import './ViewNewsletters.css';

function ViewNewsletters() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const fetchNewsletters = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/newsletters?page=${page}&limit=10`);
      setSubscribers(response.data.subscribers || []);
      setPagination(response.data.pagination || {});
    } catch (error) {
      console.error('Error fetching newsletters:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchNewsletters();
  }, [fetchNewsletters]);

  return (
    <div className="view-newsletters">
      <h2 className="section-title">Newsletter Subscribers</h2>
      {loading ? (
        <div className="loading">Loading subscribers...</div>
      ) : subscribers.length === 0 ? (
        <div className="empty-state">No subscribers found.</div>
      ) : (
        <>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Subscribed Date</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr key={subscriber._id}>
                    <td>{subscriber.email}</td>
                    <td>{new Date(subscriber.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {pagination.pages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="page-button"
              >
                Previous
              </button>
              <span className="page-info">
                Page {page} of {pagination.pages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= pagination.pages}
                className="page-button"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ViewNewsletters;



