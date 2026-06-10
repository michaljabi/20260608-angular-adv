import { Component, input, OnInit, output } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Subject, tap } from 'rxjs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { appIcons } from '@auction-workspace/shared/util-icons';

@Component({
  selector: 'lib-search-bar',
  imports: [NgIcon],
  template: `
    <div class="d-flex justify-content-end">
      <div class="input-group mb-3 w-50">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <ng-icon name="search" />
          </span>
        </div>
        <input
          type="text"
          name="title"
          class="form-control"
          (input)="handleUpdate($event)"
        />
      </div>
    </div>
  `,
  viewProviders: [provideIcons({ search: appIcons.search })],
})
export class SearchBar implements OnInit {
  searchFor = output<string>();
  caseSensitive = input(false);

  private readonly searchInput$ = new Subject<string>();

  ngOnInit() {
    this.searchInput$
      .pipe(
        map((t) => (this.caseSensitive() ? t.trim() : t.trim().toLowerCase())),
        debounceTime(400),
        tap((t) => {
          console.log('(search)', t);
        }),
        distinctUntilChanged(),
      )
      .subscribe((text) => this.searchFor.emit(text));
  }

  handleUpdate(ev: Event) {
    if (ev.target instanceof HTMLInputElement) {
      this.searchFor.emit(ev.target.value);
    }
  }
}
