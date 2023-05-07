import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReservationMaterialComponent } from './add-reservation-material.component';

describe('AddReservationMaterialComponent', () => {
  let component: AddReservationMaterialComponent;
  let fixture: ComponentFixture<AddReservationMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReservationMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReservationMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
