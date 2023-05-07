import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReservationCarComponent } from './add-reservation-car.component';

describe('AddReservationCarComponent', () => {
  let component: AddReservationCarComponent;
  let fixture: ComponentFixture<AddReservationCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReservationCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReservationCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
