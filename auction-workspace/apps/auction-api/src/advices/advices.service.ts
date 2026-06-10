import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { advices } from '../db/schema';
import { Advice, AdviceSummary } from './advice';

@Injectable()
export class AdvicesService {
  /** Widok listy: tylko `uid` + `title` na potrzeby lewego panelu wyboru. */
  async findAll(): Promise<AdviceSummary[]> {
    return db.select({ uid: advices.uid, title: advices.title }).from(advices);
  }

  /** Pełny artykuł po publicznym `uid`. */
  async findOne(uid: string): Promise<Advice> {
    const [row] = await db
      .select({
        uid: advices.uid,
        title: advices.title,
        postedArticle: advices.postedArticle,
      })
      .from(advices)
      .where(eq(advices.uid, uid));

    if (!row) {
      throw new NotFoundException(`Nie znaleziono porady "${uid}"`);
    }
    return row;
  }
}
