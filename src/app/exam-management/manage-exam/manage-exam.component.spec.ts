import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExamComponent } from './manage-exam.component';

describe('ManageExamComponent', () => {
  let component: ManageExamComponent;
  let fixture: ComponentFixture<ManageExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageExamComponent]
    });
    fixture = TestBed.createComponent(ManageExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
