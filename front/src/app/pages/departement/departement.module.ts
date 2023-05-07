import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartementRoutingModule } from './departement-routing.module';
import { DepartementComponent } from './departement.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [DepartementComponent],
  imports: [
    CommonModule,
    DepartementRoutingModule,
    NgxPaginationModule,
    NgbModule
  ]
})
export class DepartementModule { }
