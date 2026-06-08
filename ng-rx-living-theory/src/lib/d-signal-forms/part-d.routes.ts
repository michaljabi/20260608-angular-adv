import { Routes } from '@angular/router';
import { ConfirmationFormPage } from './d01-basic-example/confirmation-form.page';
import { NewsletterSignPage } from './d02-validated-example/newsletter-sign.page';
import { NewsletterSignZodPage } from './d03-using-zod/newsletter-sign-zod.page';
import { AddPostPage } from './d04-dynamic-form/add-post.page';
import { CreateAccountPage } from './d05-more-complex-forms/create-account.page';

export const partDRoutes: Routes = [
  { path: 'd-confirmation-form', component: ConfirmationFormPage },
  { path: 'd-newsletter-sign', component: NewsletterSignPage },
  { path: 'd-newsletter-sign-zod', component: NewsletterSignZodPage },
  { path: 'd-add-post', component: AddPostPage },
  { path: 'd-create-account', component: CreateAccountPage },
];