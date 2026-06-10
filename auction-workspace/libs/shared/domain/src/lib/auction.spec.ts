import { describe, it, expect } from 'vitest';
import { auctionSchema, createAuctionSchema } from './auction';

// Poprawne dane
const validItem = {
  uid: 'auc_123',
  title: 'Vintage chair',
  imgUrl: 'https://cdn.example.com/chair.png',
  price: 49.99,
  description: 'A nice chair',
  isPromoted: true,
};

// usuń dane property z danych validItem, bez eslint błędów o no-unused-vars
const without = <T extends object, K extends keyof T>(
  obj: T,
  key: K,
): Omit<T, K> => {
  const clone = { ...obj };
  delete clone[key];
  return clone;
};

describe('auctionSchema', () => {
  it('parses a fully-populated valid item', () => {
    const parsed = auctionSchema.parse(validItem);
    expect(parsed).toEqual(validItem);
  });

  it('applies isPromoted default (false) when omitted', () => {
    const parsed = auctionSchema.parse(without(validItem, 'isPromoted'));
    expect(parsed.isPromoted).toBe(false);
  });

  it('allows description to be omitted (optional)', () => {
    const result = auctionSchema.safeParse(without(validItem, 'description'));
    expect(result.success).toBe(true);
  });

  describe('title', () => {
    it('rejects an empty title (min 1)', () => {
      const result = auctionSchema.safeParse({ ...validItem, title: '' });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]?.path).toEqual(['title']);
    });

    it('rejects a non-string title', () => {
      const result = auctionSchema.safeParse({ ...validItem, title: 123 });
      expect(result.success).toBe(false);
    });
  });

  describe('imgUrl', () => {
    it('rejects a non-URL string', () => {
      const result = auctionSchema.safeParse({
        ...validItem,
        imgUrl: 'not-a-url',
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]?.path).toEqual(['imgUrl']);
    });

    it('accepts a valid http(s) URL', () => {
      const result = auctionSchema.safeParse({
        ...validItem,
        imgUrl: 'http://example.org/a.jpg',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('price', () => {
    it('accepts zero (nonnegative boundary)', () => {
      const result = auctionSchema.safeParse({ ...validItem, price: 0 });
      expect(result.success).toBe(true);
    });

    it('rejects a negative price', () => {
      const result = auctionSchema.safeParse({ ...validItem, price: -1 });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]?.path).toEqual(['price']);
    });

    it('rejects a non-number price (no string coercion)', () => {
      const result = auctionSchema.safeParse({ ...validItem, price: '10' });
      expect(result.success).toBe(false);
    });
  });

  it('strips unknown keys by default', () => {
    const parsed = auctionSchema.parse({ ...validItem, hacker: 'value' });
    expect(parsed).not.toHaveProperty('hacker');
  });

  it('reports all invalid fields at once', () => {
    const result = auctionSchema.safeParse({
      uid: 'x',
      title: '',
      imgUrl: 'nope',
      price: -5,
    });
    expect(result.success).toBe(false);
    const paths = result.error?.issues.map((i) => i.path[0]).sort();
    expect(paths).toEqual(['imgUrl', 'price', 'title']);
  });
});

describe('createAuctionSchema', () => {
  it('omits uid from the shape', () => {
    expect(Object.keys(createAuctionSchema.shape)).not.toContain('uid');
  });

  it('parses a valid create payload without uid', () => {
    const result = createAuctionSchema.safeParse(without(validItem, 'uid'));
    expect(result.success).toBe(true);
  });

  it('ignores a supplied uid (omitted, not forbidden)', () => {
    const parsed = createAuctionSchema.parse(validItem);
    expect(parsed).not.toHaveProperty('uid');
  });

  it('still enforces the inherited rules (negative price rejected)', () => {
    const payload = { ...without(validItem, 'uid'), price: -1 };
    const result = createAuctionSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });
});
