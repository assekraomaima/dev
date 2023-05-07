import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCarsComponent } from './reservation-cars.component';

describe('ReservationCarsComponent', () => {
  let component: ReservationCarsComponent;
  let fixture: ComponentFixture<ReservationCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationCarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
