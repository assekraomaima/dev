import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddUserRoutingModule } from "./add-user-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AddUserComponent } from "./add-user.component";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [AddUserComponent],
  imports: [
    CommonModule,
    AddUserRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class AddUserModule {}
