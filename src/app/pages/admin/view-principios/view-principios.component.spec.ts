import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrincipiosComponent } from './view-principios.component';

describe('ViewPrincipiosComponent', () => {
  let component: ViewPrincipiosComponent;
  let fixture: ComponentFixture<ViewPrincipiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPrincipiosComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ViewPrincipiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
