import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material.module';
import { RouterModule } from '@angular/router';
import { USER_FORM_ROUTE, USER_FORM_UPDATE_ROUTE } from './user-form.route';
import { AccountModule } from '../../account/account.module';

@NgModule({
  declarations: [UserFormComponent],
  imports: [SharedModule, RouterModule.forChild([USER_FORM_ROUTE, USER_FORM_UPDATE_ROUTE]), AccountModule, MaterialModule],
})
export class UserFormModule {}
