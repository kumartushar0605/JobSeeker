import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
    linkedIn: String,
    github: String
  },
  education: [
    {
      degree: String,
      institution: String,
      location: String,
      startDate: String,
      endDate: String,
      description: String
    }
  ],
  experience: [
    {
      position: String,
      company: String,
      location: String,
      startDate: String,
      endDate: String,
      description: String
    }
  ],
  skills: [
    {
      skill: String,
      level: String
    }
  ]
}, { timestamps: true });

export const Resume = mongoose.models.Resume || mongoose.model('Resume', resumeSchema);
