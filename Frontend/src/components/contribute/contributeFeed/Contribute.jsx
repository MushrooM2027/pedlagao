import { useEffect, useState, useCallback } from "react";
import FeedItem from "../contributeFeedItem/ContributeItem";
import axios from "axios";
import CreatePost from "../../../pages/PostPage/PostPage"
import "./Contribute.css";
import { useAuth } from "../../../context/AuthContext";
import { Modal } from "react-bootstrap";
import { Button, ButtonGroup } from "react-bootstrap";
import profile from '../../../assets/media/profile.jpg'
import API_URL from '../../../config/api';

const ContributeFeed = () => {
  const { isLoggedIn, user } = useAuth();
  const [showPostModal, setShowPostModal] = useState(false);

  const openPostModal = () => setShowPostModal(true);
  const closePostModal = () => setShowPostModal(false);
  if (!isLoggedIn) {
    return (
      <div style={{
        // position: 'fixed',         // ignore layout flow
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        // backgroundColor: '#f8f9fa', // optional: light background
        // zIndex: 9999               // on top of layout
      }}>
        <div>
          <h3>You need to be logged in to view this page.</h3>
          <p>Please log in to Contribute.</p>
        </div>
      </div>
    );
  }
  const [feedData, setFeedData] = useState([]);
  const [filter, setFilter] = useState('active');

  const fetchRequests = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/plant/plantationRequest`);
      let filtered = response.data;
      if (filter === 'active') {
        filtered = filtered.filter(r => r.IsActive);
      } else if (filter === 'mine') {
        filtered = filtered.filter(r => r.ClaimedBy === user.UserId);
      }
      setFeedData(filtered);
    } catch (error) {
      console.error("Failed to fetch plantation requests:", error);
    }
  }, [filter, user.UserId]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return (
    <>

      <div className="fixed-filter-buttons">
        <ButtonGroup vertical>
          <div className="btn-side">
            <Button
              variant="primary"
              className={`filter-btn ${filter === 'active' ? 'selected' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active Requests
            </Button>
          </div>
          <div className="btn-side">
            <Button
              variant="primary"
              className={`filter-btn ${filter === 'mine' ? 'selected' : ''}`}
              onClick={() => setFilter('mine')}
            >
              My Requests
            </Button>
          </div>
        </ButtonGroup>
      </div>


      {/* 🌱 Post Creation Modal */}
      <Modal show={showPostModal} onHide={closePostModal} centered backdrop="static" size="lg">
        <Modal.Body>
          <CreatePost onClose={closePostModal} />
        </Modal.Body>
      </Modal>

      <div className="feed-container">
        {feedData.length === 0 ? (
          <div className="no-data-message">
            <h4>No requests to show.</h4>
            <p>
              {filter === 'active'
                ? 'There are currently no active plantation requests.'
                : 'You haven’t claimed any requests yet.'}
            </p>
          </div>
        ) : (
          feedData.map((post) => (
            <FeedItem
              key={post.RequestId}
              name={post.user?.Name || "Anonymous"}
              profileImage={
                post.user?.profileMedia?.filePath
                  ? `http://localhost:3000/uploads/${post.user.profileMedia.filePath}`
                  : profile
              }
              image={
                post.plantationMedia?.[0]?.filePath
                  ? `http://localhost:3000/uploads/${post.plantationMedia[0].filePath}`
                  : null
              }
              time={new Date(post.createdAt).toLocaleString()}
              message={post.Description}
              plantType={post.TreeType}
              sponsorcoins={post.Amount}
              locationselection={post.RequestedLocation}
              requestId={post.RequestId}
              isActive={post.IsActive}
              claimedBy={post.ClaimedBy}
              currentUserId={user.UserId}
              onStatusChange={fetchRequests}
              onSubmitClick={openPostModal}
            />
          ))
        )}
      </div>

    </>
  );
};

export default ContributeFeed;