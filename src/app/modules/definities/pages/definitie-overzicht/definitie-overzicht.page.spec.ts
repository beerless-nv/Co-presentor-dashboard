import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinitieOverzichtPage } from './definitie-overzicht.page';

describe('DefinitieOverzichtPage', () => {
  let component: DefinitieOverzichtPage;
  let fixture: ComponentFixture<DefinitieOverzichtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinitieOverzichtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinitieOverzichtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
