import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgnizationFeatureSubscriptionComponent } from './orgnization-feature-subscription.component';

describe('OrgnizationFeatureSubscriptionComponent', () => {
  let component: OrgnizationFeatureSubscriptionComponent;
  let fixture: ComponentFixture<OrgnizationFeatureSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgnizationFeatureSubscriptionComponent]
    });
    fixture = TestBed.createComponent(OrgnizationFeatureSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
