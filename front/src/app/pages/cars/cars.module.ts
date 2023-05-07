import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module' ;
import { CarsComponent } from './cars.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [CarsComponent ],
  imports: [
    CommonModule,
    CarsRoutingModule ,
    NgxPaginationModule,
    NgbModule
  ]
})
export class CarsModule { }
