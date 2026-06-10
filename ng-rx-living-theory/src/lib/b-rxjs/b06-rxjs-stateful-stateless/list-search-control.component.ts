import { Component, input, OnInit, output } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-list-search-control',
  imports: [],
  template: `
    <p class="control has-icons-left">
      <input class="input" type="text" placeholder="Search" (input)="handleInput($event)" />
      <span class="icon is-left">
        <i class="fas fa-search" aria-hidden="true"></i>
      </span>
    </p>
  `,
  styles: ``,
})
export class ListSearchControlComponent implements OnInit {
  caseSensitive = input(false);
  search = output<string>()


  // Podstawowa różnica: Subject vs Observable ?
  // Subject = HOT ! ----(a)-----(b)------(c)------->
  //     sub1                        *----(c)------
  //     sub2                  *-(b)------(c)--------

  // Observable = COLD ! -(1)-(2)-(3)-|>
  //     sub1                            *-(1)-(2)-(3)-|>
  //     sub2                *-(1)-(2)-(3)-|>
  //     sub3                       *-(1)-(2)-(3)-|>
  searchInput$ = new Subject<string>();

  handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchInput$.next(target.value);
  }

  ngOnInit() {
    // ⚔️ Sidequest: przeanalizuj dokładnie Praktyczne wykorzystanie RxJS
    // Tutaj do debounce'owania kolejnych uderzeń w klawisze (input) z template
    // rozpoznaj każdy z użytych operatorów RxJS
    this.searchInput$
      .pipe(
        map((t) => (this.caseSensitive() ? t.trim() : t.trim().toLowerCase())),
        debounceTime(400),
        tap((t) => {
          console.log('(search)', t);
        }),
        distinctUntilChanged(),
      )
      .subscribe((text) => this.search.emit(text));
  }
}
