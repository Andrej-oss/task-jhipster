import { Route } from '@angular/router';
import { UserAuthFormComponent } from './user-auth-form.component';

export const USER_AUTH_ROUTE: Route = {
  path: 'authorization',
  component: UserAuthFormComponent,
  data: {
    pageTitle: 'Authorization',
  },
};
