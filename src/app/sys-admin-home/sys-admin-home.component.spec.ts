import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysAdminHomeComponent } from './sys-admin-home.component';

describe('SysAdminHomeComponent', () => {
  let component: SysAdminHomeComponent;
  let fixture: ComponentFixture<SysAdminHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SysAdminHomeComponent]
    });
    fixture = TestBed.createComponent(SysAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
