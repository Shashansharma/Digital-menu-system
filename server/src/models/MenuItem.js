import mongoose from 'mongoose';

const customizationOptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ['select', 'multi', 'boolean'], default: 'select' },
    choices: [
      {
        label: String,
        priceDelta: { type: Number, default: 0 },
      },
    ],
    required: { type: Boolean, default: false },
  },
  { _id: false }
);

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: { type: String, index: true },
    price: { type: Number, required: true },
    imageUrl: String,
    isAvailable: { type: Boolean, default: true },
    customization: [customizationOptionSchema],
    soldCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
