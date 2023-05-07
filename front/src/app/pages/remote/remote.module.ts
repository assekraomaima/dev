import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoteRoutingModule } from './remote-routing.module';
import { RemoteComponent } from './remote.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [RemoteComponent],
  imports: [
    CommonModule,
    RemoteRoutingModule,
    NgbModule
  ]
})
export class RemoteModule { }
