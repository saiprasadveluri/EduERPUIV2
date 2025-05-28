import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserCreationComponent } from './new-user-creation.component';

describe('NewUserCreationComponent', () => {
  let component: NewUserCreationComponent;
  let fixture: ComponentFixture<NewUserCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewUserCreationComponent]
    });
    fixture = TestBed.createComponent(NewUserCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
