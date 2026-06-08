import { z } from 'zod';

// Część "konto" – pola użytkownika bez adresu.
export const UserSchema = z.object({
  name: z.string().min(2, 'Imię i nazwisko musi mieć min. 2 znaki'),
  username: z.string().min(3, 'Login musi mieć min. 3 znaki'),
  email: z.email('Nieprawidłowy adres e-mail'),
  phone: z.string().min(6, 'Telefon musi mieć min. 6 znaków'),
  website: z.string(),
});

// Osobny schemat adresu – walidowany niezależnie, tylko gdy adres jest dodany.
export const UserAddressSchema = z.object({
  street: z.string().min(2, 'Ulica musi mieć min. 2 znaki'),
  suite: z.string().min(1, 'Podaj numer / lokal'),
  city: z.string().min(2, 'Miasto musi mieć min. 2 znaki'),
  zipcode: z.string().min(3, 'Kod pocztowy musi mieć min. 3 znaki'),
});

export type UserModel = z.infer<typeof UserSchema>;
export type UserAddressModel = z.infer<typeof UserAddressSchema>;

// Model całego formularza: konto + przełącznik + zawsze obecny obiekt adresu.
export type CreateAccountModel = UserModel & {
  hasAddress: boolean;
  address: UserAddressModel;
};
