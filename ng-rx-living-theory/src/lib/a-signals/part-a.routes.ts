import { Routes } from '@angular/router';
import { SignalUsedInPage } from './a02-signals-basic/signal-used-in.page';
import { SignalComputedPage } from './a03-computed/signal-computed.page';
import { SignalEffectPage } from './a04-effects/signal-effect.page';
import { SignalCommunicationForLongDistancePage } from './a05-signal-store/signal-communication-for-long-distance.page';
import { ComputedButWriteablePage } from './a06-linked-signal/computed-but-writeable.page';
import { UsersHttpResourcePage } from './a07-http-resource/users-http-resource.page';
import { MakeSignalFormRxStreamPage } from './a08-rxjs-interop/make-signal-form-rx-stream.page';

export const partARoutes: Routes = [
  { path: 'a-signals-basic', component: SignalUsedInPage },
  { path: 'a-computed', component: SignalComputedPage },
  { path: 'a-effects', component: SignalEffectPage },
  { path: 'a-signal-store', component: SignalCommunicationForLongDistancePage },
  { path: 'a-linked-signal', component: ComputedButWriteablePage },
  { path: 'a-http-resource', component: UsersHttpResourcePage },
  { path: 'a-rxjs-interop', component: MakeSignalFormRxStreamPage },
];