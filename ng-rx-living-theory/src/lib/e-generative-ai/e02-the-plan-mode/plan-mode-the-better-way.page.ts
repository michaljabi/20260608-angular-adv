import { Component } from '@angular/core';
import { PageComponent } from '../../common/page/page.component';

@Component({
  selector: 'app-plan-mode-the-better-way',
  imports: [PageComponent],
  template: `<app-page
    pageTitle="Plan Mode"
    pageDescription="Najpierw plan, potem kod"
    fileMatch="e-generative-ai/e02-the-plan-mode/plan-mode-the-better-way.page"
  >
    <section class="content">
      <h2>Dlaczego Plan Mode?</h2>
      <p>
        Domyślnie Agent <strong>od razu</strong> zaczyna pisać kod. Przy skomplikowanym zadaniu to
        ryzyko: idzie w złą stronę, a my płacimy tokenami i czasem za poprawki.
      </p>
      <blockquote>
        <code>Plan Mode</code> to tryb <strong>read-only</strong>. Agent najpierw bada kod, zadaje
        pytania i przedstawia <em>plan</em>. Dopiero po naszej akceptacji przechodzi do edycji.
      </blockquote>

      <div class="notification has-background-grey-darker">
        W praktyce bywa różnie z <code>Plan Mode</code> - ponieważ Agenci działają
        "niedeterministycznie". Możemy w takim układzie np. od razu
        <em>bez ani jednego pytania</em> dostać - gotowy plan do akceptacji. To w części przypadków
        może okazać się pomocne, ale musimy zachować ostrożność, po prostu przeczytać plan i
        sprawdzić czy ma on sens, zanim akceptujemy.
      </div>

      <h4>Pętla pracy</h4>
      <ol>
        <li>Włącz Plan Mode <code>Shift + Tab</code> i opisz cel</li>
        <li>Podawaj detale tak jakbyś tłumaczył "osobie", swoje intencje</li>
        <li>
          Pamiętaj, że Agent wie tyle co w AGENT.md (<em>PUSH</em>) + ew. użyje SKILLs
          (<em>PULL</em>)
        </li>
        <li>Agent czyta kod i proponuje plan</li>
        <li>Iterujesz nad planem (poprawki, doprecyzowanie) — to tani etap</li>
        <li>Akceptujesz → Agent wykonuje lub jeśli przekroczony próg <code>140k</code> Tokenów - zapisujesz do <code>znacząca-nazwa-planu.md</code></li>
        <li>Jeśli plan zapisany jako <code>*.md</code> - wykonujesz z Agentem w nowym <code>context window</code> (nowa sesja)</li>
      </ol>

      <h4>Best practices (<em>less is more</em>)</h4>
      <div class="notification is-success is-light">
        <ul>
          <li>
            <strong>Małe plany</strong> — jeden plan = jeden spójny zakres, nie koniecznie cały
            feature - zwłaszcza jeśli skomplikowany
          </li>
          <li><strong>Krótkie plany</strong> — plan, który faktycznie przeczytasz</li>
          <li>Na końcu planu poproś o <em>listę pytań otwartych</em> do odpowiedzi</li>
          <li>Podziel plan na <code>Phases</code> - skończone fazy wykonania</li>
          <li>Poproś Agenta o zapisanie planu do pliku <code>*.md</code></li>
        </ul>
      </div>

      <div class="notification is-warning is-light">
        ❌ UNIKAJ — akceptacji planu "w ciemno". Jeśli plan jest zły, kod też będzie zły.
      </div>

      <div>
        📃 Matt Pocock:
        <a
          href="https://www.aihero.dev/my-agents-md-file-for-building-plans-you-actually-read"
          target="_blank"
          >my-agents-md-file-for-building-plans-you-actually-read</a
        >
      </div>
    </section>
  </app-page>`,
  styles: ``,
})
export class PlanModeTheBetterWayPage {}