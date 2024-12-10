import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExamTypeComponent } from './manage-exam-type.component';

describe('ManageExamTypeComponent', () => {
  let component: ManageExamTypeComponent;
  let fixture: ComponentFixture<ManageExamTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageExamTypeComponent]
    });
    fixture = TestBed.createComponent(ManageExamTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
