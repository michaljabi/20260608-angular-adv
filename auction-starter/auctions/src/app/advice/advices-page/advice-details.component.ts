import { Component, effect, inject, input, signal } from '@angular/core';
import { AdvicesService } from '../advices.service';
import { Advice } from '../advice-item';

@Component({
  imports: [],
  template: `
    @if (isLoading()) {
      <div class="alert alert-info">Ładuję artykuł…</div>
    } @else if (errorMessage()) {
      <div class="alert alert-danger">
        Nie udało się załadować artykułu 😭
        <hr />
        <small>{{ errorMessage() }}</small>
      </div>
    } @else if (advice(); as a) {
      <article class="card shadow-sm">
        <div class="card-body">
          <h3 class="card-title">{{ a.title }}</h3>
          <p class="card-text" style="white-space: pre-line">{{ a.postedArticle }}</p>
        </div>
      </article>
    }
  `,
  styles: ``,
})
export class AdviceDetailsComponent {
  adviceId = input.required<string>();

  advice = signal<Advice | undefined>(undefined);
  isLoading = signal(false);
  errorMessage = signal('');

  private advicesService = inject(AdvicesService);

  constructor() {
    effect(() => {
      const uid = this.adviceId();
      this.loadAdvices(uid);
    });
  }

  loadAdvices(uid: string) {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.advice.set(undefined);
    this.advicesService.getOne(uid).subscribe({
      next: (advice) => {
        this.advice.set(advice);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Nieznany błąd');
        this.isLoading.set(false);
      },
    });
  }
}
