import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRemoteComponent } from './list-remote.component';

describe('ListRemoteComponent', () => {
  let component: ListRemoteComponent;
  let fixture: ComponentFixture<ListRemoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRemoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
