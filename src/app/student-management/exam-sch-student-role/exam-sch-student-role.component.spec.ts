import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSchStudentRoleComponent } from './exam-sch-student-role.component';

describe('ExamSchStudentRoleComponent', () => {
  let component: ExamSchStudentRoleComponent;
  let fixture: ComponentFixture<ExamSchStudentRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamSchStudentRoleComponent]
    });
    fixture = TestBed.createComponent(ExamSchStudentRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
