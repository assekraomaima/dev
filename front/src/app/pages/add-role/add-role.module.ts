import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoleRoutingModule } from './add-role-routing.module';
import { AddRoleComponent } from './add-role.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddRoleComponent],
  imports: [
    CommonModule,
    AddRoleRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddRoleModule { }
