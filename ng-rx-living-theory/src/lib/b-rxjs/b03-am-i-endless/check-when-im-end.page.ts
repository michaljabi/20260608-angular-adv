import { Component } from '@angular/core';
import { PageComponent } from '../../common/page/page.component';
import { FirstTryComponent } from './first-try.component';
import { FromCreatorTryComponent } from './from-creator-try.component';
import { FromCreatorWithPipeTryComponent } from './from-creator-with-pipe-try.component';

@Component({
  selector: 'app-check-when-im-end',
  imports: [PageComponent, FirstTryComponent, FromCreatorTryComponent, FromCreatorWithPipeTryComponent],
  template: `<app-page
    pageTitle="Skończony czy nieskończony?"
    pageDescription="Strumień emituje kolejne wartości co sekundę i sam się kończy po wyemitowaniu 4. Obserwuj kolumnę „Ukończono” — gdy strumień się dopełni (complete), zmieni się na „Tak”. To pokazuje różnicę między strumieniem skończonym a nieskończonym."
    fileMatch="b-rxjs/b03-am-i-endless/check-when-im-end.page"
  >
    <table class="table is-fullwidth is-bordered is-striped">
      <thead>
        <tr>
          <th>Lp.</th>
          <th>Nazwa</th>
          <th>Aktualna wartość</th>
          <th>Ukończono</th>
        </tr>
      </thead>
      <tbody>
        <tr app-first-try></tr>
        <tr app-from-creator-try></tr>
        <tr app-from-creator-with-pipe-try></tr>
      </tbody>
    </table>
  </app-page>`,
  styles: ``,
})
export class CheckWhenImEndPage {}
