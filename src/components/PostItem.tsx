// src/components/PostItem.tsx
import React, {useEffect, useState} from 'react';
import {Post, PostCreateInput} from "../schemas/post";
import {useCategory} from "../hooks/useCategory";
import {Category} from "../schemas/category";
import {useUpdatePost} from "../hooks/usePost";

interface PostItemProps {
    post: Post;
}

const PostItem: React.FC<PostItemProps> = ({post}) => {
    const [editedPost, setEditedPost] = useState<Post>({...post});
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const {data: categories, isLoading, isError, refetch} = useCategory();
    const {mutate: updatePost, isLoading: isCreating, isError: isCreateError} = useUpdatePost();

    useEffect(() => {
        if (isEditing) {
            // Charger les catégories une fois lorsque le mode édition est activé
            refetch();
        }
    }, [isEditing, refetch]);
    const handleEdit = () => {
        setIsEditing(true); // Activer le mode édition
        setEditedPost({...post}); // Pré-remplir les champs avec les données actuelles du post
    };

    const handleCancel = () => {
        setIsEditing(false); // Annuler l'édition
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newPost: PostCreateInput = {
            title: editedPost.title,
            content: editedPost.content,
            categoryId: editedPost.category.id,
        };

        updatePost({postId: editedPost.id, post: newPost})
        setIsEditing(false); // Sortir du mode édition après soumission
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
        const {name, value} = e.target;

        if (name === 'category') {
            const selectedCategory: Category | undefined = categories?.find(cat => cat.id === value);
            if (selectedCategory) {
                setEditedPost(prevState => ({
                    ...prevState,
                    category: selectedCategory
                }));
            }
        } else {
            setEditedPost(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    if (isEditing) {
        if (isLoading) {
            return <div>Loading categories...</div>;
        }

        return (
            <div className="pt-4 p-2">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={editedPost.title}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            value={editedPost.content}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={editedPost.category.id} // Use category id here
                            onChange={handleChange}
                            className="form-control"
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            {categories && categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                        <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }


    return (

        <div className="pt-4 p-2">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>{post.category.name}</p>
            <span>
                {new Date(post.created_date).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })}
                &nbsp;
                {new Date(post.created_date).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}
            </span>
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary btn-sm float-end me-2" onClick={handleEdit}>Modifier</button>
            </div>

        </div>
    );
};

export default PostItem;
