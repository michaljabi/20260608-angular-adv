import { Routes } from '@angular/router';
import { RxSignalStoreBasicsPage } from './c01-simple-store/rx-signal-store-basics.page';
import { RxSignalStoreWithStateChangePage } from './c02-simple-with-actions/rx-signal-store-with-state-change.page';
import { RxSignalStoreWithEffectPage } from './c03-simple-with-effect/rx-signal-store-with-effect.page';
import { RxSignalStoreEntitiesPage } from './c04-entities/rx-signal-store-entities.page';

export const partCRoutes: Routes = [
  { path: 'c-simple-store', component: RxSignalStoreBasicsPage },
  { path: 'c-simple-with-actions-store', component: RxSignalStoreWithStateChangePage },
  { path: 'c-simple-with-effect-store', component: RxSignalStoreWithEffectPage },
  { path: 'c-entities-store', component: RxSignalStoreEntitiesPage },
];
