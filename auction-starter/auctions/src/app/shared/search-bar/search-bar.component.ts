import {Component, output/*, EventEmitter*/} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  template: `
    <div class="d-flex justify-content-end">
      <div class="input-group mb-3 w-50">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <fa-icon icon="search"/>
          </span>
        </div>
        <input type="text" name="title" class="form-control" (input)="handleUpdate($event)"  />
      </div>
    </div>
  `,
  styles: ``
})
export class SearchBarComponent {
  search = output<string>()

  handleUpdate(ev: Event) {
    if(ev.target instanceof HTMLInputElement){
      // this.searchValue = ev.target.value;
      this.search.emit(ev.target.value);
    }
  }
}
