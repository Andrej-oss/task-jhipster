import { NgModule } from '@angular/core';
import { UserAuthFormComponent } from './user-auth-form.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { USER_AUTH_ROUTE } from './user-auth.route';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  declarations: [UserAuthFormComponent],
  imports: [SharedModule, MaterialModule, RouterModule.forChild([USER_AUTH_ROUTE])],
})
export class UserAuthModule {}
