import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentatieZwevendeTekstComponent } from './presentatie-zwevende-tekst.component';

describe('PresentatieZwevendeTekstComponent', () => {
  let component: PresentatieZwevendeTekstComponent;
  let fixture: ComponentFixture<PresentatieZwevendeTekstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentatieZwevendeTekstComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentatieZwevendeTekstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
