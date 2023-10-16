
import axios from 'axios'

const Base_Url = "https://jsonplaceholder.typicode.com"

// https://jsonplaceholder.typicode.com/posts?userId=1

// https://jsonplaceholder.typicode.com/posts/1/comments


export const fetchUserList = async () => {
    try {
        const userList = await axios.get(`${Base_Url}/users`);
        return userList.data;
    } catch (error) {
        throw error;
    }
};

export const fetchPostsList = async (postId) => {
    try {
        const postList = await axios.get(`${Base_Url}/posts?userId=${postId}`);
        return postList.data;
    } catch (error) {
        throw error;
    }
};

export const fetchCommentsDetails = async (commentId) => {
    try {
        const commentDetails = await axios.get(`${Base_Url}/posts/${commentId}/comments`);
        return commentDetails.data;
    } catch (error) {
        throw error;
    }
};