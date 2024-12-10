import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgSelectionComponent } from './org-selection.component';

describe('OrgSelectionComponent', () => {
  let component: OrgSelectionComponent;
  let fixture: ComponentFixture<OrgSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgSelectionComponent]
    });
    fixture = TestBed.createComponent(OrgSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
