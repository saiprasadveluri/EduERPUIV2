import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSpecializationsComponent } from './manage-specializations.component';

describe('ManageSpecializationsComponent', () => {
  let component: ManageSpecializationsComponent;
  let fixture: ComponentFixture<ManageSpecializationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageSpecializationsComponent]
    });
    fixture = TestBed.createComponent(ManageSpecializationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
