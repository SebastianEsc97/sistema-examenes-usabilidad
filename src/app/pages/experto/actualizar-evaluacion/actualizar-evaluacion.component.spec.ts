import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarEvaluacionComponent } from './actualizar-evaluacion.component';

describe('ActualizarEvaluacionComponent', () => {
  let component: ActualizarEvaluacionComponent;
  let fixture: ComponentFixture<ActualizarEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarEvaluacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
