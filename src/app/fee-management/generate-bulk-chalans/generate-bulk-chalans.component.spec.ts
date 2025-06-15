import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBulkChalansComponent } from './generate-bulk-chalans.component';

describe('GenerateBulkChalansComponent', () => {
  let component: GenerateBulkChalansComponent;
  let fixture: ComponentFixture<GenerateBulkChalansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateBulkChalansComponent]
    });
    fixture = TestBed.createComponent(GenerateBulkChalansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
