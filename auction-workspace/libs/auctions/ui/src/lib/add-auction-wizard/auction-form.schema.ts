import { createAuctionSchema } from '@auction-workspace/shared/domain';

/**
 * Kroki kreatora = KOMPOZYCJA jednego kontraktu domeny przez `.pick(...)`.
 * Źródłem prawdy jest `createAuctionSchema` (shared/domain)
 *
 * tu tylko TNIEMY go na slice'y per krok.
 * Komunikaty walidacji są DZIEDZICZONE z domeny (po polsku).
 *
 * Tutaj, rozdzielenie zrobione jest "specjalnie" aby pokazać, że "da sie tak zrobić w Zod"!
 * Jednakże zrobienie tego z perspektywy samego Wizzarda - to trochę "ceremonia", bez większej wartości.
 *
 * Przykład jednak ma Wam pokazać "Można na bazie jednego schematu Zod, tworzyć inne" np. pod multi-step-formy
 */

// Krok 1 — podstawy
export const step1Schema = createAuctionSchema.pick({
  title: true,
  price: true,
});

// Krok 2 — zdjęcie + szczegóły
export const step2Schema = createAuctionSchema.pick({
  imgUrl: true,
  description: true,
  isPromoted: true,
});
