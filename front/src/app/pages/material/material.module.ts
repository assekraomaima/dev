import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerMaterialRoutingModule } from './material-routing.module' ;
import { MaterialComponent } from './material.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [MaterialComponent ],
  imports: [
    CommonModule,
    ManagerMaterialRoutingModule ,
    NgxPaginationModule,
    NgbModule
  ]
})
export class MaterialModule { }
