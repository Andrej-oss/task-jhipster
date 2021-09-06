import { Route } from '@angular/router';
import { UserFormComponent } from './user-form.component';

export const USER_FORM_ROUTE: Route = {
  path: 'registration',
  component: UserFormComponent,
  data: {
    pageTitle: 'Registration!',
  },
};
export const USER_FORM_UPDATE_ROUTE: Route = {
  path: 'registration/:id',
  component: UserFormComponent,
  data: {
    pageTitle: 'Registration update',
  },
};
