import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../src/config/db.js';
import { MenuItem } from '../src/models/MenuItem.js';

// Demo menu with real images (Unsplash). Update names/categories/prices as desired.
const DEMO_ITEMS = [
  {
    name: 'Paneer Tikka',
    category: 'Starters',
    price: 300,
    description: 'Smoky cottage cheese with spices, mint chutney.',
    imageUrl: 'https://images.unsplash.com/photo-1604908554049-1c4010025caf?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Chicken Biryani',
    category: 'Main Course',
    price: 420,
    description: 'Aromatic basmati rice, saffron, tender chicken.',
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172e8?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 380,
    description: 'Tomato, mozzarella, fresh basil, olive oil.',
    imageUrl: 'https://images.unsplash.com/photo-1548365328-9f547fb09530?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Fresh Lemonade',
    category: 'Beverages',
    price: 120,
    description: 'Refreshing lemon, mint, and a hint of sugar.',
    imageUrl: 'https://images.unsplash.com/photo-1524594227083-60e5600f3b39?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Veg Burger',
    category: 'Burgers',
    price: 220,
    description: 'Crispy veg patty with lettuce and house sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
  },
];

const FORCE = process.argv.includes('--force');

(async function main() {
  try {
    await connectDB();

    let upserts = 0;
    for (const doc of DEMO_ITEMS) {
      const existing = await MenuItem.findOne({ name: doc.name });
      if (existing) {
        const update = { ...doc };
        if (!FORCE) {
          // Respect existing image unless force
          if (existing.imageUrl) update.imageUrl = existing.imageUrl;
        }
        await MenuItem.updateOne({ _id: existing._id }, { $set: update });
      } else {
        await MenuItem.create({ ...doc, isAvailable: true });
      }
      upserts++;
      console.log(`Upserted: ${doc.name}`);
    }

    console.log(`\nDemo seed complete. Upserted ${upserts} item(s).`);
  } catch (err) {
    console.error('Demo seed failed:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
