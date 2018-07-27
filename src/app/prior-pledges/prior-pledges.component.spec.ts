import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorPledgesComponent } from './prior-pledges.component';

describe('PriorPledgesComponent', () => {
  let component: PriorPledgesComponent;
  let fixture: ComponentFixture<PriorPledgesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorPledgesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorPledgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
