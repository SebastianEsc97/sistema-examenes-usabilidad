import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertoEvaluacionComponent } from './experto-evaluacion.component';

describe('ExpertoEvaluacionComponent', () => {
  let component: ExpertoEvaluacionComponent;
  let fixture: ComponentFixture<ExpertoEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpertoEvaluacionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExpertoEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
