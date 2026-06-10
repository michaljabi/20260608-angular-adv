import { Component } from '@angular/core';
import { PageComponent } from '../../common/page/page.component';

@Component({
  selector: 'app-project-integration',
  imports: [PageComponent],
  template: `<app-page
    pageTitle="Integracja"
    pageDescription="Agent AI w istniejącym projekcie"
    fileMatch="e-generative-ai/e06-integration-into-existing-app/project-integration.page"
  >
    <section class="content">
      <h2>Od czego zacząć?</h2>
      <p>
        Wpięcie Agenta w <strong>istniejący</strong> kod to nie "wielki przepływ od zera", tylko
        kilka małych, sprawdzalnych kroków.
      </p>

      <h4>1. Dostrój <code>AGENTS.md</code> / <code>CLAUDE.md</code></h4>
      <blockquote>
        Zapisz <strong>konwencje projektu</strong>, które naprawdę mają znaczenie (styl, wzorce,
        czego unikać). Bez opisu struktury katalogów i komend - Agent odczyta je sam.
      </blockquote>

      <h4>
        2. Pracuj i planuj używając
        <a
          href="https://blog.orbisbit.com/wpisy/vertical-slice-architecture-jak-pisac-systemy-ktore-nie-bola/"
          target="_blank"
        >
          Vertical Slices
        </a>
        / <a href="https://www.aihero.dev/tracer-bullets" target="_blank">Tracer Bullets</a>
      </h4>
      <div class="notification is-success is-light">
        💡 Zacznij od <strong>małego, kompletnego</strong> zadania (jeden komponent + jego service +
        ew. endpoint) i zweryfikuj wynik.
      </div>

      <h4>3. Niech Agent czyta kod</h4>
      <div class="notification is-warning is-light">
        ❌ UNIKAJ ręcznego opisywania struktury i plików w promptach. Wskaż <em>gdzie</em> patrzeć (Za pomocą &#64;)-
        resztę Agent odczyta z repo (tańsze i zawsze aktualne).
      </div>

      <blockquote>
        Cel:
        <br />
        powtarzalna pętla <code>Plan Mode (/grill-me) → akceptacja → wykonanie → weryfikacja</code>,
        dopasowana do realiów istniejącego projektu
      </blockquote>

      <div class="notification has-background-grey-darker">
        
      </div>
    </section>
  </app-page>`,
  styles: ``,
})
export class ProjectIntegrationPage {}
