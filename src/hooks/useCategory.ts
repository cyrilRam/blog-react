import {useQuery} from "react-query";
import {Category} from "../schemas/category";
import {getAllCategories} from "../services/categoryService";

export const useCategory = () => {
    return useQuery<Category[], Error>('categories', getAllCategories);
};
