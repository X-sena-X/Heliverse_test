import { Router } from "express";
import {
    createUser,
    deleteUser,
    filters,
    getUserById,
    getUsers,
    searchByName,
    updateUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getUsers);
router.get("/id/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/search", searchByName);
router.get("/filters", filters);

export default router;
