import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdvicesService } from '../advices.service';
import { AdviceSummary } from '../advice-item';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h2 class="my-3">Podpowiadamy co wybrać</h2>
    <p class="text-muted">Wybierz temat z listy, by przeczytać artykuł.</p>

    <section class="row g-3">
      <div class="col-12 col-md-4">
        <div class="list-group shadow-sm">
          @for (advice of advices(); track advice.uid) {
            <a
              class="list-group-item list-group-item-action d-flex align-items-center gap-2"
              [routerLink]="[advice.uid]"
              routerLinkActive="active"
            >
              <span class="badge text-bg-secondary">{{ $index + 1 }}</span>
              <span>{{ advice.title }}</span>
            </a>
          } @empty {
            @if (isLoading()) {
              <div class="list-group-item text-muted">Ładuję artykuły…</div>
            }
            @if (errorMessage()) {
              <div class="list-group-item list-group-item-danger">
                Nie udało się załadować poradników 😭
                <hr />
                <small>{{ errorMessage() }}</small>
              </div>
            }
          }
        </div>
      </div>

      <div class="col-12 col-md-8">
        <router-outlet />
      </div>
    </section>
  `,
  styles: ``,
})
export class AdvicesPageComponent implements OnInit {
  isLoading = signal(true);
  errorMessage = signal('');
  advices = signal<AdviceSummary[]>([]);

  private advicesService = inject(AdvicesService);

  ngOnInit(): void {
    this.advicesService.getAll().subscribe({
      next: (advices) => {
        this.advices.set(advices);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Nieznany błąd');
        this.isLoading.set(false);
      },
    });
  }
}
