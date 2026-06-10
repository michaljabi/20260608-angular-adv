import { Component } from '@angular/core';
import { PageComponent } from '../../common/page/page.component';

@Component({
  selector: 'app-spec-driven-ai-dev-process',
  imports: [PageComponent],
  template: `<app-page
    pageTitle="Spec-Driven Dev"
    pageDescription="Za i przeciw"
    fileMatch="e-generative-ai/e05-pros-and-cons-of-spec-driven-dev/spec-driven-ai-dev-process.page"
  >
    <section class="content">
      <h2>Na czym polega?</h2>
      <blockquote>
        <strong>Spec-driven development</strong>: najpierw piszemy <code>spec</code> /
        <code>PRD</code>
        (co i dlaczego budujemy), dzielimy na zadania, a dopiero potem Agent implementuje
        <em>według</em> tego dokumentu.
      </blockquote>
      <p>Przepływ: <code>spec → zadania → implementacja → weryfikacja względem spec</code>.</p>

      Gdzie:
      <div class="notification has-background-grey-darker">
        <ul>
          <li>
            PRD = Product Requirements Document: opisuje co produkt/feature ma robić z perspektywy
            produktu/UX
          </li>
          <li>
            SPEC = Specification: opisuje jak to zostanie zbudowane z perspektywy
            inżynierii/architektury
          </li>
        </ul>
      </div>

      <div class="columns">
        <div class="column">
          <div class="notification is-success is-light">
            <strong>✅ Za</strong>
            <ul>
              <li>Jasność i wspólne zrozumienie przed kodem</li>
              <li>Spec jest <em>review'owalny</em> - łatwiej poprawić tekst niż kod</li>
              <li>Agent trzyma się ustaleń, mniej "dryfu"</li>
              <li>Dobre przy dużych / wieloetapowych zadaniach</li>
            </ul>
          </div>
        </div>
        <div class="column">
          <div class="notification is-warning is-light">
            <strong>❌ Przeciw</strong>
            <ul>
              <li>Narzut - dla drobnej zmiany to overkill</li>
              <li>Spec może się <em>rozjechać</em> z kodem (utrzymanie)</li>
              <li>Fałszywa pewność poprawności, jeśli spec jest zły</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="my-4">
        📃 Spróbuj Skilla PRD:
        <a href="https://www.aihero.dev/skills-to-prd" target="_blank">/skills-to-prd</a>
      </div>

      <blockquote>
        Reguła: im większe i bardziej ryzykowne zadanie, tym bardziej opłaca się spec. Dla małych -
        wystarczy <code>Plan Mode</code> lub <code>/grill-me</code>.
        <br />
        <br />
        Jeśli zostawiamy <em>Artefakty</em> (<code>PRD</code>, <code>SPEC</code>) - pamiętajmy o ich
        utrzymaniu względem <em>codebase</em> projektu. Wprowadźmy ich przeglądanie z Agentem jako
        "standard". Używajmy <code>progressive disclosure</code>
        - zamiast upychać DUŻO w jednym <code>*.md</code> 
        - róbmy odniesienia do pozostałych plików z zaznaczeniem czego dotyczą. Wtedy Agent zrobi (PULL) w razie potrzeby
      </blockquote>
    </section>
  </app-page>`,
  styles: ``,
})
export class SpecDrivenAiDevProcessPage {}
