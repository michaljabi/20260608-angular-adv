import { Component } from '@angular/core';
import { PageComponent } from '../../common/page/page.component';

@Component({
  selector: 'app-using-skills-and-more-about-context',
  imports: [PageComponent],
  template: `<app-page
    pageTitle="Skills"
    pageDescription="Najprostszy, a najlepszy mechanizm"
    fileMatch="e-generative-ai/e03-simple-best-skill-ever/using-skills-and-more-about-context.page"
  >
    <section class="content">
      <h2>Czym jest Skill?</h2>
      <p>
        <code>Skill</code> to plik <code>SKILL.md</code> z gotową, wielokrotnego użytku instrukcją
        "jak coś zrobić" (np. <em>jak pisać commity</em>, <em>jak robić code review</em>).
      </p>
      <blockquote>
        Kluczowa cecha:
        <a href="https://en.wikipedia.org/wiki/Progressive_disclosure" target="_blank"
          >progressive disclosure</a
        >. W kontekście sesji ląduje tylko <em>nagłówek</em> Skilla (nazwa + opis). Pełna treść
        doczytywana jest dopiero, gdy Agent uzna, że jest potrzebna. Mechanizm: <em>PULL</em>
      </blockquote>
      <div class="my-3">
        Dzięki temu możesz mieć <strong>dużo</strong> Skilli, a płacisz tokenami za szczegóły tylko
        wtedy, gdy faktycznie ich używasz. To dokładnie ta sama troska o
        <code>okno kontekstowe</code>, co w sekcji <code>smart zone</code> / <code>dumb zone</code>.
      </div>

      <h4>Globalny vs Projektowy</h4>
      <blockquote>
        <ul>
          <li>
            <strong>GLOBALNY</strong> -
            <code>//[username]/.config/opencode/skills/[name]/SKILL.md</code>
          </li>
          <li><strong>PROJEKTOWY</strong> - <code>.opencode/skills/[name]/SKILL.md</code></li>
        </ul>
      </blockquote>

      <h4>Przykład: <code>/grill-me</code></h4>
      <div class="notification has-background-grey-darker">
        Skill, który zamiast od razu zgadzać się z Twoim planem lub polegać na propozycjach Agenta -
        <strong>przepytuje</strong> Cię, aż dojdziecie do wspólnego zrozumienia. 
        <br /><br />
        Świetny i przebija <code>Plan Mode</code>!
      </div>
      Jego dokładna treść to:
      <div class="notification is-family-monospace">
        ---
        <br />
        name: grill-me
        <br />
        description: Interview the user relentlessly about a plan or design until reaching shared
        understanding, resolving each branch of the decision tree. Use when user wants to
        stress-test a plan, get grilled on their design, or mentions "grill me".
        <br />
        ---
        <br />
        Interview me relentlessly about every aspect of this plan until we reach a shared
        understanding. Walk down each branch of the design tree, resolving dependencies between
        decisions one-by-one. For each question, provide your recommended answer. Ask the questions
        one at a time. If a question can be answered by exploring the codebase, explore the codebase
        instead.
      </div>

      🛠️ Instalacja:
      <div class="notification is-family-code">
        npx skills add mattpocock/skills --skill=grill-me -y -g
      </div>

      <div class="notification is-success">Skill = mała, skupiona instrukcja na jeden temat.</div>

      <div>
        📃 Doc:
        <a href="https://www.aihero.dev/skills-grill-me" target="_blank">
          Stress-Test a Plan Before You Build
        </a>
        <p>
          Więcej fajnych skills:
          <a href="https://www.aihero.dev/skills" target="_blank">aihero.dev</a>
        </p>
      </div>
    </section>
  </app-page>`,
  styles: ``,
})
export class UsingSkillsAndMoreAboutContextPage {
  // 📃 Doc: https://opencode.ai/docs/rules/ (AGENTS.md / CLAUDE.md)
}
