import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEvaluacionesComponent } from './reporte-evaluaciones.component';

describe('ReporteEvaluacionesComponent', () => {
  let component: ReporteEvaluacionesComponent;
  let fixture: ComponentFixture<ReporteEvaluacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteEvaluacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteEvaluacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
