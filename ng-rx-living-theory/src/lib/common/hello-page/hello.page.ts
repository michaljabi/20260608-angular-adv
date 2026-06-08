import { Component } from '@angular/core';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-hello-page',
  imports: [PageComponent],
  template: `<app-page pageTitle="Hello World" pageDescription="Wybierz coś z lewej" fileMatch="common/hello.page.ts"> boom </app-page>`,
  styles: ``,
})
export class HelloPage {}
