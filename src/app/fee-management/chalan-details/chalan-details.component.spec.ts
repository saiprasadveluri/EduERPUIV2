import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChalanDetailsComponent } from './chalan-details.component';

describe('ChalanDetailsComponent', () => {
  let component: ChalanDetailsComponent;
  let fixture: ComponentFixture<ChalanDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChalanDetailsComponent]
    });
    fixture = TestBed.createComponent(ChalanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
