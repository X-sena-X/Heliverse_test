import { Router } from "express";
import {
    createTeam,
    deleteTeam,
    getTeamById,
    getTeams,
} from "../controllers/team.controller";

const router = Router();

router.get("/", getTeams);
router.get("/:id", getTeamById);
router.post("/", createTeam);
router.delete("/:id", deleteTeam);

export default router;
