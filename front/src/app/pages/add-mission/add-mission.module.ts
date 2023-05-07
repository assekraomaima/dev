import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMissionRoutingModule } from './add-mission-routing.module';
import { AddMissionComponent } from './add-mission.component';


@NgModule({
  declarations: [AddMissionComponent],
  imports: [
    CommonModule,
    AddMissionRoutingModule
  ]
})
export class AddMissionModule { }
