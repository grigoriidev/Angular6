import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorContributionComponent } from './investor-contribution.component';

describe('InvestorContributionComponent', () => {
  let component: InvestorContributionComponent;
  let fixture: ComponentFixture<InvestorContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
