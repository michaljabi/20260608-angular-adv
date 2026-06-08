## Rozgrzewka 0:

1. `npm i --legacy-peer-deps` dla [auctions](./auctions)
2. `npm i` dla [auctions-api](./auctions-api)

Potem `run`:

Warto zapamiętać:
```
npm run
npm run --help
npm start
```

#### Back-end potrzebował jeszcze:
```
npm run db-seed
npm run start:dev
```


## Zadanie 2:

Pytanie o rodzaj aplikacji: _SPA / SSR / SSG_


- **SPA** - _Sigle Page Application_ (tylko w przeglądarce - pure JS/HTML/CSS)
- **SSR** - _Server Side Rendering_ (strona "hydrowana", generowana dynamicznie per request, np. chemy dane z serwera aktualne)
    - uzywamy pod SEO (Search Engine Optimization) 
    - dla stron które chcemy mieć zawsze pod SEO aktualne (korzystają z danych sewerowych które często się zmieniają)
    - chcemy mieć "zahydrowany" stan "źródła strony"
- **SSG** - _Server Side Generation_ (strona generowana w momencie `build`, requesty możliwe przez `ajax`)
    - używamy dla storn "statycznych" - które rzadko zmieniamy (SEO), 
    - albo korzystają z ładowania danych przez ajax (odświeżą się w momencie pierwszego wywołania)

## Zadanie 3:

- Aplikacja  `ng-rx-living-theory`, instalacja:

```
npm i --legacy-peer-deps
```

- to aplikacja fullStack - głównie `SSG` (wygenerowana podczas build) 
- może korzystać z danych serwera - dzięki `AJAX`
- jedna ze stron korzysta z `localStorage` -> `/a-effects` dlatego jest przygotowana jako `.Client` = w stylu SPA
- ustawieniem stron zajmuje się plik `app.routes.server.ts` w konfiguracji `src/app/`
- dostęp do logiki serwera mamy w `src/server.ts`