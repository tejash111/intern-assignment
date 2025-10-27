import { Profile } from '../models/profileSchema.js'


export const getAllCandidates = async (req, res) => {
    try {
        const candidates = await Profile.find();
        res.status(200).json({
            success: true,
            count: candidates.length,
            data: candidates,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch candidates",
            error: error.message,
        });
    }
};


export const getCandidateById = async (req, res) => {
    try {
        const { id } = req.params;
        const candidate = await Profile.findById(id);

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found",
            });
        }

        res.status(200).json({
            success: true,
            data: candidate,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch candidate",
            error: error.message,
        });
    }
};


export const unlockCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const candidate = await Profile.findByIdAndUpdate(
            id,
            { unlocked: true },
            { new: true }
        );
        if (!candidate) {
            return res.status(404).json({ success: false, message: "Candidate not found" });
        }
        res.status(200).json({ success: true, data: candidate });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to unlock candidate", error: error.message });
    }
};
