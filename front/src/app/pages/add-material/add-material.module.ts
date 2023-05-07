import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddMaterialRoutingModule } from "./add-material-routing.module";
import { AddMaterialComponent } from "./add-material.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AddMaterialComponent],
  imports: [CommonModule, AddMaterialRoutingModule, ReactiveFormsModule],
})
export class AddMaterialModule {}
