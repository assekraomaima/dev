import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RolesRoutingModule } from "./roles-routing.module";
import { RolesComponent } from "./roles.component";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [RolesComponent],
  imports: [CommonModule, RolesRoutingModule, NgxPaginationModule],
})
export class RolesModule {}
