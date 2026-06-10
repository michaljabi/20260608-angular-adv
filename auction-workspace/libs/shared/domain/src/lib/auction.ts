import { z } from 'zod';

export const auctionSchema = z.object({
  uid: z.string(), // identyfikator publiczny
  title: z.string().min(1, 'Podaj nazwę aukcji'),
  imgUrl: z.url('Niepoprawny adres URL zdjęcia'),
  price: z.number('Podaj cenę').nonnegative('Cena nie może być ujemna'),
  description: z.string().optional(),
  isPromoted: z.boolean().default(false),
});
export const createAuctionSchema = auctionSchema.omit({ uid: true });

export type AuctionItem = z.infer<typeof auctionSchema>;
export type AuctionItemWithoutUid = z.infer<typeof createAuctionSchema>;
