import { nanoid } from 'nanoid';
import { db, sqlite } from './client';
import { runMigrations } from './migrate';
import { advices, auctions } from './schema';
import { seedAdvices, seedAuctions } from './seed-data';

async function seed(): Promise<void> {
  const force = process.argv.includes('--force');
  await runMigrations();

  if (force) {
    db.delete(auctions).run();
    db.delete(advices).run();
  } else {
    const existing = db
      .select({ id: auctions.id })
      .from(auctions)
      .limit(1)
      .all();
    if (existing.length > 0) {
      console.log(
        'Auctions already seeded — skipping (use --force to reseed).',
      );
      return;
    }
  }

  const rows = seedAuctions.map((a) => ({ ...a, uid: nanoid(8) }));
  db.insert(auctions).values(rows).run();
  console.log(`Seeded ${rows.length} auctions.`);

  const adviceRows = seedAdvices.map((a) => ({ ...a, uid: nanoid(8) }));
  db.insert(advices).values(adviceRows).run();
  console.log(`Seeded ${adviceRows.length} advices.`);
}

seed()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exitCode = 1;
  })
  .finally(() => sqlite.close());
