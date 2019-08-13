import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentatieCardComponent } from './presentatie-card.component';

describe('PresentatieCardComponent', () => {
  let component: PresentatieCardComponent;
  let fixture: ComponentFixture<PresentatieCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentatieCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentatieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
