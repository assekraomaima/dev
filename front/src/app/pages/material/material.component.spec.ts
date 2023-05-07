import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerMaterialComponent } from './material.component';

describe('ManagerMaterialComponent', () => {
  let component: ManagerMaterialComponent;
  let fixture: ComponentFixture<ManagerMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
