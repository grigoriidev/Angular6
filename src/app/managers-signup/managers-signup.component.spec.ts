import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersSignupComponent } from './managers-signup.component';

describe('ManagersSignupComponent', () => {
  let component: ManagersSignupComponent;
  let fixture: ComponentFixture<ManagersSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagersSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagersSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
