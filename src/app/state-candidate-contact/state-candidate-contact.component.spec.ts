import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCandidateContactComponent } from './state-candidate-contact.component';

describe('StateCandidateContactComponent', () => {
  let component: StateCandidateContactComponent;
  let fixture: ComponentFixture<StateCandidateContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateCandidateContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateCandidateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
