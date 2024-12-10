import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStudentsDialogComponent } from './select-students-dialog.component';

describe('SelectStudentsDialogComponent', () => {
  let component: SelectStudentsDialogComponent;
  let fixture: ComponentFixture<SelectStudentsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectStudentsDialogComponent]
    });
    fixture = TestBed.createComponent(SelectStudentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
