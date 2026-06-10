import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import type {
  AuctionItem,
  AuctionItemWithoutUid,
} from '@auction-workspace/shared/domain';
import { db } from '../db/client';
import { auctions } from '../db/schema';

/**
 * Public column projection — the only real ceremony: it omits the internal
 * integer `id` so rows already match the contract. The lone gap is SQL `NULL`
 * description vs the optional contract field, normalized inline (`?? undefined`).
 */
const publicColumns = {
  uid: auctions.uid,
  title: auctions.title,
  imgUrl: auctions.imgUrl,
  price: auctions.price,
  description: auctions.description,
  isPromoted: auctions.isPromoted,
} as const;

@Injectable()
export class AuctionsService {
  /** All auctions in the public contract shape. */
  async findAll(): Promise<AuctionItem[]> {
    const rows = await db.select(publicColumns).from(auctions);
    return rows.map(toPublic);
  }

  /** Only promoted auctions. */
  async findPromoted(): Promise<AuctionItem[]> {
    const rows = await db
      .select(publicColumns)
      .from(auctions)
      .where(eq(auctions.isPromoted, true));
    return rows.map(toPublic);
  }

  /** Persist a new auction with a freshly generated public `uid`. */
  async create(dto: AuctionItemWithoutUid): Promise<AuctionItem> {
    const [created] = await db
      .insert(auctions)
      .values({ ...dto, uid: nanoid(8) })
      .returning(publicColumns);
    return toPublic(created);
  }
}

/** DB row from the public projection: identical to the contract bar SQL `NULL`. */
type AuctionRow = Omit<AuctionItem, 'description'> & { description: string | null };

/** Only the `NULL` description needs touching; `undefined` is dropped by JSON. */
const toPublic = (row: AuctionRow): AuctionItem => ({
  ...row,
  description: row.description ?? undefined,
});
