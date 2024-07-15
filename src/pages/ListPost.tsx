import React from 'react';
import {usePosts} from "../hooks/usePost";
import PostItem from "../components/PostItem";


const ListPost: React.FC = () => {
    const {data: posts, error, isLoading} = usePosts();

    if (isLoading) return <div>Loading...</div>;
    console.log(posts)
    if (error) return <div>Error: {error.message}</div>;
    return (

        <div>
            <h1>Posts</h1>
            <ul>
                {posts?.map(post => (
                    <PostItem key={post.id} post={post}></PostItem>
                ))}
            </ul>
        </div>
    );
};

export default ListPost;
