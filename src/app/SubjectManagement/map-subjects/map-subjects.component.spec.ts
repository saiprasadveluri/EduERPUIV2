import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSubjectsComponent } from './map-subjects.component';

describe('MapSubjectsComponent', () => {
  let component: MapSubjectsComponent;
  let fixture: ComponentFixture<MapSubjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapSubjectsComponent]
    });
    fixture = TestBed.createComponent(MapSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
