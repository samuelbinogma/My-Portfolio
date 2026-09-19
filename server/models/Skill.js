import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: { type: Number, min: 1, max: 100, default: 80 },
    category: { type: String, default: 'Frontend' },
    icon: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Skill', skillSchema);