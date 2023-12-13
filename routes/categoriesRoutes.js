import { Router } from "express";
import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoriesController.js";


const router = Router();

router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

router.get("/", getAllCategories);

export default router;