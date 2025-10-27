import express from "express";
import { getAllCandidates, getCandidateById, unlockCandidate } from "../controller/profileController.js";

const router = express.Router();

router.get("/", getAllCandidates);
router.get("/:id", getCandidateById);
router.post("/unlock/:id", unlockCandidate);

export default router;
