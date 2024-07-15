// src/components/CreatePostForm.tsx
import React, {useState} from 'react';
import {useCreatePost} from "../hooks/usePost";
import {useCategory} from "../hooks/useCategory";
import {PostCreateInput} from '../schemas/post';

const CreatePostForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const {mutate: createPost, isLoading: isCreating, isError: isCreateError} = useCreatePost();
    const {data: categories, isLoading: isLoadingCategories, isError: isCategoriesError} = useCategory();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newPost: PostCreateInput = {
            title,
            content,
            categoryId: category,
        };
        createPost(newPost);
    };

    if (isLoadingCategories) {
        return <div>Loading categories...</div>;
    }

    if (isCategoriesError) {
        return <div>Failed to load categories.</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="form-group mb-3">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-control"
                    required
                >
                    <option value="" disabled>Select a category</option>
                    {categories && categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="form-control"
                    required
                    minLength={50}
                />
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary" disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Create Post'}
                </button>
            </div>
            {isCreateError && <div className="text-danger mt-2">Failed to create post. Please try again.</div>}
        </form>
    );
};


export default CreatePostForm;

