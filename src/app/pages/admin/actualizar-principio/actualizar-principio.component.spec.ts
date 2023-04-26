import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPrincipioComponent } from './actualizar-principio.component';

describe('ActualizarPrincipioComponent', () => {
  let component: ActualizarPrincipioComponent;
  let fixture: ComponentFixture<ActualizarPrincipioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarPrincipioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarPrincipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
