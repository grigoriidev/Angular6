import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueAngelsContributionComponent } from './blue-angels-contribution.component';

describe('BlueAngelsContributionComponent', () => {
  let component: BlueAngelsContributionComponent;
  let fixture: ComponentFixture<BlueAngelsContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueAngelsContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueAngelsContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
