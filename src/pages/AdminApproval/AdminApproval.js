// src/pages/AdminApproval/AdminApproval.js

import React, { useEffect, useState } from 'react';
import AdminApprovalService from '../../services/AdminApprovalService';
import '../../components/styles/AdminApproval.css';

const AdminApproval = () => {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingPosts = async () => {
      try {
        const data = await AdminApprovalService.getPendingPosts();
        setPendingPosts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load pending posts.');
        setLoading(false);
      }
    };
    fetchPendingPosts();
  }, []);

  const handleApprove = async (postId) => {
    try {
      await AdminApprovalService.updatePostStatus(postId, 'approved');
      setPendingPosts(pendingPosts.filter(post => post.id !== postId));
      // Optionally, notify the author
      // await AdminApprovalService.notifyAuthor(postId, 'approved');
    } catch (err) {
      console.error('Error approving post:', err);
    }
  };

  const handleReject = async (postId) => {
    try {
      await AdminApprovalService.updatePostStatus(postId, 'rejected');
      setPendingPosts(pendingPosts.filter(post => post.id !== postId));
      // Optionally, notify the author
      // await AdminApprovalService.notifyAuthor(postId, 'rejected');
    } catch (err) {
      console.error('Error rejecting post:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-approval">
      <h2>Admin Approval Dashboard</h2>
      {pendingPosts.length === 0 ? (
        <p>No pending posts for approval.</p>
      ) : (
        <ul className="pending-posts-list">
          {pendingPosts.map(post => (
            <li key={post.id} className="pending-post-item">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div className="approval-actions">
                <button onClick={() => handleApprove(post.id)} className="approve-button">
                  Approve
                </button>
                <button onClick={() => handleReject(post.id)} className="reject-button">
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminApproval;
