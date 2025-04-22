import { useEffect, useState } from "react";
import FeedItem from "../feedItem/FeedItem";
import "./Feed.css";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import profile from '../../../assets/media/profile.jpg'

const Feed = () => {
    const { user } = useAuth();

    const [feedData, setFeedData] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/post/feed");
                setFeedData(res.data);
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="feed-container">
            {feedData.map((post) => (
                <FeedItem
                    key={post.PostId}
                    postId={post.PostId}
                    name={post.author.Name}
                    time={new Date(post.createdAt).toLocaleString()}
                    message={post.Description}
                    images={post.postMedia?.map(postMedia =>
                        postMedia.filePath
                            ? `http://localhost:3000${postMedia.filePath}`
                            : "https://via.placeholder.com/150" // Fallback to placeholder image
                    )}// ✅ all post images
                    profilePic={
                        post.author?.profileMedia?.filePath
                          ? `http://localhost:3000/uploads/${post.author.profileMedia.filePath}`
                          : profile
                      }
                    currentUserId={user?.UserId}
                />
            ))}
        </div>
    );
};

export default Feed;
