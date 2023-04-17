import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarPerfilComponent } from './gestionar-perfil.component';

describe('GestionarPerfilComponent', () => {
  let component: GestionarPerfilComponent;
  let fixture: ComponentFixture<GestionarPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
