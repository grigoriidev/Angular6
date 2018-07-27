import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCandidateEventsComponent } from './state-candidate-events.component';

describe('StateCandidateEventsComponent', () => {
  let component: StateCandidateEventsComponent;
  let fixture: ComponentFixture<StateCandidateEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateCandidateEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateCandidateEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
