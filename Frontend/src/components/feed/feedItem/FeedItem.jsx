import React, { useState, useEffect } from "react";
import "./FeedItem.css";
import logo from '../../../assets/media/logo.png';
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import profile from '../../../assets/media/profile.jpg'

const FeedItem = ({ name, time, message, images, profilePic, postId }) => {
    const { user } = useAuth();
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const checkIfLiked = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/likes/check`, {
                    params: { UserId: user.UserId, PostId: postId }
                });
                setLiked(res.data.liked);
            } catch (err) {
                console.error("Error checking like status:", err);
            }
        };

        if (user?.UserId && postId) {
            checkIfLiked();
        }
    }, [user, postId]);

    const handleLike = async () => {
        try {
            if (!liked) {
                await axios.post("http://localhost:3000/api/likes", {
                    UserId: user.UserId,
                    PostId: postId,
                });
                setLiked(true);
            } else {
                await axios.delete("http://localhost:3000/api/likes", {
                    data: { UserId: user.UserId, PostId: postId },
                });
                setLiked(false);
            }
        } catch (err) {
            console.error("Error toggling like:", err);
        }
    };

    const toggleComments = async () => {
        setShowComments(!showComments);
        if (!showComments) {
            try {
                await handleFetchComments();
            } catch (err) {
                console.error("Error fetching comments:", err);
            }
        }
    };

    const handleFetchComments = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/comment/comments/${postId}`);
            setComments(res.data);
        } catch (err) {
            console.error("Error fetching comments:", err);
        }
    };


    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        try {
            const res = await axios.post("http://localhost:3000/api/comment/comments", {
                PostId: postId,
                UserId: user.UserId,
                Content: newComment,
            });
            // setComments([...comments, res.data]);
            await handleFetchComments();
            setNewComment("");
        } catch (err) {
            console.error("Error submitting comment:", err);
        }
    };

    return (
        <div className="post">
            <div className="post-header">
                <img src={profilePic || logo} alt="User" className="profile-img" />
                <div>
                    <strong>{name}</strong><br />
                    <small>{time}</small>
                </div>
            </div>

            <div className="post-body">
                <p>{message}</p>
                {images?.map((imgSrc, idx) => (
                    <img key={idx} src={imgSrc} alt={`Post media ${idx}`} className="post-img" />
                ))}
            </div>

            <div className="post-footer1">
                <div className="reaction-btns">
                    <button onClick={handleLike}>{liked ? "❤️" : "🤍"}</button>
                    <button onClick={toggleComments}>💬 Comment</button>
                    <button>📤 Share</button>
                </div>

                {showComments && (
                    <div className="comments-panel">
                        <div className="existing-comments">
                            {comments.map((comment, idx) => (
                                <div key={idx} className="comment">
                                    <img
                                        src={
                                            comment.commenter?.profileMedia?.filePath
                                                ? `http://localhost:3000/uploads/${comment.commenter.profileMedia.filePath}`
                                                : profile
                                        }
                                        alt="Commenter"
                                        className="profile-img1"
                                    />
                                    <strong>{comment.commenter?.Username}</strong>: {comment.Content}
                                </div>
                            ))}
                        </div>
                        <div className="comment-input">
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button onClick={handleCommentSubmit}>Post</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedItem;
