import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    longDescription: { type: String, default: '' },
    image: { type: String, default: '' },
    stack: [{ type: String }],
    liveUrl: { type: String, default: '' },
    repoUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    category: { type: String, default: 'Web App' },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);