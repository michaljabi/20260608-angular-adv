import { Routes } from '@angular/router';
import { partARoutes } from '../lib/a-signals/part-a.routes';
import { partBRoutes } from '../lib/b-rxjs/part-b.routes';
import { partCRoutes } from '../lib/c-ng-rx/part-c.routes';
import { partDRoutes } from '../lib/d-signal-forms/part-d.routes';
import { HelloPage } from '../lib/common/hello-page/hello.page';
import { partERoutes } from '../lib/e-generative-ai/part-e.routes';

export const routes: Routes = [
  { path: '', component: HelloPage, pathMatch: 'full' },
  ...partARoutes,
  ...partBRoutes,
  ...partCRoutes,
  ...partDRoutes,
  ...partERoutes,
];
