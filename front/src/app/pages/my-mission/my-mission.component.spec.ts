import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMissionComponent } from './my-mission.component';

describe('MyMissionComponent', () => {
  let component: MyMissionComponent;
  let fixture: ComponentFixture<MyMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
