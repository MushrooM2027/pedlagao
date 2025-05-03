import React, { useEffect, useState } from "react";
import "./PostPage.css";
import { FaSmile, FaImage, FaTimes } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import logo from '../../assets/media/logo.png'
import API_URL from '../../config/api';

const PostPage = ({ onClose }) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({ name: "", profileImage: "" });
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/${user?.UserId}`); // update route as per your backend
        // console.log('API Response:', res.data);
        const { Name } = res.data.user;
        const { profilePicture } = res.data;
        setUserData({ name: Name, profileImage: profilePicture });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleEmojiClick = (emojiData) => {
    setContent((prev) => prev + emojiData.emoji);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("Description", content);
    if (selectedFile) formData.append("postMedia", selectedFile);
    formData.append("UserId", user?.UserId); // 👈 required by backend
    
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      await axios.post(`${API_URL}/api/post/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (onClose) onClose(); // Close overlay after successful post
    } catch (error) {
      console.error("Post submission failed:", error);
    }
  };

  return (
      <div className="post-card">
        {onClose && (
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        )}

        <div className="post-header">
          <img src={userData.profileImage || { logo }} alt="Profile" className="profile-pic" />
          <div className="user-info">
            <h3>{userData.name}</h3>
          </div>
        </div>

        <textarea
          className="post-input"
          placeholder="What do you want to talk about?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        {selectedFile && (
          <div className="media-preview">
            <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
          </div>
        )}

        <div className="post-footer2">
          <div className="icons">
            <FaSmile onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
            <label>
              <FaImage />
              <input type="file" accept="image/*,video/*" hidden onChange={handleFileChange} />
            </label>
          </div>

          <button className="post-button" onClick={handleSubmit}>
            Post
          </button>
        </div>

        {showEmojiPicker && (
          <div className="emoji-picker">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
  );
};

export default PostPage;
