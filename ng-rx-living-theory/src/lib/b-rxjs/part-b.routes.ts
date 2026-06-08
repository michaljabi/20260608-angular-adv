import { Routes } from '@angular/router';
import { RxjsInComponentLifecyclePage } from './b02-other-creators/rxjs-in-component-lifecycle.page';
import { OneSourceManySubscribersBehaviorPage } from './b04-am-i-hot-or-not/one-source-many-subscribers-behavior.page';
import { CheckWhenImEndPage } from './b03-am-i-endless/check-when-im-end.page';
import { HoldTheStateWithBehaviourSubjectPage } from './b05-how-to-hold-the-state/hold-the-state-with-behaviour-subject.page';
import {
  UsingStatefulAndStatelessServicesPage
} from './b06-rxjs-stateful-stateless/using-stateful-and-stateless-services.page';

export const partBRoutes: Routes = [
  { path: 'b-in-component-lifecycle', component: RxjsInComponentLifecyclePage },
  { path: 'b-has-end-or-not', component: CheckWhenImEndPage },
  { path: 'b-cold-or-hot-observable', component: OneSourceManySubscribersBehaviorPage },
  { path: 'b-hold-state-behaviour-subject', component: HoldTheStateWithBehaviourSubjectPage },
  { path: 'b-stateful-stateless', component: UsingStatefulAndStatelessServicesPage },
];
