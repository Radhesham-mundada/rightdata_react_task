import React, { useEffect, useState } from 'react'
import { fetchCommentsDetails, fetchPostsList, fetchUserList } from '../services/UserService'
import './UserList.css';

const UserList = () => {

    const [userList, setUserList] = useState([]);
    const [postsList, setPostsList] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [expandedComments, setExpandedComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUserList();
                setUserList([...data]);

                if (selectedUserId) {
                    const commentData = await fetchPostsList(selectedUserId);
                    setPostsList([...commentData]);
                }

                if (selectedPostId) {
                    const postsData = await fetchCommentsDetails(selectedPostId);
                    setCommentList([...postsData]);
                }
            } catch (error) {
            }
        };
        fetchData();

    }, [selectedUserId, selectedPostId])


    const handleOnUserClick = (userId) => {
        setSelectedUserId(userId);
        setSelectedPostId(null);
        setExpandedComments([]);
    };

    const handleOnPostClick = (postId) => {
        setSelectedPostId(postId);
        setExpandedComments((prevExpandedComments) => {
            if (prevExpandedComments.includes(postId)) {
                return prevExpandedComments.filter((id) => id !== postId);
            } else {
                return [...prevExpandedComments, postId];
            }
        });
    };

    return (
        <div className="user-list-container">
            <div className="user-list">
                <h2>User List</h2>
                <ul>
                    {userList.map((user) => (
                        <li key={user.id} onClick={() => handleOnUserClick(user.id)}>{user.name}</li>
                    ))}
                </ul>
            </div>

            <div className="post-and-comment">
                {selectedUserId && (
                    <div>
                        <ul>
                            {postsList.map((post) => (
                                <li key={post.id} onClick={() => handleOnPostClick(post.id)}>
                                    <strong>{post.title}</strong>

                                    {selectedPostId === post.id && expandedComments.includes(post.id) && (
                                        <div>
                                            <ul>
                                                {commentList.map((comment) => (
                                                    <li key={comment.id}>{comment.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>




        </div>
    )
}
export default UserList