import { Component } from '@angular/core';
import { PageComponent } from '../../common/page/page.component';
import { SubscriptionControlIntervalComponent } from './subscription-control-interval.component';
import { AutoCleanupIntervalComponent } from './auto-cleanup-interval.component';

@Component({
  selector: 'app-rxjs-in-component-lifecycle',
  imports: [PageComponent, SubscriptionControlIntervalComponent, AutoCleanupIntervalComponent],
  template: `<app-page
    pageTitle="RxJS w cyklu życia komponentu"
    pageDescription="interval(2000) emituje kolejne liczby co 2 sekundy. Subskrypcję tworzymy w ngOnInit, a w ngOnDestroy ją zwalniamy, by uniknąć wycieku pamięci."
    fileMatch="b-rxjs/b02-other-creators/rxjs-in-component-lifecycle.page"
  >
    <div class="box">
      <app-auto-cleanup-interval />
    </div>
    <div class="box">
     <app-subsciption-control-interval />
   </div> 

  </app-page>`,
})
export class RxjsInComponentLifecyclePage {}