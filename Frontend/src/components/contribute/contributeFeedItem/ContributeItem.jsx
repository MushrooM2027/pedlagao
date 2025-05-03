import './ContributeItem.css';
import axios from 'axios';
import { useState } from 'react';
import API_URL from '../../../config/api';

const FeedItem = ({
  name,
  profileImage,
  image,
  time,
  message,
  plantType,
  sponsorcoins,
  locationselection,
  requestId,
  isActive,
  claimedBy,
  currentUserId,
  onStatusChange,
  onSubmitClick // 👈 receive the modal trigger function
}) => {
  const [status, setStatus] = useState(isActive);
  const [claimer, setClaimer] = useState(claimedBy);

  const handleAccept = async () => {
    try {
      await axios.post(`${API_URL}/api/plant/plantationRequest/${requestId}/accept`, {
        UserId: currentUserId,
      });
      setStatus(false);
      setClaimer(currentUserId);
      onStatusChange?.(); // notify parent
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };

  const handleCancel = async () => {
    try {
      await axios.post(`${API_URL}api/plant/plantationRequest/${requestId}/cancel`);
      setStatus(true);
      setClaimer(null);
      onStatusChange?.(); // notify parent
    } catch (err) {
      console.error("Error canceling request:", err);
    }
  };

  const handleSubmit = () => {
    if (onSubmitClick) {
      onSubmitClick(); // 🔥 open modal from parent
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <img src={profileImage} alt="User" className="profile-img" />
        <div>
          <strong>{name}</strong><br />
          <small>{time}</small>
        </div>
      </div>

      <div className="post-body">

        <p>{message}</p>

        <div className='feed-info'>Plant Type: {plantType}</div>
        <div className='feed-info'>Sponsor Coins: {sponsorcoins}</div>
        <div className='feed-info'>Location: {locationselection}</div>
        {image && (
          <div className="feed-img-container">
            <img src={image} alt="Plantation Request" className="feed-img" />
          </div>
        )}
      </div>


      <div className="post-footer">
        <div className="reaction-btns">
          {status ? (
            <button className="btn1" onClick={handleAccept}>
              Accept
            </button>
          ) : claimer === currentUserId ? (
            <>
              <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
              <button className="btn-submit" onClick={handleSubmit}>Submit</button>
            </>
          ) : (
            <button className="btn1" disabled>Accepted</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
