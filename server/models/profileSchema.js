import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    experience: { type: String, required: true },
    location: { type: String, required: true },
    company: { type: String },
    availability: { type: String },
    score: { type: Number, default: 0 },
    skills: [{ type: String }],
    idealNextOpportunity: { type: String },
    salary: { type: String },
    isClubMember: { type: Boolean, default: false },
    unlocked: { type: Boolean, default: false },
    unlockCost: { type: Number },
    about: { type: String },
    college: { type: String },
    degree: { type: String },
    graduationYear: { type: String },
    experiences: [
      {
        title: { type: String },
        company: { type: String },
        period: { type: String },
      },
    ],
    email: { type: String, required: true },
    website: { type: String },
    resume: { type: String },
    socials: [
      {
        platform: { type: String },
        url: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const Profile = mongoose.model("Candidate", ProfileSchema);
