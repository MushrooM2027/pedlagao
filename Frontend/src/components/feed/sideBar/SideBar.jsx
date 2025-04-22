import { useState, useEffect } from "react";
import "./Sidebar.css";
import { useAuth } from "../../../context/AuthContext"; // if storing user data in context
import axios from "axios"; // Import axios for fetching user data
import profile from '../../../assets/media/profile.jpg'

const Sidebar = () => {
  const { user } = useAuth(); // optional
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      try {
        // Make a GET request to fetch user profile data
        const response = await axios.get(`http://localhost:3000/api/users/${user?.UserId}`);
        // Assuming the API returns the relative file path
        const profilePicPath = response.data.profilePicture;

        // Prepend the `/uploads/` path manually
        // const fullProfileImageUrl = profilePicPath ? `http://localhost:3000/uploads${profilePicPath.replace('http://localhost:3000', '')}` : null;
        setProfileImage(profilePicPath); // Set the profile picture state
      } catch (error) {
        console.error("Error fetching user profile picture:", error);
      }
    };

    if (user?.UserId) {
      fetchUserProfilePicture(); // Fetch user profile picture when the component mounts
    }
  }, [user]);

  return (
    <div className="sidebar">
      <div className="stats-card">
        <div className="profile">
          {/* Dynamically set the profile picture URL */}
          <img
            src={profileImage || profile} // Fallback to a default image if none is found
            alt="Profile"
            className="profile-img"
          />
          <h3>{user?.Name||Name}</h3>
        </div>
      </div>
      <div className="eco-tip"><strong>Date of Sponsor:</strong></div>
      <div className="stats-card"><strong>Motive of Plantation:</strong></div>
      <div className="stats-card"><strong>Upcoming Events:</strong></div>
      <div className="eco-tip"><strong>Did you know?</strong></div>
    </div>
  );
};

export default Sidebar;
