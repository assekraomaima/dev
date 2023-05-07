import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddDepartementRoutingModule } from "./add-departement-routing.module";
import { AddDepartementComponent } from "./add-departement.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AddDepartementComponent],
  imports: [CommonModule, AddDepartementRoutingModule, ReactiveFormsModule],
})
export class AddDepartementModule {}
