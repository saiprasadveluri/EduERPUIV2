import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPdfDocumentComponent } from './show-pdf-document.component';

describe('ShowPdfDocumentComponent', () => {
  let component: ShowPdfDocumentComponent;
  let fixture: ComponentFixture<ShowPdfDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowPdfDocumentComponent]
    });
    fixture = TestBed.createComponent(ShowPdfDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
