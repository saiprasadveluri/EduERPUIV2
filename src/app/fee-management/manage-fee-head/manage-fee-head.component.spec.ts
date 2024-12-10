import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeeHeadComponent } from './manage-fee-head.component';

describe('ManageFeeHeadComponent', () => {
  let component: ManageFeeHeadComponent;
  let fixture: ComponentFixture<ManageFeeHeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageFeeHeadComponent]
    });
    fixture = TestBed.createComponent(ManageFeeHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
