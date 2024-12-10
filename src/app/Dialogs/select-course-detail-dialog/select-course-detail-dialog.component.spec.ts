import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCourseDetailDialogComponent } from './select-course-detail-dialog.component';

describe('SelectCourseDetailDialogComponent', () => {
  let component: SelectCourseDetailDialogComponent;
  let fixture: ComponentFixture<SelectCourseDetailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectCourseDetailDialogComponent]
    });
    fixture = TestBed.createComponent(SelectCourseDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
