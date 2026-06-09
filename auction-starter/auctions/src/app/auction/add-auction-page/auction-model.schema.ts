import { z } from 'zod';

const genericReq = 'To pole jest wymagane';

export const AuctionModelSchema = z.object({
  title: z.string().min(1, genericReq),
  price: z.number('Musisz podać cenę aukcji').min(0, 'Min. cena to "0" - za darmo'),
  imgId: z.number(genericReq).min(1, 'Min. 1!').max(1080, 'Max 1080!'),
  description: z.string(),
});

export type AuctionFormModel = z.infer<typeof AuctionModelSchema>;
