import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdminCreationComponent } from './new-admin-creation.component';

describe('NewAdminCreationComponent', () => {
  let component: NewAdminCreationComponent;
  let fixture: ComponentFixture<NewAdminCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAdminCreationComponent]
    });
    fixture = TestBed.createComponent(NewAdminCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
