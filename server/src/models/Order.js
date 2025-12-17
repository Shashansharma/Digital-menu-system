import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    name: String, // denormalized snapshot
    price: Number, // base price
    quantity: { type: Number, default: 1 },
    customizations: [{ label: String, priceDelta: { type: Number, default: 0 } }],
    lineTotal: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    tableNumber: { type: Number, required: true, index: true },
    status: {
      type: String,
      enum: ['pending', 'in_kitchen', 'ready', 'served', 'cancelled'],
      default: 'pending',
      index: true,
    },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    placedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    payments: [
      {
        amount: Number,
        method: { type: String, enum: ['cash', 'card', 'upi'], default: 'cash' },
        paidBy: { type: String },
        at: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);
