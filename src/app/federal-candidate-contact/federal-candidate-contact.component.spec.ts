import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FederalCandidateContactComponent } from './federal-candidate-contact.component';

describe('FederalCandidateContactComponent', () => {
  let component: FederalCandidateContactComponent;
  let fixture: ComponentFixture<FederalCandidateContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FederalCandidateContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FederalCandidateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
