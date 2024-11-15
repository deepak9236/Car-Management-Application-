import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: { type: [String], validate: [arrayLimit, 'Maximum 10 images allowed'] },
  tags: { type: [String], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

function arrayLimit(val) {
  return val.length <= 2;
}

export const Car = mongoose.model('Car', carSchema);
