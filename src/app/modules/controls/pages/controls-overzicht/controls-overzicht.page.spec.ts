import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsOverzichtPage } from './controls-overzicht.page';

describe('ControlsOverzichtPage', () => {
  let component: ControlsOverzichtPage;
  let fixture: ComponentFixture<ControlsOverzichtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlsOverzichtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsOverzichtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
