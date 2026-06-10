import { Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'lib-picsum-photo-chooser',
  imports: [],
  template: `
    <div class="input-group">
      <button
        class="btn btn-outline-secondary"
        type="button"
        (click)="step(-1)"
        [disabled]="id() <= min()"
      >
        −
      </button>
      <input
        type="number"
        class="form-control text-center"
        [min]="min()"
        [max]="max()"
        [value]="id()"
        (input)="set(+$any($event.target).value)"
      />
      <button
        class="btn btn-outline-secondary"
        type="button"
        (click)="step(1)"
        [disabled]="id() >= max()"
      >
        +
      </button>
    </div>
    <div class="form-text">Zdjęcie #{{ id() }} z {{ max() }}.</div>
  `,
  styles: ``,
})
export class PicsumPhotoChooser {
  readonly min = input(1);
  readonly max = input(1084);
  readonly width = input(600);
  readonly height = input(400);

  // Event z pełnym URL wybranego zdjęcia:
  readonly picked = output<string>();

  protected readonly id = signal(1);

  protected readonly url = computed(
    () =>
      `https://picsum.photos/id/${this.id()}/${this.width()}/${this.height()}`,
  );

  protected set(value: number): void {
    const clamped = Math.min(
      this.max(),
      Math.max(
        this.min(),
        Number.isFinite(value) ? Math.trunc(value) : this.min(),
      ),
    );
    this.id.set(clamped);
    this.picked.emit(this.url());
  }

  protected step(delta: number): void {
    this.set(this.id() + delta);
  }
}
