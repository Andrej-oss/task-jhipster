import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { USER_ROUTE } from './user.route';
import { UserTableComponent } from './user-table.component';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  declarations: [UserTableComponent],
  imports: [SharedModule, MaterialModule, RouterModule.forChild([USER_ROUTE])],
})
export class UserModule {}
