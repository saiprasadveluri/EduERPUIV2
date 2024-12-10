import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeeComponent } from './add-fee.component';

describe('AddFeeComponent', () => {
  let component: AddFeeComponent;
  let fixture: ComponentFixture<AddFeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFeeComponent]
    });
    fixture = TestBed.createComponent(AddFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
