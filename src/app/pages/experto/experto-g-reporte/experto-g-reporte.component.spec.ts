import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertoGReporteComponent } from './experto-g-reporte.component';

describe('ExpertoGReporteComponent', () => {
  let component: ExpertoGReporteComponent;
  let fixture: ComponentFixture<ExpertoGReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertoGReporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertoGReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
