import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrincipiosComponent } from './add-principios.component';

describe('AddPrincipiosComponent', () => {
  let component: AddPrincipiosComponent;
  let fixture: ComponentFixture<AddPrincipiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrincipiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPrincipiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
