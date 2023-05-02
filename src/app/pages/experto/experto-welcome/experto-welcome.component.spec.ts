import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertoWelcomeComponent } from './experto-welcome.component';

describe('ExpertoWelcomeComponent', () => {
  let component: ExpertoWelcomeComponent;
  let fixture: ComponentFixture<ExpertoWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertoWelcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertoWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
