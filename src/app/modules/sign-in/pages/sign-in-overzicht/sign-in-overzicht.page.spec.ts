import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInOverzichtPage } from './sign-in.page';

describe('SignInOverzichtPage', () => {
  let component: SignInOverzichtPage;
  let fixture: ComponentFixture<SignInOverzichtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInOverzichtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInOverzichtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
