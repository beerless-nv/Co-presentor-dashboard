import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentatieDetailPage } from './presentatie-detail.page';

describe('PresentatieDetailPage', () => {
  let component: PresentatieDetailPage;
  let fixture: ComponentFixture<PresentatieDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentatieDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentatieDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
