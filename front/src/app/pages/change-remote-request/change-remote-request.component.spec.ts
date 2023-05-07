import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRemoteRequestComponent } from './change-remote-request.component';

describe('ChangeRemoteRequestComponent', () => {
  let component: ChangeRemoteRequestComponent;
  let fixture: ComponentFixture<ChangeRemoteRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeRemoteRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRemoteRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
