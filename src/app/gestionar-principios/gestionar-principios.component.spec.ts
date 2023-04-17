import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarPrincipiosComponent } from './gestionar-principios.component';

describe('GestionarPrincipiosComponent', () => {
  let component: GestionarPrincipiosComponent;
  let fixture: ComponentFixture<GestionarPrincipiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarPrincipiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarPrincipiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
