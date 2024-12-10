import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeeHeadComponent } from './add-fee-head.component';

describe('AddFeeHeadComponent', () => {
  let component: AddFeeHeadComponent;
  let fixture: ComponentFixture<AddFeeHeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFeeHeadComponent]
    });
    fixture = TestBed.createComponent(AddFeeHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
