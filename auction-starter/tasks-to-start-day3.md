## Zadanie 11 - na start

11. 1
- w projekcie `ng-rx-living-theory` sprawdź część `a07` -> `httpResource (zasób HTTP)` 
- zobacz skąd i w jaki sposób ładowane są dane. Jaki problem rozwiązuje `httpResource` ?
- popsuj specjalnie np. adres `URL` żeby zobaczyć "sad path" i jak wygląda błąd zapytania
- zauważ po co wykorzystuje się `httpResource` i jak działa w pliku `users-http-resource.page.ts`
- przeczytaj i wykonaj `⚔️ Sidequest`

11. 2
- wróć do naszego projektu głównego: `auction-starter/auctions`
- zmień w `auctions-page.component.ts` sposób ładowania aukcji na `httpResource`
- zauważ, że chcemy go zastosować w `auctions-service.ts`
- tylko zastąpić metodę `this.httpClient.get` (httpResource służy do "odczytu" danych z back-end)
- wyprowadzić potrzebne pozostałe sygnały
- zastosować w komponencie `aucions-page.component.ts`
- możesz przygotować nowy `service` dla porównania i umieścić rozwiązanie w `ng g s auctions --type="resource" --dry-run` (pamiętaj o odpięciu `--dry-run`)

11. 3
- sprawdź swoje rozwiązanie, czy aukcje popeawnie się ładują, czy pokazuje się box z error, loading, 