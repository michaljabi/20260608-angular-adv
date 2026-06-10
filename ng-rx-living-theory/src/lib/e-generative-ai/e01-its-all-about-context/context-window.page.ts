import { Component } from '@angular/core';
import { PageComponent } from '../../common/page/page.component';

@Component({
  selector: 'app-context-window',
  imports: [PageComponent],
  template: `<app-page
    pageTitle="Kontekst"
    pageDescription="Kontekst"
    fileMatch="e-generative-ai/e01-its-all-about-context/context-window.page"
  >
    <section class="content">
      <h2>Agenci AI</h2>
      <p>Do rozpoczęcia kodowania z Agentem AI użyjemy <code>opencode</code></p>

      <h4>Instalacja</h4>
      <blockquote>
        Ten krok już wykonany na RDP:
        <a href="https://opencode.ai/docs/#install" target="_blank">Instalacja</a>
      </blockquote>

      <h4>
        Plik <a href="https://opencode.ai/docs/rules/" target="_blank">AGENTS.md</a> ładowany do
        kontekstu
      </h4>
      <blockquote>
        Występuje w 2 miejscach:
        <ul>
          <li>
            <strong>GLOBALNY</strong> - <code> //[username]/.config/opencode/AGENTS.md </code>
          </li>
          <li><strong>PROJEKTOWY</strong> - <code> ./[project-root]/AGENTS.md </code></li>
        </ul>
        Respektuje również ustawienia<code>claude code</code>:
        <ul>
          <li><strong>GLOBALNY</strong> - <code> //[username]/.claude/CLAUDE.md </code></li>
          <li><strong>PROJEKTOWY</strong> - <code> ./[project-root]/.claude/CLAUDE.md </code></li>
        </ul>
      </blockquote>
      W pliku znajdują się reguły, które Agent AI będzie respektował. Przykładowo, team
      <em>Angular</em> domyślnie podaje coś takiego:
      <div class="notification is-family-monospace">
        You are an expert in TypeScript, Angular, and scalable web application development. You
        write functional, maintainable, performant, and accessible code following Angular and
        TypeScript best practices.
        <br />
        ...
      </div>
      To jedynie początek pliku. Sprawdź w projekcie <code>auction-starter</code> jak plik wygląda w
      całości.
      <p>
        Te reguły są ważne, ponieważ to one definiują, jak Agent AI będzie się zachowywał, jakie
        kompetencje i zachowania powinien wykazywać
      </p>
      <h4>Plik Globalny vs Projektowy</h4>
      <blockquote>
        GLOBALNY - powinien zawierać "ogólne" "abstrakcyjne zachowania" i sposób działania. Jeśli
        już chcemy go używać, nie powinien być zbyt długi (oszczędność okna kontekstu - tokenów).
      </blockquote>
      Przykład dobrego GLOBALNEGO <code>/AGENTS.md</code>
      <div class="notification is-family-monospace">
        - In all interactions and commit messages, be extremely concise and sacrifice grammar for
        the sake of concision
        <br />
        <br />
        ## Plan Mode
        <br />
        - Make the plan extremely concise. Sacrifice grammar for the sake of concision.
        <br />
        - At the end of each plan, give me a list of unresolved questions to answer, if any.
      </div>
      <div>
        Inspiracja:
        <a
          href="https://www.aihero.dev/my-agents-md-file-for-building-plans-you-actually-read"
          target="_blank"
          >my-agents-md-file-for-building-plans-you-actually-read</a
        >
      </div>
      <blockquote>
        PROJEKTOWY - powinien zawierać "zasady panujące w projekcie". Te najważniejsze. Bez zbędnego
        tekstu opisującego komendy w projekcie, czy struktury plików lub katalogów
      </blockquote>
      <div class="notification is-warning">
        ❌ UNIKAJ
        <ul>
          <li>
            Przedstawiania struktury katalogów (Agent sam ją odczyta, a prawdopodobnie "za chwilę"
            ona się zmieni - będzie więcej plików)
          </li>
          <li>Opisywania skryptów i komend z <code>package.json</code> - Agent sam je zobaczy</li>
        </ul>
      </div>
      <h4>Zachowanie kontekstu</h4>
      <blockquote>
        Kontekst - jest czysty w momencie gdy rozpoczynamy sesję z Agentem. Jednakże zawsze na
        starcie zawiera:
        <ul>
          <li>Globalny <code>AGENTS.md</code></li>
          <li>Projektowy <code>AGENTS.md</code></li>
          <li>
            Listę Skills Globalną <code> //[username]/.config/opencode/skills/[name]/SKILL.md</code>
          </li>
          <li>Listę Skills Projektową <code>.opencode/skills/[name]/SKILL.md</code></li>
          <li>Listę MCP Globalną</li>
          <li>Listę MCP Projektową</li>
        </ul>
        Całe teksty z <code>AGENTS.md</code> oraz nagłówki wszystkich <code>*/SKILL.md</code> jak i
        <code>/mcp</code> i innych ew. tooli - lądują w każdej sesji - w każdym nowym kontekście.
        Tak więc <em>💲Kosztują Tokeny💲</em>. Warto, zwłaszcza pliki
        <code>AGENTS.md</code> traktować z rozwagą.
      </blockquote>

      <div class="my-3">
        Dodatkowym elementem od przemyślenia jest fakt, że NIE zawsze potrzebujemy tych informacji w
        każdej sesji z Agentem.
      </div>
      <h4>Limit kontekstu | <code>smart zone</code> | <code>dumb zone</code></h4>
      <blockquote>
        Ponieważ treści przekazywane do <strong>LLM</strong> zamienianę sa na <code>Tokeny</code> - jest to wyznacznik, 
        pojemności tzw. <em>okna kontekstowego</em>. Niektórzy Agenci (w zależności od planu/subskrypcji etc.) mają dość duże pojemności. 
        Przykładowo: <code>Claude Code - Opus</code> posiada <code>1_000_000</code> tokenów w oknie.
        <br />
        Pomimo tego istnieje granica tzw. <code>smart zone</code> wynosi ok. <code>130_000 - 140_000</code> tokenów. (<code>140k</code>).
        Można to określić tak, jak z rozmowa na konkretny temat z człowiekiem, pamiętamy początek, koniec informacji bardo dobrze, informacje w środku - im więcej - tym mniej będziemy pamiętać.
        <br />
        <br />
        Niezależnie więc od deklaracji dostawcy LLM. 
        Powinniśmy nie przekraczać tej granicy, jeśli chcemy mieć pewność, 
        że Agent będzie działał <code>SMART</code>. 
        Powyżej <code>140k</code> znajduje się "umowna granica" - po której mamy <code>DUMB ZONE</code>
      </blockquote>
    </section>
  </app-page>`,
  styles: ``,
})
export class ContextWindowPage {}
