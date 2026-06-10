import { Component } from '@angular/core';
import { PageComponent } from '../../common/page/page.component';

@Component({
  selector: 'app-mcp-server-list',
  imports: [PageComponent],
  template: `<app-page
    pageTitle="MCP"
    pageDescription="Serwery MCP dla frontendu"
    fileMatch="e-generative-ai/e04-mcp-servers-for-frontend/mcp-server-list.page"
  >
    <section class="content">
      <h2>Czym jest MCP?</h2>
      <blockquote>
        <code>MCP</code> (<em>Model Context Protocol</em>) to standard, który łączy Agenta z
        zewnętrznymi narzędziami i danymi - przeglądarką, plikami Figmy, dokumentacją bibliotek itd.
      </blockquote>

      <h4>Przydatne dla frontendu</h4>
      <ul>
        <li><strong>Playwright</strong> - sterowanie przeglądarką, klikanie, asercje E2E</li>
        <li><strong>Chrome DevTools</strong> - inspekcja DOM, konsola, network, screenshoty</li>
        <li><strong>Figma</strong> - czytanie designu / generowanie kodu z projektu</li>
        <li><strong>Context7</strong> - aktualna dokumentacja bibliotek (zamiast pamięci LLM)</li>
      </ul>

      <h4>Koszt kontekstu</h4>
      <div class="notification is-warning is-light">
        ⚠️ Definicje <strong>wszystkich</strong> włączonych toolów MCP lądują w każdej sesji - więc
        kosztują tokeny (patrz <code>smart zone</code>). Włączaj MCP <strong>selektywnie</strong> -
        tylko te realnie potrzebne w danym projekcie.
      </div>

      <div>
        📃 Doc:
        <a href="https://modelcontextprotocol.io" target="_blank">modelcontextprotocol.io</a>
        ・
        <a href="https://opencode.ai/docs/mcp-servers/" target="_blank"
          >opencode.ai/docs/mcp-servers</a
        >
      </div>

      <h4 class="mt-4">Instalacje przydatnych MCP</h4>
      <p>
        Konfiguracja dla Angular dev: <code>chrome-devtools</code> debugowanie + "widzenie" UI +
        <code>angular</code> Angular-aware codegen, docs, migracje
      </p>

      <h5>1. Wymagania</h5>
      <blockquote>
        <ul>
          <li><strong>Node 18+</strong> (Angular MCP: najlepiej Node 20.19+)</li>
          <li>
            <code>&#64;angular/cli</code> w wersji <strong>20.2+</strong> (sprawdź:
            <code>npx &#64;angular/cli version</code>)
          </li>
          <li>Zainstalowany <strong>Chrome</strong> (dla <code>chrome-devtools</code>)</li>
        </ul>
      </blockquote>

      <h5>2. Gdzie wpisać config</h5>
      <blockquote>
        MCP w <a href="https://opencode.ai/docs/mcp-servers/" target="_blank">opencode</a> konfigurujemy w pliku <code>opencode.json</code>:
        <ul>
          <li><strong>PROJEKTOWY</strong> - <code>./[project-root]/opencode.json</code></li>
          <li>
            <strong>GLOBALNY</strong> - <code>//[username]/.config/opencode/opencode.json</code>
          </li>
        </ul>
      </blockquote>

      <h5>3. Wklej konfigurację</h5>
      <pre class="notification is-family-monospace">
&#123;
  "$schema": "https://opencode.ai/config.json",
   "mcp": &#123;
      "chrome-devtools": &#123;
          "type": "local",
          "command": ["npx", "-y", "chrome-devtools-mcp&#64;latest"],
          "enabled": true
       &#125;,
       "angular": &#123;
          "type": "local",
          "command": ["npx", "-y", "&#64;angular/cli", "mcp"],
          "enabled": true
       &#125;
   &#125;
&#125;
      </pre>
      <blockquote>
        <code>type: "local"</code> i <code>command</code> są wymagane; <code>enabled</code> /
        <code>environment</code> / <code>timeout</code> są opcjonalne.
      </blockquote>

      <h5>4. Sprawdź, czy serwery żyją</h5>
      <div class="notification is-family-code">opencode mcp list</div>
      <p>
        Pierwsze uruchomienie <code>npx</code> pobierze paczki - może chwilę potrwać. Po restarcie
        opencode oba serwery powinny mieć status <em>connected</em>.
      </p>

      <h5>5. Przetestuj (step by step)</h5>
      <div class="notification is-success is-light">
        <ol>
          <li>Odpal dev server: <code>npm start</code></li>
          <li>
            <code>chrome-devtools</code> → poproś Agenta:
            <em>"open http://localhost:4440 and make screenshot + show me console errors"</em>
          </li>
          <li>
            <code>angular</code> → poproś Agenta:
            <em>"use list_projects and search in docs how to make signal input"</em>
          </li>
        </ol>
      </div>

      <div class="notification is-warning is-light">
        ⚠️ Diagnostyka połączenia: <code>opencode mcp debug &lt;server-name&gt;</code>. Pamiętaj o
        koszcie kontekstu - wyłączaj (<code>"enabled": false</code>) serwery, których aktualnie nie
        używasz.
      </div>

      <div>
        📃 Doc:
        <a href="https://opencode.ai/docs/mcp-servers/" target="_blank"
          >opencode.ai/docs/mcp-servers</a
        >
        ・
        <a href="https://angular.dev/ai/mcp" target="_blank">angular.dev/ai/mcp</a>
        ・ szczegóły i porównanie: <code>concepts-and-findings.md</code>
      </div>
    </section>
  </app-page>`,
  styles: ``,
})
export class McpServerListPage {}
