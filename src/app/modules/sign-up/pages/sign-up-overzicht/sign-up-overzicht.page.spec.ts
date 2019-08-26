import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpOverzichtPage } from './sign-up-overzicht.page';

describe('SignUpOverzichtPage', () => {
  let component: SignUpOverzichtPage;
  let fixture: ComponentFixture<SignUpOverzichtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpOverzichtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpOverzichtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
