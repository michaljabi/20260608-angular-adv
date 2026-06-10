import { createAuctionSchema } from '@auction-workspace/shared/domain';
import { step1Schema, step2Schema } from './auction-form.schema';

/**
 * Testowanie działania i API schematów Zod
 *
 * **/
describe('auction-form step schemas', () => {
  const valid = {
    title: 'Rower',
    price: 120,
    imgUrl: 'https://picsum.photos/id/1/600/400',
    isPromoted: false,
    description: 'fajny',
  };

  it('step1 validates only title + price', () => {
    expect(step1Schema.safeParse({ title: 'X', price: 1 }).success).toBe(true);
    expect(step1Schema.safeParse({ title: '', price: 1 }).success).toBe(false);
  });

  it('inherits Polish messages from the domain schema', () => {
    const res = step1Schema.safeParse({ title: '', price: -1 });
    const messages = res.success ? [] : res.error.issues.map((i) => i.message);
    expect(messages).toContain('Podaj nazwę aukcji');
    expect(messages).toContain('Cena nie może być ujemna');
  });

  it('merge(step1, step2) accepts the same object as createAuctionSchema', () => {
    const merged = step1Schema.merge(step2Schema);
    expect(merged.safeParse(valid).success).toBe(true);
    expect(createAuctionSchema.safeParse(valid).success).toBe(true);
    expect(Object.keys(merged.shape).sort()).toEqual(
      Object.keys(createAuctionSchema.shape).sort(),
    );
  });
});
