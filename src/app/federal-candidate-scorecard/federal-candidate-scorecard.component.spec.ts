import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FederalCandidateScorecardComponent } from './federal-candidate-scorecard.component';

describe('FederalCandidateScorecardComponent', () => {
  let component: FederalCandidateScorecardComponent;
  let fixture: ComponentFixture<FederalCandidateScorecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FederalCandidateScorecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FederalCandidateScorecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
