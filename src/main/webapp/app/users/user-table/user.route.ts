import { Route } from '@angular/router';

import { UserTableComponent } from './user-table.component';

export const USER_ROUTE: Route = {
  path: 'user',
  component: UserTableComponent,
  data: {
    pageTitle: 'Users!',
  },
};
