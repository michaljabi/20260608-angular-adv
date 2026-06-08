import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { db } from '../db/client';
import { auctions } from '../db/schema';
import { AuctionItem, PromotedAuctionItem } from './auction-item';

/**
 * Projekcja kolumn publicznych — jedyna istotna ceremonia: pomija wewnętrzny
 * całkowity `id`, dzięki czemu wiersze od razu pasują do kontraktu. Jedyna
 * rozbieżność to SQL `NULL` w opisie wobec opcjonalnego pola w kontrakcie,
 * normalizowana w miejscu (`?? undefined`).
 */
const publicColumns = {
  uid: auctions.uid,
  title: auctions.title,
  imgUrl: auctions.imgUrl,
  price: auctions.price,
  description: auctions.description,
  isPromoted: auctions.isPromoted,
} as const;

/** Tytuły aukcji zastrzeżone. */
const RESTRICTED_AUCTION_TITLES = ['allegro', 'olx', 'licytacja komornicza'];

@Injectable()
export class AuctionsService {
  /** Sprawdza, czy tytuł aukcji jest zastrzeżony (case-insensitive). */
  checkAuctionTitleRestrictions(name: string): boolean {
    const normalized = (name ?? '').trim().toLowerCase();
    return RESTRICTED_AUCTION_TITLES.includes(normalized);
  }

  /** Wszystkie aukcje w publicznym kształcie kontraktu. */
  async findAll(): Promise<AuctionItem[]> {
    const rows = await db.select(publicColumns).from(auctions);
    return rows.map(toPublic);
  }

  /** Tylko promowane aukcje. */
  async findPromoted(): Promise<PromotedAuctionItem[]> {
    const rows = await db
      .select(publicColumns)
      .from(auctions)
      .where(eq(auctions.isPromoted, true));
    return rows.map(toPublic) as PromotedAuctionItem[];
  }

  /** Zapisuje nową aukcję ze świeżo wygenerowanym publicznym `uid`. */
  async create(dto: Omit<AuctionItem, 'uid'>): Promise<AuctionItem> {
    const [created] = await db
      .insert(auctions)
      .values({ ...dto, uid: nanoid(8) })
      .returning(publicColumns);
    return toPublic(created);
  }
}

/** Wiersz z bazy z projekcji publicznej: identyczny z kontraktem poza SQL `NULL`. */
type AuctionRow = Omit<AuctionItem, 'description'> & {
  description: string | null;
};

/** Tylko opis `NULL` wymaga zmiany; `undefined` jest pomijane przez JSON. */
const toPublic = (row: AuctionRow): AuctionItem | PromotedAuctionItem => ({
  ...row,
  description: row.description ?? undefined,
});
