import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../src/config/db.js';
import { MenuItem } from '../src/models/MenuItem.js';

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

(async function main() {
  const args = process.argv.slice(2);
  const term = args.find((a) => !a.startsWith('--')) || '';
  const exact = args.includes('--exact');
  const confirm = args.includes('--confirm');

  if (!term) {
    console.error('Usage: node scripts/removeMenu.js "<name or pattern>" [--exact] [--confirm]');
    process.exit(1);
  }

  const regex = exact ? new RegExp(`^${escapeRegExp(term)}$`, 'i') : new RegExp(term, 'i');
  const filter = { name: { $regex: regex } };

  try {
    await connectDB();

    const matches = await MenuItem.find(filter).select('_id name price category');
    if (matches.length === 0) {
      console.log('No matching items found.');
      return;
    }

    console.log('Matches:');
    for (const m of matches) {
      console.log(`- ${m.name} (₹${m.price}) [${m.category}] _id=${m._id}`);
    }

    if (!confirm) {
      console.log('\nDry-run only. Re-run with --confirm to delete these item(s).');
      return;
    }

    const ids = matches.map((m) => m._id);
    const result = await MenuItem.deleteMany({ _id: { $in: ids } });
    console.log(`\nDeleted ${result.deletedCount} item(s).`);
  } catch (err) {
    console.error('Removal failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
