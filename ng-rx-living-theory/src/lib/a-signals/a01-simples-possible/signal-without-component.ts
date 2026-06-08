/**
 * Możesz uruchomić ten plik poleceniem:
 *
 *   npx tsx .\signal-without-component.ts
 *
 * */

import { signal } from '@angular/core';

const count = signal(10);
const readonlyCount = count.asReadonly();

console.log(count());

count.set(20);
console.log(count(), readonlyCount());

count.update((value) => value + 12);
console.log('count', count());
console.log('readonlyCount', readonlyCount());

console.log(count);
