import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloDividasComponent } from './titulo-dividas.component';

describe('TituloDividasComponent', () => {
  let component: TituloDividasComponent;
  let fixture: ComponentFixture<TituloDividasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TituloDividasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TituloDividasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
