import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentatieZwevendeTekstItemComponent } from './presentatie-zwevende-tekst-item.component';

describe('PresentatieZwevendeTekstItemComponent', () => {
  let component: PresentatieZwevendeTekstItemComponent;
  let fixture: ComponentFixture<PresentatieZwevendeTekstItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentatieZwevendeTekstItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentatieZwevendeTekstItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
