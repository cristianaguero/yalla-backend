import { Router } from "express";
import checkAuth from "../middlewares/authMiddleware.js";
import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoriesController.js";


const router = Router();

router.post("/", checkAuth, createCategory);
router.put("/:id", checkAuth, updateCategory);
router.delete("/:id", checkAuth, deleteCategory);

router.get("/", checkAuth, getAllCategories);

export default router;