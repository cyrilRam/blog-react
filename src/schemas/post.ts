import {Category} from "./category";

export interface Post {
    id: string
    title: string
    content: string
    created_date: Date
    category: Category
}

export type PostCreateInput = Omit<Post, "id" | "created_date" | "category"> & { categoryId: string };