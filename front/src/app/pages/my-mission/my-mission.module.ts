import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MyMissionRoutingModule } from "./my-mission-routing.module";
import { MyMissionComponent } from "./my-mission.component";

@NgModule({
  declarations: [MyMissionComponent],
  imports: [CommonModule, MyMissionRoutingModule],
})
export class MyMissionModule {}
