import axios from 'axios';
import baseUrl from "../apiConfig";
import {Category} from "../schemas/category"; // Adaptez le chemin en fonction de votre projet

const postsUrl = `${baseUrl}/v1/categories`;

export const getAllCategories = async (): Promise<Category[]> => {
    const response = await axios.get<Category[]>(postsUrl);
    return response.data;
};