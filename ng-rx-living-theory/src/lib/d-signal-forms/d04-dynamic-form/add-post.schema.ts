import { z } from 'zod';

export const PostSchema = z.object({
  name: z.string().min(2, 'Nazwa musi mieć min. 2 znaki'),
  description: z.string().min(10, 'Opis musi mieć min. 10 znaków'),
  tags: z
    .array(z.string().min(2, 'Tag musi mieć min. 2 znaki'))
    .min(1, 'Dodaj przynajmniej jeden tag'),
});

export type PostModel = z.infer<typeof PostSchema>;