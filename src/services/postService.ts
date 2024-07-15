import axios from 'axios';
import { Post, PostCreateInput } from '../schemas/post'; // Assurez-vous que les types sont correctement définis

import baseUrl from "../apiConfig"; // Adaptez le chemin en fonction de votre projet

const postsUrl = `${baseUrl}/v1/posts`;

export const getAllPosts = async (): Promise<Post[]> => {
    const response = await axios.get<Post[]>(postsUrl);
    return response.data;
};


export const createPost = async (post: PostCreateInput): Promise<Post> => {
    const response = await axios.post<Post>(postsUrl, post);
    return response.data;
};

export const updatePost = async (postId: string, post: PostCreateInput): Promise<Post> => {
    const response = await axios.put<Post>(`${postsUrl}/${postId}`, post);
    return response.data;
};

export const deletePost = async (postId: string): Promise<boolean> => {
    const response = await axios.delete<boolean>(`${postsUrl}/${postId}`);
    return response.data;
};
