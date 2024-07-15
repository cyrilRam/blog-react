// src/hooks/usePosts.ts
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {createPost, deletePost, getAllPosts, updatePost} from '../services/postService';
import {Post, PostCreateInput} from '../schemas/post';

export const usePosts = () => {
    return useQuery<Post[], Error>('posts', getAllPosts);
};


export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation(createPost, {
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
            console.log('Post created successfully');
        },
        onError: (error: Error) => {
            console.error('Error creating post:', error);
        },
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation((data: { postId: string; post: PostCreateInput }) => updatePost(data.postId, data.post), {
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation((postId: string) => deletePost(postId), {
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};
