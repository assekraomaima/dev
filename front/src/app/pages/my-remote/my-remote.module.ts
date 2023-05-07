import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MyRemoteRoutingModule } from "./my-remote-routing.module";
import { MyRemoteComponent } from "./my-remote.component";

@NgModule({
  declarations: [MyRemoteComponent],
  imports: [CommonModule, MyRemoteRoutingModule],
})
export class MyRemoteModule {}
