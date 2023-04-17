import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPrincipioComponent } from './crear-principio.component';

describe('CrearPrincipioComponent', () => {
  let component: CrearPrincipioComponent;
  let fixture: ComponentFixture<CrearPrincipioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPrincipioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPrincipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
