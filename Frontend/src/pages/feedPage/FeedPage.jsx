import React, { useState } from "react";
import Sidebar from "../../components/feed/sideBar/SideBar";
import Feed from "../../components/feed/feed/Feed";
import { Modal, Button } from "react-bootstrap";
import FloatingPostButton from '../../components/floatingPostButton/FloatingPostButton';
import "./FeedPage.css";
import CreatePost from "../PostPage/PostPage";
import { useAuth } from "../../context/AuthContext";


const FeedPage = () => {
  const [showPostModal, setShowPostModal] = useState(false);

  const handleOpenModal = () => setShowPostModal(true);
  const handleCloseModal = () => setShowPostModal(false);
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return (
      <div className="login-prompt">
        <h3 style={{ textAlign: "center" }}>You need to be logged in to view this page.</h3>
        <p style={{ textAlign: "center" }}>Please log in to Sponser a tree.</p>
      </div>
    );
  }

  return (
    <div>
      <FloatingPostButton onClick={handleOpenModal}>Click here to post</FloatingPostButton>
      <Modal show={showPostModal} onHide={handleCloseModal} centered backdrop="static" size="lg">
        <Modal.Body>
          <CreatePost onClose={handleCloseModal} />
        </Modal.Body>
      </Modal>
      <div className="main-layout">
        <Sidebar />
        <Feed />
      </div>
    </div>
  );
};

export default FeedPage;
