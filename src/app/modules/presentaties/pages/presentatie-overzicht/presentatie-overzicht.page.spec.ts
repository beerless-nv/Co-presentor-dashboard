import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PresentatieOverzichtPage} from './presentatie-overzicht.page';


describe('PresentatieOverzichtPage', () => {
  let component: PresentatieOverzichtPage;
  let fixture: ComponentFixture<PresentatieOverzichtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PresentatieOverzichtPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentatieOverzichtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
