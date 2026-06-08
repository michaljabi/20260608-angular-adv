import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  form,
  FormField,
  submit,
  validateStandardSchema,
} from '@angular/forms/signals';
import { PageComponent } from '../../common/page/page.component';
import { PostModel, PostSchema } from './add-post.schema';

@Component({
  selector: 'app-add-post',
  imports: [PageComponent, FormField, JsonPipe, FormsModule],
  template: `<app-page
    pageTitle="Formularz dynamiczny (Zod)"
    pageDescription="Dodawanie posta z dynamiczną listą tagów (FieldArray). Schemat Zod jest w osobnym pliku, a tagi dodajemy i usuwamy mutując model. Walidacja działa zarówno na całej tablicy, jak i na pojedynczych tagach."
    fileMatch="d-signal-forms/d04-dynamic-form/add-post.page"
  >
    <form class="box" (ngSubmit)="onSubmit()">
      <div class="field">
        <label class="label">Nazwa</label>
        <div class="control">
          <input
            class="input"
            type="text"
            [class.is-danger]="
              postForm.name().touched() && postForm.name().invalid()
            "
            [class.is-success]="
              postForm.name().touched() && postForm.name().valid()
            "
            [formField]="postForm.name"
          />
        </div>
        @if (postForm.name().touched()) {
          @for (e of postForm.name().errors(); track e.kind) {
            <p class="help is-danger">{{ e.message }}</p>
          }
        }
      </div>

      <div class="field">
        <label class="label">Opis</label>
        <div class="control">
          <textarea
            class="textarea"
            [class.is-danger]="
              postForm.description().touched() &&
              postForm.description().invalid()
            "
            [class.is-success]="
              postForm.description().touched() &&
              postForm.description().valid()
            "
            [formField]="postForm.description"
          ></textarea>
        </div>
        @if (postForm.description().touched()) {
          @for (e of postForm.description().errors(); track e.kind) {
            <p class="help is-danger">{{ e.message }}</p>
          }
        }
      </div>

      <div class="field">
        <label class="label">Tagi</label>

        @for (tag of postForm.tags; track $index) {
          <div class="field has-addons mb-2">
            <div class="control is-expanded">
              <input
                class="input"
                type="text"
                [class.is-danger]="tag().touched() && tag().invalid()"
                [class.is-success]="tag().touched() && tag().valid()"
                [formField]="tag"
              />
              @if (tag().touched()) {
                @for (e of tag().errors(); track e.kind) {
                  <p class="help is-danger">{{ e.message }}</p>
                }
              }
            </div>
            <div class="control">
              <button
                class="button is-danger is-outlined"
                type="button"
                (click)="removeTag($index)"
              >
                Usuń
              </button>
            </div>
          </div>
        }

        @if (postForm.tags().touched()) {
          @for (e of postForm.tags().errors(); track e.kind) {
            <p class="help is-danger">{{ e.message }}</p>
          }
        }

        <button
          class="button is-link is-light mt-2"
          type="button"
          (click)="addTag()"
        >
          Dodaj tag
        </button>
      </div>

      <div class="is-flex is-justify-content-end p-4">
        <button class="button is-primary" type="submit">Zapisz post</button>
      </div>
    </form>

    @if (submitted(); as value) {
      <div class="notification is-success">
        <p class="has-text-weight-semibold">Zapisany post:</p>
        <pre>{{ value | json }}</pre>
      </div>
    }
  </app-page>`,
  styles: ``,
})
export class AddPostPage {
  protected readonly model = signal<PostModel>({
    name: '',
    description: '',
    tags: [''],
  });

  protected readonly postForm = form(this.model, (p) => {
    validateStandardSchema(p, PostSchema);
  });

  protected readonly submitted = signal<PostModel | null>(null);

  protected addTag(): void {
    this.model.update((m) => ({ ...m, tags: [...m.tags, ''] }));
  }

  protected removeTag(index: number): void {
    this.model.update((m) => ({
      ...m,
      tags: m.tags.filter((_, i) => i !== index),
    }));
  }

  protected async onSubmit(): Promise<void> {
    await submit(this.postForm, async (f) => {
      this.submitted.set(f().value());
    });
  }
}
