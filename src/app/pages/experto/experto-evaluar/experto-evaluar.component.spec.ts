import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertoEvaluarComponent } from './experto-evaluar.component';

describe('ExpertoEvaluarComponent', () => {
  let component: ExpertoEvaluarComponent;
  let fixture: ComponentFixture<ExpertoEvaluarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertoEvaluarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertoEvaluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
