import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true, unique: true },
    capacity: { type: Number, default: 2 },
    currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: null },
    isOccupied: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Table = mongoose.model('Table', tableSchema);
