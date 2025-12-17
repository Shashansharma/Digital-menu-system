import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../src/config/db.js';
import { MenuItem } from '../src/models/MenuItem.js';

// Map common dish name keywords to real, high-quality image URLs (Unsplash)
// Note: These are static links suitable for demos. Replace with your own CDN later.
const CATALOG = [
  { match: /paneer|tikka/i, url: 'https://images.unsplash.com/photo-1604908554049-1c4010025caf?auto=format&fit=crop&w=900&q=80' },
  { match: /biryani/i, url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172e8?auto=format&fit=crop&w=900&q=80' },
  { match: /pizza|margherita|pepperoni/i, url: 'https://images.unsplash.com/photo-1548365328-9f547fb09530?auto=format&fit=crop&w=900&q=80' },
  { match: /lemonade|lemon/i, url: 'https://images.unsplash.com/photo-1524594227083-60e5600f3b39?auto=format&fit=crop&w=900&q=80' },
  { match: /burger|cheese ?burger|veg ?burger/i, url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80' },
  { match: /dosa/i, url: 'https://images.unsplash.com/photo-1624309539961-c45ffb391d4b?auto=format&fit=crop&w=900&q=80' },
  { match: /naan|butter ?naan/i, url: 'https://images.unsplash.com/photo-1596568358656-85f7fb81bb18?auto=format&fit=crop&w=900&q=80' },
  { match: /gulab|jamun/i, url: 'https://images.unsplash.com/photo-1641274567402-10eeaf0da822?auto=format&fit=crop&w=900&q=80' },
  { match: /chole|bhature/i, url: 'https://images.unsplash.com/photo-1668236544984-b76c8d6b7bd0?auto=format&fit=crop&w=900&q=80' },
  { match: /fried ?rice|veg fried/i, url: 'https://images.unsplash.com/photo-1598866594230-a7c12756260e?auto=format&fit=crop&w=900&q=80' },
  { match: /tandoori/i, url: 'https://images.unsplash.com/photo-1619851351352-9b4a59a5bff1?auto=format&fit=crop&w=900&q=80' },
];

const FORCE = process.argv.includes('--force');

(async function main() {
  try {
    await connectDB();

    const items = await MenuItem.find({});
    let updates = 0;

    for (const it of items) {
      if (!FORCE && it.imageUrl) continue; // only fill missing unless forced
      const entry = CATALOG.find(e => e.match.test(it.name || ''));
      if (!entry) continue;
      await MenuItem.updateOne({ _id: it._id }, { $set: { imageUrl: entry.url } });
      updates++;
      console.log(`Updated: ${it.name} -> ${entry.url}`);
    }

    console.log(`\nSeed complete. Updated ${updates} item(s).`);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
